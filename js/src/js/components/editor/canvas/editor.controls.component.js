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
var event_service_1 = require('../../../services/event.service');
var layers_service_1 = require('../../../services/layers.service');
var controls_scale_data_1 = require('../../../data/controls.scale.data');
var controls_service_1 = require('../../../services/controls.service');
var controls_buttons_data_1 = require('../../../data/controls.buttons.data');
var EditorControlsComponent = (function () {
    function EditorControlsComponent(layersService, eventService, controlsService) {
        this.layersService = layersService;
        this.eventService = eventService;
        this.controlsService = controlsService;
    }
    /**
     * Adding default data on component's ngOnInit
     */
    EditorControlsComponent.prototype.ngOnInit = function () {
        this.buttons = controls_buttons_data_1.CONTROL_BUTTONS;
        this.scaleControls = controls_scale_data_1.CONTROL_SCALE;
    };
    /**
     * Handling mousedown event on scale controls
     */
    EditorControlsComponent.prototype.onScaleControlDown = function (event, control) {
        event.stopImmediatePropagation();
        this.eventService.isScale = true;
        this.eventService.scaleControl = control.type;
    };
    /**
     * Handling mousedown event on control buttons
     */
    EditorControlsComponent.prototype.onControlButtonClick = function (event, button) {
        event.stopImmediatePropagation();
        switch (button.name) {
            case 'rotate':
                this.eventService.isRotate = true;
                break;
            case 'delete': {
                this.layersService.deleteActiveLayer();
                this.controlsService.hideControls();
                break;
            }
            case 'layer-up': {
                this.layersService.moveActiveLayerUp();
                break;
            }
            case 'layer-down': {
                this.layersService.moveActiveLayerDown();
                break;
            }
            case 'layer-top': {
                this.layersService.moveActiveLayerTop();
                break;
            }
            case 'layer-bottom': {
                this.layersService.moveActiveLayerBottom();
                break;
            }
            default: {
                break;
            }
        }
    };
    EditorControlsComponent = __decorate([
        core_1.Component({
            selector: 'editor-canvas-controls',
            templateUrl: './templates/editor/canvas/editor.controls.component.html',
            styleUrls: ['./css/editor/canvas/editor.controls.component.css']
        }), 
        __metadata('design:paramtypes', [layers_service_1.LayersService, event_service_1.EventService, controls_service_1.ControlsService])
    ], EditorControlsComponent);
    return EditorControlsComponent;
}());
exports.EditorControlsComponent = EditorControlsComponent;
