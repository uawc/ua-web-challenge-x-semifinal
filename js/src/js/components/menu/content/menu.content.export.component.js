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
var layers_service_1 = require('../../../services/layers.service');
var product_service_1 = require('../../../services/product.service');
var MenuContentExportComponent = (function () {
    function MenuContentExportComponent(layersService, productService) {
        this.layersService = layersService;
        this.productService = productService;
    }
    /**
     * Export image on "save" button clicking
     */
    MenuContentExportComponent.prototype.exportImage = function (event) {
        event.currentTarget['href'] = this.generateImageUrl();
    };
    /**
     * Drawing multiple canvases into one and generating dataURL
     */
    MenuContentExportComponent.prototype.generateImageUrl = function () {
        var canvas = document.createElement("canvas");
        var ctx = canvas.getContext('2d');
        canvas.width = this.productService.$backgroundImage.width;
        canvas.height = this.productService.$backgroundImage.height;
        ctx.drawImage(this.productService.$backgroundImage, 0, 0);
        this.layersService.layers.forEach(function (layer) {
            ctx.drawImage(layer.canvas, layer.layerLimits.x, layer.layerLimits.y);
        });
        return canvas.toDataURL("image/png");
    };
    MenuContentExportComponent = __decorate([
        core_1.Component({
            selector: 'menu-content-export',
            templateUrl: './templates/menu/content/menu.content.export.component.html',
            styleUrls: ['./css/menu/content/menu.content.export.component.css']
        }), 
        __metadata('design:paramtypes', [layers_service_1.LayersService, product_service_1.ProductService])
    ], MenuContentExportComponent);
    return MenuContentExportComponent;
}());
exports.MenuContentExportComponent = MenuContentExportComponent;
