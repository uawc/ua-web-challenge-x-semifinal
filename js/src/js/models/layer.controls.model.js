"use strict";
var LayerControlsModel = (function () {
    function LayerControlsModel(layer) {
        this.boundingBoxBorderWidth = 2;
        this.layer = layer;
    }
    Object.defineProperty(LayerControlsModel.prototype, "x", {
        /**
         * Getter for current x position
         */
        get: function () {
            return this.layer.x + this.layer.layerLimits.x - this.boundingBoxBorderWidth;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LayerControlsModel.prototype, "y", {
        /**
         * Getter for current y position
         */
        get: function () {
            return this.layer.y + this.layer.layerLimits.y - this.boundingBoxBorderWidth;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LayerControlsModel.prototype, "angle", {
        /**
         * Getter for current angle
         */
        get: function () {
            return this.layer.angle * 180 / Math.PI;
        },
        enumerable: true,
        configurable: true
    });
    return LayerControlsModel;
}());
exports.LayerControlsModel = LayerControlsModel;
