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
var event_service_1 = require('../../../services/event.service');
var paint_service_1 = require('../../../services/paint.service');
var layers_service_1 = require('../../../services/layers.service');
var product_service_1 = require('../../../services/product.service');
var controls_service_1 = require('../../../services/controls.service');
var editor_controls_component_1 = require('./editor.controls.component');
var core_1 = require('@angular/core');
var EditorCanvasComponent = (function () {
    function EditorCanvasComponent(layersService, eventService, controlsService, paintService, productService) {
        this.layersService = layersService;
        this.eventService = eventService;
        this.controlsService = controlsService;
        this.paintService = paintService;
        this.productService = productService;
    }
    /**
     * Setting elements references to models on component's ngOnInit
     */
    EditorCanvasComponent.prototype.ngOnInit = function () {
        this.productService.saveBackgroundElement(this.$backgroundImage.nativeElement);
        this.eventService.saveContainerElement(this.$limitFrame.nativeElement);
    };
    /**
     * Listening for "canvasLayers" Children amount changing on component's ngAfterViewInit
     */
    EditorCanvasComponent.prototype.ngAfterViewInit = function () {
        this.canvasLayersChanged = this.$canvasLayers.changes.subscribe(this.onCanvasAmountChanged.bind(this));
    };
    /**
     * Checking whether canvasDraw element is accessible and set it to paintSettings model on component's ngDoCheck
     */
    EditorCanvasComponent.prototype.ngDoCheck = function () {
        this.$canvasDraw && this.paintService.setCanvas(this.$canvasDraw.nativeElement);
    };
    /**
     * Unsubscribe events on component's ngOnDestroy
     */
    EditorCanvasComponent.prototype.ngOnDestroy = function () {
        this.canvasLayersChanged.unsubscribe();
    };
    /**
     * Drawing a dot on draw layer clicking
     */
    EditorCanvasComponent.prototype.onDrawLayerClick = function (event) {
        this.eventService.isDraw = true;
        this.eventService.saveMouseCoordinates(event);
        this.paintService.drawLine(this.eventService.coordinates);
    };
    /**
     * Adding canvas element reference to each layer model after rendering all layers by component
     */
    EditorCanvasComponent.prototype.onCanvasAmountChanged = function (queryList) {
        var _this = this;
        if (queryList.length) {
            queryList.forEach(function (element, index) { return _this.layersService.addCanvasElementToModel(element.nativeElement, index); });
            this.layersService.renderAllLayers();
        }
    };
    __decorate([
        core_1.ViewChild("canvasDraw"), 
        __metadata('design:type', core_1.ElementRef)
    ], EditorCanvasComponent.prototype, "$canvasDraw", void 0);
    __decorate([
        core_1.ViewChild("limitFrame"), 
        __metadata('design:type', core_1.ElementRef)
    ], EditorCanvasComponent.prototype, "$limitFrame", void 0);
    __decorate([
        core_1.ViewChild("backgroundImage"), 
        __metadata('design:type', core_1.ElementRef)
    ], EditorCanvasComponent.prototype, "$backgroundImage", void 0);
    __decorate([
        core_1.ViewChildren('canvasLayers'), 
        __metadata('design:type', core_1.QueryList)
    ], EditorCanvasComponent.prototype, "$canvasLayers", void 0);
    EditorCanvasComponent = __decorate([
        core_1.Component({
            selector: 'editor-canvas',
            templateUrl: './templates/editor/canvas/editor.canvas.component.html',
            styleUrls: ['./css/editor/canvas/editor.canvas.component.css'],
            directives: [[editor_controls_component_1.EditorControlsComponent]]
        }), 
        __metadata('design:paramtypes', [layers_service_1.LayersService, event_service_1.EventService, controls_service_1.ControlsService, paint_service_1.PaintService, product_service_1.ProductService])
    ], EditorCanvasComponent);
    return EditorCanvasComponent;
}());
exports.EditorCanvasComponent = EditorCanvasComponent;
