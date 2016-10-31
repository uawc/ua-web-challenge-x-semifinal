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
var menu_component_1 = require('./menu/menu.component');
var core_1 = require('@angular/core');
var event_service_1 = require('../services/event.service');
var editor_component_1 = require('./editor/editor.component');
var AppComponent = (function () {
    function AppComponent(eventService) {
        this.eventService = eventService;
    }
    /**
     * Handling mouseup event
     */
    AppComponent.prototype.onMouseUp = function () {
        this.eventService.isMove = false;
        this.eventService.isRotate = false;
        this.eventService.isScale = false;
        this.eventService.isDraw = false;
        this.eventService.resetMouseCoordinates();
        this.eventService.resetMouseAngle();
    };
    __decorate([
        core_1.HostListener('document:mouseup', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', []), 
        __metadata('design:returntype', void 0)
    ], AppComponent.prototype, "onMouseUp", null);
    AppComponent = __decorate([
        core_1.Component({
            selector: 'app',
            templateUrl: './templates/app.component.html',
            styleUrls: ['./css/app.component.css'],
            directives: [[menu_component_1.MenuComponent], [editor_component_1.EditorComponent]]
        }), 
        __metadata('design:paramtypes', [event_service_1.EventService])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
