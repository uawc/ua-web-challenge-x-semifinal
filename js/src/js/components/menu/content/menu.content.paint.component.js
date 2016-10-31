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
var paint_service_1 = require('../../../services/paint.service');
var core_1 = require('@angular/core');
var layers_service_1 = require('../../../services/layers.service');
var controls_service_1 = require('../../../services/controls.service');
var MenuContentPaintComponent = (function () {
    function MenuContentPaintComponent(layersService, paintService, controlsService) {
        this.layersService = layersService;
        this.paintService = paintService;
        this.controlsService = controlsService;
        this.paintSaved = new core_1.EventEmitter();
    }
    /**
     * Enabling paint mode and deactivating all layers on component's ngOnInit
     */
    MenuContentPaintComponent.prototype.ngOnInit = function () {
        this.paintService.enablePaintMode();
        this.controlsService.hideControls();
        this.layersService.deactivateAllLayers();
    };
    /**
     * Disabling paint mode on component's ngOnDestroy
     */
    MenuContentPaintComponent.prototype.ngOnDestroy = function () {
        this.paintService.disablePaintMode();
    };
    /**
     * Handling color changing
     */
    MenuContentPaintComponent.prototype.onColorClick = function (color) {
        this.paintService.setActiveColor(color);
    };
    /**
     * Handling brush size
     */
    MenuContentPaintComponent.prototype.onBrashSizeClick = function (size) {
        this.paintService.setActiveSize(size);
    };
    /**
     * Handling "save paint" button clicking
     */
    MenuContentPaintComponent.prototype.savePaint = function () {
        var dataURL = this.paintService.paintSettings.canvas.toDataURL();
        this.layersService.createLayer(dataURL, true);
        this.layersService.makeLastLayerActive();
        this.paintSaved.emit();
        this.paintService.clearDrawLayer();
        this.controlsService.showControls(this.layersService.activeLayer);
    };
    /**
     * Handling "clear paint" button clicking
     */
    MenuContentPaintComponent.prototype.clearPaint = function () {
        this.paintService.clearDrawLayer();
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], MenuContentPaintComponent.prototype, "paintSaved", void 0);
    MenuContentPaintComponent = __decorate([
        core_1.Component({
            selector: 'menu-content-paint',
            templateUrl: './templates/menu/content/menu.content.paint.component.html',
            styleUrls: ['./css/menu/content/menu.content.paint.component.css']
        }), 
        __metadata('design:paramtypes', [layers_service_1.LayersService, paint_service_1.PaintService, controls_service_1.ControlsService])
    ], MenuContentPaintComponent);
    return MenuContentPaintComponent;
}());
exports.MenuContentPaintComponent = MenuContentPaintComponent;
