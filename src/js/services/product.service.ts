import 'rxjs/add/operator/toPromise';
import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';
import { PRODUCTS } from '../data/product.data';
import { IProduct } from '../interfaces/product.interface';

@Injectable()
export class ProductService {
	protected   productChanged = new Subject<IProduct>();
	public      $backgroundImage: HTMLImageElement;
	public      products: IProduct[] = PRODUCTS;
	public      currentProduct: IProduct = PRODUCTS[0];
	public      productChanged$ = this.productChanged.asObservable();

	/**
	 * Changing current product
	 */
	public changeProduct(product: IProduct): void {
		this.currentProduct = product;
		this.productChanged.next(this.currentProduct);
	}

	/**
	 * Setting background image element reference
	 */
	public saveBackgroundElement($backgroundImage: HTMLImageElement): void {
		this.$backgroundImage = $backgroundImage;
	}
}
