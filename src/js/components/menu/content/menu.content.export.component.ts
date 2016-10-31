import { Component } from '@angular/core';
import { LayersService } from '../../../services/layers.service';
import { ProductService } from '../../../services/product.service';
import { CanvasLayerModel } from '../../../models/canvas.layer.model';

@Component({
	selector: 'menu-content-export',
	templateUrl: './templates/menu/content/menu.content.export.component.html',
	styleUrls: ['./css/menu/content/menu.content.export.component.css']
})

export class MenuContentExportComponent {

	constructor(private layersService: LayersService, 
	            private productService: ProductService) {}

	/**
	 * Export image on "save" button clicking 
	 */
	protected exportImage(event: Event): void {
		event.currentTarget['href'] = this.generateImageUrl();
	}

	/**
	 * Drawing multiple canvases into one and generating dataURL
	 */
	protected generateImageUrl(): string {
		let canvas = document.createElement("canvas");
		let ctx = canvas.getContext('2d');

		canvas.width = this.productService.$backgroundImage.width;
		canvas.height = this.productService.$backgroundImage.height;

		ctx.drawImage(this.productService.$backgroundImage, 0, 0);

		this.layersService.layers.forEach((layer: CanvasLayerModel) => {
			ctx.drawImage(layer.canvas, layer.layerLimits.x, layer.layerLimits.y);
		});

		return canvas.toDataURL("image/png");
	}
}
