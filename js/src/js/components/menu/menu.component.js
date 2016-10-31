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
var navigation_data_1 = require('../../data/navigation.data');
var menu_content_component_1 = require('./content/menu.content.component');
var menu_navigation_component_1 = require('./navigation/menu.navigation.component');
var MenuComponent = (function () {
    function MenuComponent() {
        this.currentTab = navigation_data_1.NAVIGATION_TABS[0];
    }
    /**
     * Handling tabChange event
     */
    MenuComponent.prototype.onTabChange = function (tab) {
        this.currentTab = tab;
    };
    /**
     * Handling paintSaved event
     */
    MenuComponent.prototype.onPaintSaved = function () {
        this.currentTab = navigation_data_1.NAVIGATION_TABS[1];
    };
    MenuComponent = __decorate([
        core_1.Component({
            selector: 'menu',
            templateUrl: './templates/menu/menu.component.html',
            styleUrls: ['./css/menu/menu.component.css'],
            directives: [[menu_navigation_component_1.MenuNavigationComponent], [menu_content_component_1.MenuContentComponent]]
        }), 
        __metadata('design:paramtypes', [])
    ], MenuComponent);
    return MenuComponent;
}());
exports.MenuComponent = MenuComponent;
