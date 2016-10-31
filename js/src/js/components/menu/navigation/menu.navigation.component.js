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
var navigation_data_1 = require('../../../data/navigation.data');
var core_1 = require('@angular/core');
var MenuNavigationComponent = (function () {
    function MenuNavigationComponent() {
        this.tabs = navigation_data_1.NAVIGATION_TABS;
        this.tabChange = new core_1.EventEmitter();
    }
    /**
     * Emitting to parent that navigation tab has been changed
     */
    MenuNavigationComponent.prototype.onClick = function (tab) {
        this.tabChange.emit(tab);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], MenuNavigationComponent.prototype, "currentTab", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], MenuNavigationComponent.prototype, "tabChange", void 0);
    MenuNavigationComponent = __decorate([
        core_1.Component({
            selector: 'menu-navigation',
            templateUrl: './templates/menu/navigation/menu.navigation.component.html',
            styleUrls: ['./css/menu/navigation/menu.navigation.component.css']
        }), 
        __metadata('design:paramtypes', [])
    ], MenuNavigationComponent);
    return MenuNavigationComponent;
}());
exports.MenuNavigationComponent = MenuNavigationComponent;
