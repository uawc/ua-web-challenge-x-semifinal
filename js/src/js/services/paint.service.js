"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
require('rxjs/add/operator/toPromise');
var Subject_1 = require('rxjs/Subject');
var core_1 = require('@angular/core');
var paint_model_1 = require('../models/paint.model');
var PaintService = (function () {
    function PaintService() {
        this.paintSettingsChanged = new Subject_1.Subject();
        this.paintSettings = new paint_model_1.PaintModel();
        this.paintSettingsChanged$ = this.paintSettingsChanged.asObservable();
    }
    /**
     * Setting style settings to the context
     */
    PaintService.prototype.applyCanvasSettings = function () {
        this.paintSettings.ctx.lineJoin = "round";
        this.paintSettings.ctx.lineCap = "round";
        this.paintSettings.ctx.lineWidth = this.paintSettings.activeSize;
        this.paintSettings.ctx.strokeStyle = this.paintSettings.activeColor;
        this.paintSettings.ctx.fillStyle = this.paintSettings.activeColor;
    };
    /**
     * Drawing a circle
     */
    PaintService.prototype.drawCircle = function (coordinates) {
        this.paintSettings.ctx.beginPath();
        this.paintSettings.ctx.arc(coordinates[0].x, coordinates[0].y, this.paintSettings.ctx.lineWidth / 2, 0, Math.PI * 2);
        this.paintSettings.ctx.fill();
        this.paintSettings.ctx.closePath();
    };
    /**
     * Drawing a Quadratic Curve
     */
    PaintService.prototype.drawQuadraticCurve = function (coordinates) {
        var ctx = this.paintSettings.ctx;
        ctx.beginPath();
        ctx.moveTo(coordinates[0].x, coordinates[0].y);
        for (var i = 1; i < coordinates.length - 2; i++) {
            var middleX = (coordinates[i].x + coordinates[i + 1].x) / 2;
            var middleY = (coordinates[i].y + coordinates[i + 1].y) / 2;
            ctx.quadraticCurveTo(coordinates[i].x, coordinates[i].y, middleX, middleY);
        }
        ctx.quadraticCurveTo(coordinates[coordinates.length - 2].x, coordinates[coordinates.length - 2].y, coordinates[coordinates.length - 1].x, coordinates[coordinates.length - 1].y);
        ctx.stroke();
    };
    /**
     * Drawing a line
     */
    PaintService.prototype.drawLine = function (coordinates) {
        this.applyCanvasSettings();
        if (coordinates.length < 3) {
            return this.drawCircle(coordinates);
        }
        this.drawQuadraticCurve(coordinates);
    };
    /**
     * Enabling Paint mode
     */
    PaintService.prototype.enablePaintMode = function () {
        this.paintSettings.isActive = true;
        this.paintSettingsChanged.next(this.paintSettings);
    };
    /**
     * Disabling Paint mode
     */
    PaintService.prototype.disablePaintMode = function () {
        this.paintSettings.isActive = false;
        this.paintSettingsChanged.next(this.paintSettings);
    };
    /**
     * Setting canvas element reference into the model
     */
    PaintService.prototype.setCanvas = function (canvas) {
        this.paintSettings.canvas = canvas;
        this.paintSettings.ctx = this.paintSettings.canvas.getContext("2d");
    };
    /**
     * Setting active color into the model
     */
    PaintService.prototype.setActiveColor = function (color) {
        this.paintSettings.activeColor = color;
    };
    /**
     * Setting active size into the model
     */
    PaintService.prototype.setActiveSize = function (size) {
        this.paintSettings.activeSize = size;
    };
    /**
     * Clear draw layer
     */
    PaintService.prototype.clearDrawLayer = function () {
        this.paintSettings.ctx.clearRect(0, 0, this.paintSettings.canvas.width, this.paintSettings.canvas.height);
    };
    PaintService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], PaintService);
    return PaintService;
}());
exports.PaintService = PaintService;
