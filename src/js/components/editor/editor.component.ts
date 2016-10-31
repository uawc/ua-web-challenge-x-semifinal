import { Component, HostListener } from '@angular/core';
import { EventService } from '../../services/event.service';
import { PaintService } from '../../services/paint.service';
import { LayersService } from '../../services/layers.service';
import { ControlsService } from '../../services/controls.service';
import { EditorCanvasComponent } from './canvas/editor.canvas.component';

@Component({
	selector: 'editor',
	templateUrl: './templates/editor/editor.component.html',
	styleUrls: ['./css/editor/editor.component.css'],
	directives: [[ EditorCanvasComponent ]]
})

export class EditorComponent {
	
	constructor(private layersService: LayersService,
	            private controlsService: ControlsService,
				private eventService: EventService,
				private paintService: PaintService) {}

	/**
	 * Handling mousedown event
	 */
	@HostListener('mousedown', ['$event'])
	
	protected onMouseDown(event: Event): void {
		if (this.paintService.paintSettings.isActive) {
			return;
		}
		this.eventService.isMove = true;
		this.eventService.saveMouseCoordinates(event);
		this.makeLayerActive(this.eventService.x, this.eventService.y);
	}

	/**
	 * Handling keydown event
	 */
	@HostListener('document:keydown', ['$event'])

	protected onKeyDown(event: KeyboardEvent): void {
		let moveDelta = this.eventService.getKeyboardMoveDelta(event.keyCode as number);

		if (moveDelta) {
			this.layersService.moveActiveLayer(moveDelta.dX, moveDelta.dY);
		}
	}

	/**
	 * Handling mousemove event
	 */
	@HostListener('mousemove', ['$event'])

	protected onMouseMove(event: Event): void {
		if (this.eventService.isMove && !this.eventService.isDraw) {
			this.moveActiveLayer(event);
		}

		if (this.eventService.isRotate) {
			this.rotateActiveLayer(event);
		}

		if (this.eventService.isScale) {
			this.scaleActiveLayer(event);
		}

		if (this.eventService.isDraw && this.paintService.paintSettings.isActive) {
			this.drawLayer(event);
		}
	}

	/**
	 * Scaling active layer
	 */
	protected scaleActiveLayer(event: Event): void {
		this.eventService.saveMouseCoordinates(event);
		this.layersService.scaleActiveLayer(this.eventService.dX, this.eventService.dY, this.eventService.scaleControl);
	}

	/**
	 * Drawing a line in draw mode
	 */
	protected drawLayer(event: Event): void {
		this.eventService.saveMouseCoordinates(event);
		this.paintService.drawLine(this.eventService.coordinates);
	}

	/**
	 * Moving active layer
	 */
	protected moveActiveLayer(event: Event): void {
		this.eventService.saveMouseCoordinates(event);
		this.layersService.moveActiveLayer(this.eventService.dX, this.eventService.dY);
	}

	/**
	 * Rotating active layer
	 */
	protected rotateActiveLayer(event: Event): void {
		this.eventService.saveMouseAngle(event, this.layersService.activeLayer);
		this.layersService.rotateActiveLayer(this.eventService.dAngle);
	}

	/**
	 * Making clicked layer active
	 */
	protected makeLayerActive(x: number, y: number): void {
		this.layersService.makeLayerActive(x, y);
		this.controlsService.showControls(this.layersService.activeLayer);
	}
}
