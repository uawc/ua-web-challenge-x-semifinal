import { Component } from '@angular/core';
import { IProduct } from '../../../interfaces/product.interface';
import { LayersService } from '../../../services/layers.service';
import { ProductService } from '../../../services/product.service';
import { ControlsService } from '../../../services/controls.service';

@Component({
	selector: 'menu-content-product',
	templateUrl: './templates/menu/content/menu.content.product.component.html',
	styleUrls: ['./css/menu/content/menu.content.product.component.css']
})

export class MenuContentProductComponent {

	constructor(private productService: ProductService, 
	            private layersService: LayersService,
				private controlsService: ControlsService) {}

	/**
	 * Handling product changing
	 */
	protected onClick(product: IProduct): void {
		this.layersService.changeLayerLimits(product.layerLimits);
		this.productService.changeProduct(product);
		this.controlsService.hideControls();
	}
}
