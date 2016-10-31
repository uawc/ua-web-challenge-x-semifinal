import { Component } from '@angular/core';
import { EventService } from '../../../services/event.service';
import { LayersService } from '../../../services/layers.service';
import { CONTROL_SCALE } from '../../../data/controls.scale.data';
import { ControlsService } from '../../../services/controls.service';
import { CONTROL_BUTTONS } from '../../../data/controls.buttons.data';
import { IControlScale } from '../../../interfaces/control.interface';
import { IControlButton } from '../../../interfaces/control.interface';

@Component({
	selector: 'editor-canvas-controls',
	templateUrl: './templates/editor/canvas/editor.controls.component.html',
	styleUrls: ['./css/editor/canvas/editor.controls.component.css']
})

export class EditorControlsComponent {

	protected buttons: IControlButton[];
	protected scaleControls: IControlScale[];

	constructor(private layersService: LayersService,
	            private eventService: EventService,
	            private controlsService: ControlsService) {}

	/**
	 * Adding default data on component's ngOnInit
	 */
	protected ngOnInit(): void {
		this.buttons = CONTROL_BUTTONS;
		this.scaleControls = CONTROL_SCALE;
	}

	/**
	 * Handling mousedown event on scale controls
	 */
	protected onScaleControlDown(event: Event, control: IControlScale): void {
		event.stopImmediatePropagation();
		
		this.eventService.isScale = true;
		this.eventService.scaleControl = control.type;
	}

	/**
	 * Handling mousedown event on control buttons
	 */
	protected onControlButtonClick(event: Event, button: IControlButton): void {
		event.stopImmediatePropagation();

		switch(button.name) {
			case 'rotate':
				this.eventService.isRotate = true;
				break;
			case 'delete': {
				this.layersService.deleteActiveLayer();
				this.controlsService.hideControls();
				break;
			}
			case 'layer-up': {
				this.layersService.moveActiveLayerUp();
				break;
			}
			case 'layer-down': {
				this.layersService.moveActiveLayerDown();
				break;
			}
			case 'layer-top': {
				this.layersService.moveActiveLayerTop();
				break;
			}
			case 'layer-bottom': {
				this.layersService.moveActiveLayerBottom();
				break;
			}
			default: {
				break;
			}
		}
	}
}
