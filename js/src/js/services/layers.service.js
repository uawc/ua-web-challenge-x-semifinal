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
var _ = require('underscore');
require('rxjs/add/operator/toPromise');
var core_1 = require('@angular/core');
var product_data_1 = require('../data/product.data');
var canvas_layer_model_1 = require('../models/canvas.layer.model');
var LayersService = (function () {
    function LayersService() {
        this.layers = [];
        this.layerLimits = product_data_1.PRODUCTS[0].layerLimits;
    }
    /**
     * Clearing canvas layer
     */
    LayersService.prototype.clearLayer = function (layer) {
        layer.ctx.clearRect(0, 0, layer.canvas.width, layer.canvas.height);
    };
    /**
     * Changing layer z-index position
     */
    LayersService.prototype.changeLayerZIndex = function (index) {
        var activeLayer = this.layers.splice(this.activeLayerIndex, 1);
        this.activeLayerIndex = index;
        this.layers.splice(this.activeLayerIndex, 0, activeLayer[0]);
    };
    /**
     * Preloading Image
     */
    LayersService.prototype.loadImage = function (imageUrl) {
        var image = new Image();
        return new Promise(function (resolve) {
            image.onload = function () { return resolve(image); };
            image.src = imageUrl;
        });
    };
    /**
     * Rendering image from server
     */
    LayersService.prototype.renderImageFromServer = function (layer) {
        this.loadImage(layer.imageUrl)
            .then(function (image) {
            layer.setDefaults(image);
            layer.ctx.drawImage(image, layer.x, layer.y, layer.width, layer.height);
        });
    };
    /**
     * Rendering image from cache
     */
    LayersService.prototype.renderImageFromCache = function (layer) {
        layer.ctx.save();
        layer.ctx.translate(layer.centerPoint.x, layer.centerPoint.y);
        layer.ctx.rotate(layer.angle);
        layer.ctx.drawImage(layer.image, -layer.width / 2, -layer.height / 2, layer.width, layer.height);
        layer.ctx.restore();
    };
    /**
     * Making first layer from the top active
     */
    LayersService.prototype.makeFirstLayerActive = function (x, y) {
        var isActiveFound = false;
        for (var i = this.layers.length - 1; i >= 0; i--) {
            if (!isActiveFound) {
                isActiveFound = this.layers[i].isActive = this.layers[i].isClicked(x, y);
                this.activeLayerIndex = i;
            }
        }
    };
    Object.defineProperty(LayersService.prototype, "activeLayer", {
        /**
         * Getter for active layer
         */
        get: function () {
            return _.findWhere(this.layers, { isActive: true });
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Changing layer allowed area
     */
    LayersService.prototype.changeLayerLimits = function (layerLimits) {
        this.deleteAllLayers();
        this.layerLimits = layerLimits;
    };
    /**
     * Creating new layer
     */
    LayersService.prototype.createLayer = function (imageUrl, isPaint) {
        if (isPaint === void 0) { isPaint = false; }
        this.layers.push(new canvas_layer_model_1.CanvasLayerModel({ layerLimits: this.layerLimits, imageUrl: imageUrl, isPaint: isPaint }));
    };
    /**
     * Deleting active layer
     */
    LayersService.prototype.deleteActiveLayer = function () {
        this.layers.splice(this.activeLayerIndex, 1);
    };
    /**
     * Deleting all layers
     */
    LayersService.prototype.deleteAllLayers = function () {
        this.layers = [];
    };
    /**
     * Moving active layer to one step up
     */
    LayersService.prototype.moveActiveLayerUp = function () {
        if (this.layers.length > 1 && this.activeLayerIndex !== this.layers.length - 1) {
            this.changeLayerZIndex(this.activeLayerIndex + 1);
        }
    };
    /**
     * Moving active layer to one step down
     */
    LayersService.prototype.moveActiveLayerDown = function () {
        if (this.layers.length > 1 && this.activeLayerIndex !== 0) {
            this.changeLayerZIndex(this.activeLayerIndex - 1);
        }
    };
    /**
     * Moving active layer to very top
     */
    LayersService.prototype.moveActiveLayerTop = function () {
        if (this.layers.length > 1 && this.activeLayerIndex !== this.layers.length - 1) {
            this.changeLayerZIndex(this.layers.length - 1);
        }
    };
    /**
     * Moving active layer to very bottom
     */
    LayersService.prototype.moveActiveLayerBottom = function () {
        if (this.layers.length > 1 && this.activeLayerIndex !== 0) {
            this.changeLayerZIndex(0);
        }
    };
    /**
     * Adding canvas element reference into the model
     */
    LayersService.prototype.addCanvasElementToModel = function (canvasElement, index) {
        this.layers[index].updateCanvasElement(canvasElement);
    };
    /**
     * Rendering layer
     */
    LayersService.prototype.renderLayer = function (layer) {
        this.clearLayer(layer);
        if (!layer.image) {
            this.renderImageFromServer(layer);
        }
        else {
            this.renderImageFromCache(layer);
        }
    };
    /**
     * Rendering all layers
     */
    LayersService.prototype.renderAllLayers = function () {
        var _this = this;
        this.layers.forEach(function (layer) { return _this.renderLayer(layer); });
    };
    /**
     * Deactivating all layers
     */
    LayersService.prototype.deactivateAllLayers = function () {
        this.layers.forEach(function (layer) { return layer.isActive = false; });
    };
    /**
     * Making layer active
     */
    LayersService.prototype.makeLayerActive = function (x, y) {
        this.deactivateAllLayers();
        this.makeFirstLayerActive(x, y);
    };
    /**
     * Making last added layer active
     */
    LayersService.prototype.makeLastLayerActive = function () {
        this.deactivateAllLayers();
        this.layers[this.layers.length - 1].isActive = true;
    };
    /**
     * Moving active layer
     */
    LayersService.prototype.moveActiveLayer = function (dX, dY) {
        var activeLayer = this.activeLayer;
        if (activeLayer) {
            activeLayer.move(dX, dY);
            this.renderLayer(activeLayer);
        }
    };
    /**
     * Rotating active layer
     */
    LayersService.prototype.rotateActiveLayer = function (dAngle) {
        var activeLayer = this.activeLayer;
        if (activeLayer) {
            activeLayer.rotate(dAngle);
            this.renderLayer(activeLayer);
        }
    };
    /**
     * Scaling active layer
     */
    LayersService.prototype.scaleActiveLayer = function (dX, dY, control) {
        var activeLayer = this.activeLayer;
        if (activeLayer) {
            activeLayer.scale(dX, dY, control);
            this.renderLayer(activeLayer);
        }
    };
    LayersService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], LayersService);
    return LayersService;
}());
exports.LayersService = LayersService;
