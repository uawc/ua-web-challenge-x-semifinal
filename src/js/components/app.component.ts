import { MenuComponent } from './menu/menu.component';
import { Component, HostListener } from '@angular/core';
import { EventService } from '../services/event.service';
import { EditorComponent } from './editor/editor.component';

@Component({
	selector: 'app',
	templateUrl: './templates/app.component.html',
	styleUrls: ['./css/app.component.css'],
	directives: [[ MenuComponent ], [ EditorComponent ]]
})

export class AppComponent {
	
	constructor(private eventService: EventService) {}

	/**
	 * Handling mouseup event
	 */
	@HostListener('document:mouseup', ['$event'])
	
	protected onMouseUp() {
		this.eventService.isMove = false;
		this.eventService.isRotate = false;
		this.eventService.isScale = false;
		this.eventService.isDraw = false;
		this.eventService.resetMouseCoordinates();
		this.eventService.resetMouseAngle();
	}
}
