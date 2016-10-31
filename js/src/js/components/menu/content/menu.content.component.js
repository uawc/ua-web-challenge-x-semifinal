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
var menu_content_image_component_1 = require('./menu.content.image.component');
var menu_content_paint_component_1 = require('./menu.content.paint.component');
var menu_content_export_component_1 = require('./menu.content.export.component');
var menu_content_product_component_1 = require('./menu.content.product.component');
var MenuContentComponent = (function () {
    function MenuContentComponent() {
        this.paintSaved = new core_1.EventEmitter();
    }
    /**
     * Emitting to parent that paint in draw mode has been saved
     */
    MenuContentComponent.prototype.onPaintSaved = function () {
        this.paintSaved.emit();
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], MenuContentComponent.prototype, "currentTab", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], MenuContentComponent.prototype, "paintSaved", void 0);
    MenuContentComponent = __decorate([
        core_1.Component({
            selector: 'menu-content',
            templateUrl: './templates/menu/content/menu.content.component.html',
            styleUrls: ['./css/menu/content/menu.content.component.css'],
            directives: [[menu_content_product_component_1.MenuContentProductComponent], [menu_content_image_component_1.MenuContentImageComponent], [menu_content_paint_component_1.MenuContentPaintComponent], [menu_content_export_component_1.MenuContentExportComponent]]
        }), 
        __metadata('design:paramtypes', [])
    ], MenuContentComponent);
    return MenuContentComponent;
}());
exports.MenuContentComponent = MenuContentComponent;
