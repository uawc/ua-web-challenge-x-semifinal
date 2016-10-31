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
var forms_1 = require('@angular/forms');
var http_1 = require('@angular/http');
var event_service_1 = require('./services/event.service');
var paint_service_1 = require('./services/paint.service');
var platform_browser_1 = require('@angular/platform-browser');
var app_component_1 = require('./components/app.component');
var layers_service_1 = require('./services/layers.service');
var product_service_1 = require('./services/product.service');
var controls_service_1 = require('./services/controls.service');
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [[platform_browser_1.BrowserModule, forms_1.FormsModule]],
            declarations: [[app_component_1.AppComponent]],
            bootstrap: [[app_component_1.AppComponent]],
            providers: [[http_1.HTTP_PROVIDERS], [layers_service_1.LayersService], [event_service_1.EventService], [controls_service_1.ControlsService], [paint_service_1.PaintService], [product_service_1.ProductService]]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
