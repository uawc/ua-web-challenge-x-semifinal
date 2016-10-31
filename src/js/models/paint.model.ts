import { PAINT_DATA } from '../data/paint.data';

export class PaintModel {
	public canvas: HTMLCanvasElement;
	public ctx: CanvasRenderingContext2D;

	public isActive = false;
	public colors = PAINT_DATA.colors;
	public sizes = PAINT_DATA.sizes;
	public activeColor = PAINT_DATA.colors[0];
	public activeSize = PAINT_DATA.sizes[2];
}
