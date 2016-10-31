import * as _ from 'underscore';
import { ILayerPosition } from '../interfaces/layer.interface';
import { ILayerLimits } from '../interfaces/layer.interface';
import { ICoordinates } from '../interfaces/coordinates.interface';
import { IScaleOffset } from '../interfaces/scale.offset.interface';

export class CanvasLayerModel {

	public image: HTMLImageElement;
	public canvas: HTMLCanvasElement;
	public ctx: CanvasRenderingContext2D;
	public centerPoint = {} as ILayerPosition;
	public layerLimits = {} as ILayerLimits;

	public x: number;
	public y: number;
	public scaleX = 0;
	public scaleY = 0;
	public width: number;
	public height: number;
	public isPaint: boolean;
	public imageUrl: string;
	public isActive: boolean;
	public prevWidth: number;
	public prevHeight: number;

	public angle = 0;

	constructor(options = {}) {
		_.extend(this, options);
	}

	/**
	 * Updating image center point
	 */
	protected updateCenterPoint(): void {
		this.centerPoint.x = this.x + this.width / 2;
		this.centerPoint.y = this.y + this.height / 2;
	}

	/**
	 * Setting default image size to be fit into the limit zone saving image ratio
	 */
	protected setDefaultSize(): void {
		let imageRatio = this.image.width / this.image.height;
		let margin = this.isPaint ? 0 : 60;

		this.height = this.layerLimits.height - margin;
		this.width = Math.floor(this.height * imageRatio);

		if (this.width >= this.layerLimits.width) {
			this.width = this.layerLimits.width - margin;
			this.height = Math.floor(this.width / imageRatio);
		}
	}

	/**
	 * Setting default image position
	 */
	protected setDefaultPosition(): void {
		this.x = this.layerLimits.width / 2 - this.width / 2;
		this.y = this.layerLimits.height / 2 - this.height / 2;
	}

	/**
	 * Calculating point coordinates after rotation
	 */
	protected getRotatedPointsPosition(mouseX: number, mouseY: number): ICoordinates {
		let x = this.centerPoint.x + mouseX * Math.cos(-this.angle) - mouseY * Math.sin(-this.angle);
		let y = this.centerPoint.y + mouseX * Math.sin(this.angle) - mouseY * Math.cos(this.angle);

		return { x, y };
	}

	/**
	 * Calculating triangle area knowing three sides of it
	 */
	protected getTriangleArea(side1: number, side2: number, side3: number): number {
		let hPer = (side1 + side2 + side3) / 2;

		return Math.sqrt(hPer * (hPer - side1) * (hPer - side2) * (hPer - side3));
	}

	/**
	 * Updating instant image position after scaling
	 */
	protected updatePositionAfterScale(deltaX: number, deltaY: number): void {
		this.centerPoint.x = this.x + this.prevWidth / 2 - deltaX;
		this.centerPoint.y = this.y + this.prevHeight / 2 - deltaY;

		this.x = this.centerPoint.x - this.width / 2;
		this.y = this.centerPoint.y - this.height / 2;
	}

	/**
	 * Getting horizontal offset on scaling
	 */
	protected getHorizontalOffset(dX: number, dY: number): IScaleOffset {
		let delta = dY * Math.sin(this.angle) + dX * Math.cos(this.angle);

		let deltaX = delta / 2 * Math.cos(this.angle);
		let deltaY = delta / 2 * Math.sin(this.angle);

		return { delta, deltaX, deltaY }
	}

	/**
	 * Getting vertical offset on scaling
	 */
	protected getVerticalOffset(dX: number, dY: number): IScaleOffset {
		let delta = dY * Math.cos(this.angle) - dX * Math.sin(this.angle);

		let deltaX = delta / 2 * Math.sin(-this.angle);
		let deltaY = delta / 2 * Math.cos(-this.angle);

		return { delta, deltaX, deltaY }
	}

	/**
	 * Updating current model with canvas element reference
	 */
	public updateCanvasElement(canvas: HTMLCanvasElement): void {
		this.canvas = canvas;
		this.ctx = this.canvas.getContext("2d");
	}

	/**
	 * Setting defaults of current model
	 */
	public setDefaults(image: HTMLImageElement): void {
		this.image = image;
		this.setDefaultSize();
		this.setDefaultPosition();
		this.updateCenterPoint();
	}

	/**
	 * Checking whether mouse point of clicking is within a current layer.
	 * NOTE FOR JUDGES: Since layer could be rotated the logic is following:
	 *                  if sum of four triangles from mouse point to image
	 *                  four vertices is equal to image area than point is
	 *                  within an image.
	 */
	public isClicked(x: number, y: number): boolean {
		let pointB = this.getRotatedPointsPosition(this.width / 2, this.height / 2);
		let pointC = this.getRotatedPointsPosition(this.width / 2, -this.height / 2);
		let pointA = this.getRotatedPointsPosition(-this.width / 2, this.height / 2);
		let pointD = this.getRotatedPointsPosition(-this.width / 2, -this.height / 2);

		let sideA = Math.hypot(x - pointA.x, y - pointA.y);
		let sideB = Math.hypot(x - pointB.x, y - pointB.y);
		let sideC = Math.hypot(x - pointC.x, y - pointC.y);
		let sideD = Math.hypot(x - pointD.x, y - pointD.y);
		let sideF = this.width;
		let sideG = this.height;

		let triangleA = this.getTriangleArea(sideA, sideB, sideF);
		let triangleB = this.getTriangleArea(sideB, sideC, sideG);
		let triangleC = this.getTriangleArea(sideC, sideD, sideF);
		let triangleD = this.getTriangleArea(sideD, sideA, sideG);

		let layerSquare =  Math.round(this.width * this.height);
		let pointTrianglesSquare = Math.round(triangleA + triangleB + triangleC + triangleD);

		return layerSquare === pointTrianglesSquare;
	}

	/**
	 * Moving current layer by x, y coordinates changing
	 */
	public move(dX: number, dY: number): void {
		this.updateCenterPoint();

		this.x -= dX;
		this.y -= dY;
		
		this.updateCenterPoint();
	}

	/**
	 * Rotating current layer by angle changing
	 */
	public rotate(dAngle: number): void {
		this.angle -= dAngle;
		this.angle = this.angle > 2 * Math.PI ? 0 : this.angle;
		this.angle = this.angle < 0 ? 2 * Math.PI : this.angle;
	}

	/**
	 * Scaling current layer by controls dragging
	 */
	public scale(dX: number, dY: number, control: string): void {
		let offset: IScaleOffset;

		if (dX === null || dY === null) {
			return;
		}

		this.prevWidth = this.width;
		this.prevHeight = this.height;

		switch (control) {
			case 'middle-right':
				offset = this.getHorizontalOffset(dX, dY);
				
				this.width -= offset.delta;
				break;
			case 'middle-left':
				offset = this.getHorizontalOffset(dX, dY);

				this.width += offset.delta;
				break;
			case 'top-center':
				offset = this.getVerticalOffset(dX, dY);

				this.height += offset.delta;
				break;
			case 'bottom-center':
				offset = this.getVerticalOffset(dX, dY);

				this.height -= offset.delta;
				break;
		}
		
		// disable scaling if image is too small
		if (this.width < 40)  { this.width = 40; offset.deltaX = 0; offset.deltaY = 0; }
		if (this.height < 40) { this.height = 40; offset.deltaX = 0; offset.deltaY = 0; }

		this.updatePositionAfterScale(offset.deltaX, offset.deltaY);
	}
}
