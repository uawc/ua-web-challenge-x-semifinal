"use strict";
var paint_data_1 = require('../data/paint.data');
var PaintModel = (function () {
    function PaintModel() {
        this.isActive = false;
        this.colors = paint_data_1.PAINT_DATA.colors;
        this.sizes = paint_data_1.PAINT_DATA.sizes;
        this.activeColor = paint_data_1.PAINT_DATA.colors[0];
        this.activeSize = paint_data_1.PAINT_DATA.sizes[2];
    }
    return PaintModel;
}());
exports.PaintModel = PaintModel;
