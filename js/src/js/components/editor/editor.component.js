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
var core_1 = require('@angular/core');
var event_service_1 = require('../../services/event.service');
var paint_service_1 = require('../../services/paint.service');
var layers_service_1 = require('../../services/layers.service');
var controls_service_1 = require('../../services/controls.service');
var editor_canvas_component_1 = require('./canvas/editor.canvas.component');
var EditorComponent = (function () {
    function EditorComponent(layersService, controlsService, eventService, paintService) {
        this.layersService = layersService;
        this.controlsService = controlsService;
        this.eventService = eventService;
        this.paintService = paintService;
    }
    /**
     * Handling mousedown event
     */
    EditorComponent.prototype.onMouseDown = function (event) {
        if (this.paintService.paintSettings.isActive) {
            return;
        }
        this.eventService.isMove = true;
        this.eventService.saveMouseCoordinates(event);
        this.makeLayerActive(this.eventService.x, this.eventService.y);
    };
    /**
     * Handling keydown event
     */
    EditorComponent.prototype.onKeyDown = function (event) {
        var moveDelta = this.eventService.getKeyboardMoveDelta(event.keyCode);
        if (moveDelta) {
            this.layersService.moveActiveLayer(moveDelta.dX, moveDelta.dY);
        }
    };
    /**
     * Handling mousemove event
     */
    EditorComponent.prototype.onMouseMove = function (event) {
        if (this.eventService.isMove && !this.eventService.isDraw) {
            this.moveActiveLayer(event);
        }
        if (this.eventService.isRotate) {
            this.rotateActiveLayer(event);
        }
        if (this.eventService.isScale) {
            this.scaleActiveLayer(event);
        }
        if (this.eventService.isDraw && this.paintService.paintSettings.isActive) {
            this.drawLayer(event);
        }
    };
    /**
     * Scaling active layer
     */
    EditorComponent.prototype.scaleActiveLayer = function (event) {
        this.eventService.saveMouseCoordinates(event);
        this.layersService.scaleActiveLayer(this.eventService.dX, this.eventService.dY, this.eventService.scaleControl);
    };
    /**
     * Drawing a line in draw mode
     */
    EditorComponent.prototype.drawLayer = function (event) {
        this.eventService.saveMouseCoordinates(event);
        this.paintService.drawLine(this.eventService.coordinates);
    };
    /**
     * Moving active layer
     */
    EditorComponent.prototype.moveActiveLayer = function (event) {
        this.eventService.saveMouseCoordinates(event);
        this.layersService.moveActiveLayer(this.eventService.dX, this.eventService.dY);
    };
    /**
     * Rotating active layer
     */
    EditorComponent.prototype.rotateActiveLayer = function (event) {
        this.eventService.saveMouseAngle(event, this.layersService.activeLayer);
        this.layersService.rotateActiveLayer(this.eventService.dAngle);
    };
    /**
     * Making clicked layer active
     */
    EditorComponent.prototype.makeLayerActive = function (x, y) {
        this.layersService.makeLayerActive(x, y);
        this.controlsService.showControls(this.layersService.activeLayer);
    };
    __decorate([
        core_1.HostListener('mousedown', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Event]), 
        __metadata('design:returntype', void 0)
    ], EditorComponent.prototype, "onMouseDown", null);
    __decorate([
        core_1.HostListener('document:keydown', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [KeyboardEvent]), 
        __metadata('design:returntype', void 0)
    ], EditorComponent.prototype, "onKeyDown", null);
    __decorate([
        core_1.HostListener('mousemove', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Event]), 
        __metadata('design:returntype', void 0)
    ], EditorComponent.prototype, "onMouseMove", null);
    EditorComponent = __decorate([
        core_1.Component({
            selector: 'editor',
            templateUrl: './templates/editor/editor.component.html',
            styleUrls: ['./css/editor/editor.component.css'],
            directives: [[editor_canvas_component_1.EditorCanvasComponent]]
        }), 
        __metadata('design:paramtypes', [layers_service_1.LayersService, controls_service_1.ControlsService, event_service_1.EventService, paint_service_1.PaintService])
    ], EditorComponent);
    return EditorComponent;
}());
exports.EditorComponent = EditorComponent;
