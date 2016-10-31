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
var image_data_1 = require('../../../data/image.data');
var core_1 = require('@angular/core');
var layers_service_1 = require('../../../services/layers.service');
var MenuContentImageComponent = (function () {
    function MenuContentImageComponent(layersService) {
        this.layersService = layersService;
        this.images = image_data_1.IMAGES;
    }
    /**
     * Creating a new layer and adding it to an editor on image icon clicking
     */
    MenuContentImageComponent.prototype.onClick = function (image) {
        this.layersService.createLayer(image.url);
    };
    /**
     * Loading image from local disc on "load image" button clicking
     */
    MenuContentImageComponent.prototype.loadImage = function (event) {
        this.images.unshift({ name: Date.now() + '', url: URL.createObjectURL(event.target.files[0]) });
        this.$imageList.nativeElement.scrollTop = 0;
    };
    __decorate([
        core_1.ViewChild("imageList"), 
        __metadata('design:type', core_1.ElementRef)
    ], MenuContentImageComponent.prototype, "$imageList", void 0);
    MenuContentImageComponent = __decorate([
        core_1.Component({
            selector: 'menu-content-image',
            templateUrl: './templates/menu/content/menu.content.image.component.html',
            styleUrls: ['./css/menu/content/menu.content.image.component.css']
        }), 
        __metadata('design:paramtypes', [layers_service_1.LayersService])
    ], MenuContentImageComponent);
    return MenuContentImageComponent;
}());
exports.MenuContentImageComponent = MenuContentImageComponent;
