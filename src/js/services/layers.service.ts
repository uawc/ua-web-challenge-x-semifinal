import * as _ from 'underscore';
import 'rxjs/add/operator/toPromise';
import { Injectable } from '@angular/core';
import { PRODUCTS } from '../data/product.data';
import { CanvasLayerModel } from '../models/canvas.layer.model';
import { ILayerLimits } from '../interfaces/layer.interface';

@Injectable()
export class LayersService {

	protected   activeLayerIndex: number;
	public      layers: CanvasLayerModel[] = [];
	public      layerLimits: ILayerLimits = PRODUCTS[0].layerLimits;

	/**
	 * Clearing canvas layer
	 */
	protected clearLayer(layer: CanvasLayerModel): void {
		layer.ctx.clearRect(0, 0, layer.canvas.width, layer.canvas.height);
	}

	/**
	 * Changing layer z-index position
	 */
	protected changeLayerZIndex(index: number): void {
		let activeLayer = this.layers.splice(this.activeLayerIndex, 1);

		this.activeLayerIndex = index;
		this.layers.splice(this.activeLayerIndex, 0, activeLayer[0]);
	}

	/**
	 * Preloading Image
	 */
	protected loadImage(imageUrl: string): Promise<HTMLImageElement> {
		let image = new Image();

		return new Promise((resolve) => {
			image.onload = () => resolve(image);
			image.src = imageUrl;
		});
	}

	/**
	 * Rendering image from server
	 */
	protected renderImageFromServer(layer: CanvasLayerModel): void {
		this.loadImage(layer.imageUrl)
			.then((image: HTMLImageElement) => {
				layer.setDefaults(image);
				layer.ctx.drawImage(image, layer.x, layer.y, layer.width, layer.height);
			});
	}

	/**
	 * Rendering image from cache
	 */
	protected renderImageFromCache(layer: CanvasLayerModel): void {
		layer.ctx.save();
		layer.ctx.translate(layer.centerPoint.x, layer.centerPoint.y);
		layer.ctx.rotate(layer.angle);
		layer.ctx.drawImage(layer.image, -layer.width / 2, -layer.height / 2, layer.width, layer.height);
		layer.ctx.restore();
	}

	/**
	 * Making first layer from the top active
	 */
	protected makeFirstLayerActive(x: number, y: number): void {
		let isActiveFound = false;

		for (let i = this.layers.length - 1; i >= 0; i--) {
			if (!isActiveFound) {
				isActiveFound = this.layers[i].isActive = this.layers[i].isClicked(x, y);
				this.activeLayerIndex = i;
			}
		}
	}

	/**
	 * Getter for active layer
	 */
	public get activeLayer(): CanvasLayerModel {
		return _.findWhere(this.layers, { isActive: true } );
	}

	/**
	 * Changing layer allowed area
	 */
	public changeLayerLimits(layerLimits: ILayerLimits): void {
		this.deleteAllLayers();
		this.layerLimits = layerLimits;
	}

	/**
	 * Creating new layer
	 */
	public createLayer(imageUrl: string, isPaint: boolean = false): void {
		this.layers.push(new CanvasLayerModel({ layerLimits: this.layerLimits, imageUrl, isPaint }));
	}

	/**
	 * Deleting active layer
	 */
	public deleteActiveLayer(): void {
		this.layers.splice(this.activeLayerIndex, 1);
	}

	/**
	 * Deleting all layers
	 */
	public deleteAllLayers(): void {
		this.layers = [];
	}

	/**
	 * Moving active layer to one step up
	 */
	public moveActiveLayerUp(): void {
		if (this.layers.length > 1 && this.activeLayerIndex !== this.layers.length - 1) {
			this.changeLayerZIndex(this.activeLayerIndex + 1);
		}
	}

	/**
	 * Moving active layer to one step down
	 */
	public moveActiveLayerDown(): void {
		if (this.layers.length > 1 && this.activeLayerIndex !== 0) {
			this.changeLayerZIndex(this.activeLayerIndex - 1);
		}
	}

	/**
	 * Moving active layer to very top
	 */
	public moveActiveLayerTop(): void {
		if (this.layers.length > 1 && this.activeLayerIndex !== this.layers.length - 1) {
			this.changeLayerZIndex(this.layers.length - 1);
		}
	}

	/**
	 * Moving active layer to very bottom
	 */
	public moveActiveLayerBottom(): void {
		if (this.layers.length > 1 && this.activeLayerIndex !== 0) {
			this.changeLayerZIndex(0);
		}
	}

	/**
	 * Adding canvas element reference into the model
	 */
	public addCanvasElementToModel(canvasElement: HTMLCanvasElement, index: number): void {
		this.layers[index].updateCanvasElement(canvasElement);
	}

	/**
	 * Rendering layer
	 */
	public renderLayer(layer: CanvasLayerModel): void {
		this.clearLayer(layer);
		
		if (!layer.image) {
			this.renderImageFromServer(layer);
		} else {
			this.renderImageFromCache(layer);
		}
	}

	/**
	 * Rendering all layers
	 */
	public renderAllLayers(): void {
		this.layers.forEach((layer: CanvasLayerModel) => this.renderLayer(layer));
	}

	/**
	 * Deactivating all layers
	 */
	public deactivateAllLayers(): void {
		this.layers.forEach((layer: CanvasLayerModel) => layer.isActive = false);
	}

	/**
	 * Making layer active
	 */
	public makeLayerActive(x: number, y: number): void {
		this.deactivateAllLayers();
		this.makeFirstLayerActive(x, y);
	}

	/**
	 * Making last added layer active
	 */
	public makeLastLayerActive(): void {
		this.deactivateAllLayers();

		 this.layers[this.layers.length - 1].isActive = true;
	}

	/**
	 * Moving active layer
	 */
	public moveActiveLayer(dX: number, dY: number): void {
		let activeLayer = this.activeLayer;

		if (activeLayer) {
			activeLayer.move(dX, dY);
			this.renderLayer(activeLayer);
		}
	}

	/**
	 * Rotating active layer
	 */
	public rotateActiveLayer(dAngle: number): void {
		let activeLayer = this.activeLayer;

		if (activeLayer) {
			activeLayer.rotate(dAngle);
			this.renderLayer(activeLayer);
		}
	}

	/**
	 * Scaling active layer
	 */
	public scaleActiveLayer(dX: number, dY: number, control: string): void {
		let activeLayer = this.activeLayer;

		if (activeLayer) {
			activeLayer.scale(dX, dY, control);
			this.renderLayer(activeLayer);
		}
	}
}
