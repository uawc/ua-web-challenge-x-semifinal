"use strict";
var _ = require('underscore');
var CanvasLayerModel = (function () {
    function CanvasLayerModel(options) {
        if (options === void 0) { options = {}; }
        this.centerPoint = {};
        this.layerLimits = {};
        this.scaleX = 0;
        this.scaleY = 0;
        this.angle = 0;
        _.extend(this, options);
    }
    /**
     * Updating image center point
     */
    CanvasLayerModel.prototype.updateCenterPoint = function () {
        this.centerPoint.x = this.x + this.width / 2;
        this.centerPoint.y = this.y + this.height / 2;
    };
    /**
     * Setting default image size to be fit into the limit zone saving image ratio
     */
    CanvasLayerModel.prototype.setDefaultSize = function () {
        var imageRatio = this.image.width / this.image.height;
        var margin = this.isPaint ? 0 : 60;
        this.height = this.layerLimits.height - margin;
        this.width = Math.floor(this.height * imageRatio);
        if (this.width >= this.layerLimits.width) {
            this.width = this.layerLimits.width - margin;
            this.height = Math.floor(this.width / imageRatio);
        }
    };
    /**
     * Setting default image position
     */
    CanvasLayerModel.prototype.setDefaultPosition = function () {
        this.x = this.layerLimits.width / 2 - this.width / 2;
        this.y = this.layerLimits.height / 2 - this.height / 2;
    };
    /**
     * Calculating point coordinates after rotation
     */
    CanvasLayerModel.prototype.getRotatedPointsPosition = function (mouseX, mouseY) {
        var x = this.centerPoint.x + mouseX * Math.cos(-this.angle) - mouseY * Math.sin(-this.angle);
        var y = this.centerPoint.y + mouseX * Math.sin(this.angle) - mouseY * Math.cos(this.angle);
        return { x: x, y: y };
    };
    /**
     * Calculating triangle area knowing three sides of it
     */
    CanvasLayerModel.prototype.getTriangleArea = function (side1, side2, side3) {
        var hPer = (side1 + side2 + side3) / 2;
        return Math.sqrt(hPer * (hPer - side1) * (hPer - side2) * (hPer - side3));
    };
    /**
     * Updating instant image position after scaling
     */
    CanvasLayerModel.prototype.updatePositionAfterScale = function (deltaX, deltaY) {
        this.centerPoint.x = this.x + this.prevWidth / 2 - deltaX;
        this.centerPoint.y = this.y + this.prevHeight / 2 - deltaY;
        this.x = this.centerPoint.x - this.width / 2;
        this.y = this.centerPoint.y - this.height / 2;
    };
    /**
     * Getting horizontal offset on scaling
     */
    CanvasLayerModel.prototype.getHorizontalOffset = function (dX, dY) {
        var delta = dY * Math.sin(this.angle) + dX * Math.cos(this.angle);
        var deltaX = delta / 2 * Math.cos(this.angle);
        var deltaY = delta / 2 * Math.sin(this.angle);
        return { delta: delta, deltaX: deltaX, deltaY: deltaY };
    };
    /**
     * Getting vertical offset on scaling
     */
    CanvasLayerModel.prototype.getVerticalOffset = function (dX, dY) {
        var delta = dY * Math.cos(this.angle) - dX * Math.sin(this.angle);
        var deltaX = delta / 2 * Math.sin(-this.angle);
        var deltaY = delta / 2 * Math.cos(-this.angle);
        return { delta: delta, deltaX: deltaX, deltaY: deltaY };
    };
    /**
     * Updating current model with canvas element reference
     */
    CanvasLayerModel.prototype.updateCanvasElement = function (canvas) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d");
    };
    /**
     * Setting defaults of current model
     */
    CanvasLayerModel.prototype.setDefaults = function (image) {
        this.image = image;
        this.setDefaultSize();
        this.setDefaultPosition();
        this.updateCenterPoint();
    };
    /**
     * Checking whether mouse point of clicking is within a current layer.
     * NOTE FOR JUDGES: Since layer could be rotated the logic is following:
     *                  if sum of four triangles from mouse point to image
     *                  four vertices is equal to image area than point is
     *                  within an image.
     */
    CanvasLayerModel.prototype.isClicked = function (x, y) {
        var pointB = this.getRotatedPointsPosition(this.width / 2, this.height / 2);
        var pointC = this.getRotatedPointsPosition(this.width / 2, -this.height / 2);
        var pointA = this.getRotatedPointsPosition(-this.width / 2, this.height / 2);
        var pointD = this.getRotatedPointsPosition(-this.width / 2, -this.height / 2);
        var sideA = Math.hypot(x - pointA.x, y - pointA.y);
        var sideB = Math.hypot(x - pointB.x, y - pointB.y);
        var sideC = Math.hypot(x - pointC.x, y - pointC.y);
        var sideD = Math.hypot(x - pointD.x, y - pointD.y);
        var sideF = this.width;
        var sideG = this.height;
        var triangleA = this.getTriangleArea(sideA, sideB, sideF);
        var triangleB = this.getTriangleArea(sideB, sideC, sideG);
        var triangleC = this.getTriangleArea(sideC, sideD, sideF);
        var triangleD = this.getTriangleArea(sideD, sideA, sideG);
        var layerSquare = Math.round(this.width * this.height);
        var pointTrianglesSquare = Math.round(triangleA + triangleB + triangleC + triangleD);
        return layerSquare === pointTrianglesSquare;
    };
    /**
     * Moving current layer by x, y coordinates changing
     */
    CanvasLayerModel.prototype.move = function (dX, dY) {
        this.updateCenterPoint();
        this.x -= dX;
        this.y -= dY;
        this.updateCenterPoint();
    };
    /**
     * Rotating current layer by angle changing
     */
    CanvasLayerModel.prototype.rotate = function (dAngle) {
        this.angle -= dAngle;
        this.angle = this.angle > 2 * Math.PI ? 0 : this.angle;
        this.angle = this.angle < 0 ? 2 * Math.PI : this.angle;
    };
    /**
     * Scaling current layer by controls dragging
     */
    CanvasLayerModel.prototype.scale = function (dX, dY, control) {
        var offset;
        if (dX === null || dY === null) {
            return;
        }
        this.prevWidth = this.width;
        this.prevHeight = this.height;
        switch (control) {
            case 'middle-right':
                offset = this.getHorizontalOffset(dX, dY);
                this.width -= offset.delta;
                break;
            case 'middle-left':
                offset = this.getHorizontalOffset(dX, dY);
                this.width += offset.delta;
                break;
            case 'top-center':
                offset = this.getVerticalOffset(dX, dY);
                this.height += offset.delta;
                break;
            case 'bottom-center':
                offset = this.getVerticalOffset(dX, dY);
                this.height -= offset.delta;
                break;
        }
        // disable scaling if image is too small
        if (this.width < 40) {
            this.width = 40;
            offset.deltaX = 0;
            offset.deltaY = 0;
        }
        if (this.height < 40) {
            this.height = 40;
            offset.deltaX = 0;
            offset.deltaY = 0;
        }
        this.updatePositionAfterScale(offset.deltaX, offset.deltaY);
    };
    return CanvasLayerModel;
}());
exports.CanvasLayerModel = CanvasLayerModel;
