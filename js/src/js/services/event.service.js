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
var EventService = (function () {
    function EventService() {
        this.keyMoveStep = 5;
        this.isMove = false;
        this.isRotate = false;
        this.isScale = false;
        this.isDraw = false;
        this.coordinates = [];
        this.angles = [];
        this.customAngleStep = 0.0085;
    }
    Object.defineProperty(EventService.prototype, "x", {
        /**
         * Getter for current mouse x position
         */
        get: function () {
            return this.coordinates.length ? this.coordinates[this.coordinates.length - 1].x : null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EventService.prototype, "y", {
        /**
         * Getter for current mouse y position
         */
        get: function () {
            return this.coordinates.length ? this.coordinates[this.coordinates.length - 1].y : null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EventService.prototype, "dX", {
        /**
         * Getter for current mouse delta x position
         */
        get: function () {
            var length = this.coordinates.length;
            return length > 1 ? this.coordinates[length - 2].x - this.coordinates[length - 1].x : null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EventService.prototype, "dY", {
        /**
         * Getter for current mouse delta y position
         */
        get: function () {
            var length = this.coordinates.length;
            return length > 1 ? this.coordinates[length - 2].y - this.coordinates[length - 1].y : null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EventService.prototype, "angle", {
        /**
         * Getter for current delta angle position
         */
        get: function () {
            return this.angles.length ? this.angles[this.angles.length - 1] : null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EventService.prototype, "dAngle", {
        /**
         * Getting for current delta angle position
         */
        get: function () {
            var length = this.angles.length;
            var dAngle = length > 1 ? this.angles[length - 1] - this.angles[length - 2] : null;
            if (dAngle < -1) {
                return -this.customAngleStep;
            }
            if (dAngle > 1) {
                return this.customAngleStep;
            }
            return dAngle;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Saving Container element reference for further calculations
     */
    EventService.prototype.saveContainerElement = function (container) {
        this.container = container;
    };
    /**
     * Saving current mouse coordinates into array
     */
    EventService.prototype.saveMouseCoordinates = function (event) {
        var clientRect = this.container.getBoundingClientRect();
        var x = event.pageX - clientRect.left;
        var y = event.pageY - clientRect.top;
        this.coordinates.push({ x: x, y: y });
    };
    /**
     * Saving current angle into array
     */
    EventService.prototype.saveMouseAngle = function (event, layer) {
        this.saveMouseCoordinates(event);
        var dx = this.x - layer.centerPoint.x;
        var dy = this.y - layer.centerPoint.y;
        var angle = Math.atan2(dx, dy);
        angle = angle < 0 ? 2 * Math.PI + angle : angle;
        this.angles.push(angle);
    };
    /**
     * Resetting coordinates array
     */
    EventService.prototype.resetMouseCoordinates = function () {
        this.coordinates = [];
    };
    /**
     * Resetting angles array
     */
    EventService.prototype.resetMouseAngle = function () {
        this.angles = [];
    };
    /**
     * Getting position delta for keyboard event
     */
    EventService.prototype.getKeyboardMoveDelta = function (keyCode) {
        var moveDelta;
        switch (keyCode) {
            case 37:
                moveDelta = { dX: this.keyMoveStep, dY: 0 };
                break;
            case 39:
                moveDelta = { dX: -this.keyMoveStep, dY: 0 };
                break;
            case 38:
                moveDelta = { dX: 0, dY: this.keyMoveStep };
                break;
            case 40:
                moveDelta = { dX: 0, dY: -this.keyMoveStep };
                break;
            default:
                break;
        }
        return moveDelta;
    };
    EventService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], EventService);
    return EventService;
}());
exports.EventService = EventService;
