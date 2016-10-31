import { CanvasLayerModel } from '../models/canvas.layer.model';

export class LayerControlsModel {

	public layer: CanvasLayerModel;
	public boundingBoxBorderWidth = 2;

	constructor(layer: CanvasLayerModel) {
		this.layer = layer;
	}

	/**
	 * Getter for current x position
	 */
	public get x(): number {
		return this.layer.x + this.layer.layerLimits.x - this.boundingBoxBorderWidth
	}

	/**
	 * Getter for current y position
	 */
	public get y(): number {
		return this.layer.y + this.layer.layerLimits.y - this.boundingBoxBorderWidth;
	}

	/**
	 * Getter for current angle
	 */
	public get angle(): number {
		return this.layer.angle * 180 / Math.PI;
	}
}
