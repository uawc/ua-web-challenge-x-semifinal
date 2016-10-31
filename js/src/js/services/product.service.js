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
require('rxjs/add/operator/toPromise');
var Subject_1 = require('rxjs/Subject');
var core_1 = require('@angular/core');
var product_data_1 = require('../data/product.data');
var ProductService = (function () {
    function ProductService() {
        this.productChanged = new Subject_1.Subject();
        this.products = product_data_1.PRODUCTS;
        this.currentProduct = product_data_1.PRODUCTS[0];
        this.productChanged$ = this.productChanged.asObservable();
    }
    /**
     * Changing current product
     */
    ProductService.prototype.changeProduct = function (product) {
        this.currentProduct = product;
        this.productChanged.next(this.currentProduct);
    };
    /**
     * Setting background image element reference
     */
    ProductService.prototype.saveBackgroundElement = function ($backgroundImage) {
        this.$backgroundImage = $backgroundImage;
    };
    ProductService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], ProductService);
    return ProductService;
}());
exports.ProductService = ProductService;
