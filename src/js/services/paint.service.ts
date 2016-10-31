import 'rxjs/add/operator/toPromise';
import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';
import { PaintModel } from '../models/paint.model';
import { ICoordinates } from '../interfaces/coordinates.interface';

@Injectable()
export class PaintService {

	protected paintSettingsChanged = new Subject<PaintModel>();
	public    paintSettings = new PaintModel();
	public    paintSettingsChanged$ = this.paintSettingsChanged.asObservable();

	/**
	 * Setting style settings to the context
	 */
	private applyCanvasSettings(): void {
		this.paintSettings.ctx.lineJoin = "round";
		this.paintSettings.ctx.lineCap = "round";
		this.paintSettings.ctx.lineWidth = this.paintSettings.activeSize;
		this.paintSettings.ctx.strokeStyle = this.paintSettings.activeColor;
		this.paintSettings.ctx.fillStyle  = this.paintSettings.activeColor;
	}

	/**
	 * Drawing a circle
	 */
	private drawCircle(coordinates: ICoordinates[]): void {
		this.paintSettings.ctx.beginPath();
		this.paintSettings.ctx.arc(coordinates[0].x, coordinates[0].y, this.paintSettings.ctx.lineWidth / 2, 0, Math.PI * 2);
		this.paintSettings.ctx.fill();
		this.paintSettings.ctx.closePath();
	}

	/**
	 * Drawing a Quadratic Curve
	 */
	private drawQuadraticCurve(coordinates: ICoordinates[]): void {
		let ctx = this.paintSettings.ctx;

		ctx.beginPath();
		ctx.moveTo(coordinates[0].x, coordinates[0].y);

		for (let i = 1; i < coordinates.length - 2; i++) {
			let middleX = (coordinates[i].x + coordinates[i + 1].x) / 2;
			let middleY = (coordinates[i].y + coordinates[i + 1].y) / 2;

			ctx.quadraticCurveTo(coordinates[i].x, coordinates[i].y, middleX, middleY);
		}

		ctx.quadraticCurveTo(
			coordinates[coordinates.length - 2].x,
			coordinates[coordinates.length - 2].y,
			coordinates[coordinates.length - 1].x,
			coordinates[coordinates.length - 1].y
		);

		ctx.stroke();
	}

	/**
	 * Drawing a line
	 */
	public drawLine(coordinates: ICoordinates[]): void {
		this.applyCanvasSettings();

		if (coordinates.length < 3) {
			return this.drawCircle(coordinates);
		}

		this.drawQuadraticCurve(coordinates);
	}

	/**
	 * Enabling Paint mode
	 */
	public enablePaintMode(): void {
		this.paintSettings.isActive = true;
		this.paintSettingsChanged.next(this.paintSettings);
	}

	/**
	 * Disabling Paint mode
	 */
	public disablePaintMode() {
		this.paintSettings.isActive = false;
		this.paintSettingsChanged.next(this.paintSettings);
	}

	/**
	 * Setting canvas element reference into the model
	 */
	public setCanvas(canvas: HTMLCanvasElement): void {
		this.paintSettings.canvas = canvas;
		this.paintSettings.ctx = this.paintSettings.canvas.getContext("2d");
	}

	/**
	 * Setting active color into the model
	 */
	public setActiveColor(color: string): void {
		this.paintSettings.activeColor = color;
	}

	/**
	 * Setting active size into the model
	 */
	public setActiveSize(size: number): void {
		this.paintSettings.activeSize = size;
	}

	/**
	 * Clear draw layer
	 */
	public clearDrawLayer(): void {
		this.paintSettings.ctx.clearRect(0, 0, this.paintSettings.canvas.width, this.paintSettings.canvas.height);
	}
}
