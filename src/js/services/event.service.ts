import { Injectable } from '@angular/core';
import { CanvasLayerModel } from '../models/canvas.layer.model';
import { ICoordinatesDelta } from '../interfaces/coordinates.interface';

@Injectable()
export class EventService {
	private container: HTMLElement;
	private keyMoveStep = 5;

	public  isMove = false;
	public  isRotate = false;
	public  isScale = false;
	public  isDraw = false;
	
	public  coordinates = [];
	public  angles: number[] = [];
	public  customAngleStep = 0.0085;
	public  scaleControl: string;

	/**
	 * Getter for current mouse x position
	 */
	public get x(): number {
		return this.coordinates.length ? this.coordinates[this.coordinates.length - 1].x : null;
	}

	/**
	 * Getter for current mouse y position
	 */
	public get y(): number {
		return this.coordinates.length ? this.coordinates[this.coordinates.length - 1].y : null;
	}

	/**
	 * Getter for current mouse delta x position
	 */
	public get dX(): number {
		let length = this.coordinates.length;

		return length > 1 ? this.coordinates[length - 2].x - this.coordinates[length - 1].x: null;
	}

	/**
	 * Getter for current mouse delta y position
	 */
	public get dY(): number {
		let length = this.coordinates.length;

		return length > 1 ? this.coordinates[length - 2].y - this.coordinates[length - 1].y: null;
	}

	/**
	 * Getter for current delta angle position
	 */
	public get angle(): number {
		return this.angles.length ? this.angles[this.angles.length - 1] : null;
	}

	/**
	 * Getting for current delta angle position
	 */
	public get dAngle(): number {
		let length = this.angles.length;
		let dAngle = length > 1 ? this.angles[length - 1] - this.angles[length - 2]: null;

		if (dAngle < -1) {
			return -this.customAngleStep;
		}

		if (dAngle > 1) {
			return this.customAngleStep;
		}

		return dAngle;
	}

	/**
	 * Saving Container element reference for further calculations
	 */
	public saveContainerElement(container: HTMLElement) {
		this.container = container;
	}

	/**
	 * Saving current mouse coordinates into array
	 */
	public saveMouseCoordinates(event: any): void {
		let clientRect = this.container.getBoundingClientRect();

		let x = event.pageX - clientRect.left;
		let y = event.pageY - clientRect.top;

		this.coordinates.push({ x, y });
	}

	/**
	 * Saving current angle into array
	 */
	public saveMouseAngle(event: Event, layer: CanvasLayerModel): void {
		this.saveMouseCoordinates(event);

		let dx = this.x - layer.centerPoint.x;
		let dy = this.y - layer.centerPoint.y;

		let angle = Math.atan2(dx, dy);

		angle = angle < 0 ? 2 * Math.PI + angle : angle;

		this.angles.push(angle);
	}

	/**
	 * Resetting coordinates array
	 */
	public resetMouseCoordinates(): void {
		this.coordinates = [];
	}

	/**
	 * Resetting angles array
	 */
	public resetMouseAngle(): void {
		this.angles = [];
	}

	/**
	 * Getting position delta for keyboard event
	 */
	public getKeyboardMoveDelta(keyCode: number): ICoordinatesDelta {
		let moveDelta;

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
	}
}
