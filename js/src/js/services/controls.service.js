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
var layer_controls_model_1 = require('../models/layer.controls.model');
var ControlsService = (function () {
    function ControlsService() {
        this.controlsChanged = new Subject_1.Subject();
    }
    /**
     * Hiding control box
     */
    ControlsService.prototype.hideControls = function () {
        this.controls = null;
        this.controlsChanged.next(this.controls);
    };
    /**
     * Showing control box
     */
    ControlsService.prototype.showControls = function (activeLayer) {
        this.controls = activeLayer ? new layer_controls_model_1.LayerControlsModel(activeLayer) : null;
        this.controlsChanged.next(this.controls);
    };
    ControlsService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], ControlsService);
    return ControlsService;
}());
exports.ControlsService = ControlsService;
