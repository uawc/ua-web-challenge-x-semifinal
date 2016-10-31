import { ITab } from '../../../interfaces/tab.interface';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MenuContentImageComponent } from './menu.content.image.component';
import { MenuContentPaintComponent } from './menu.content.paint.component';
import { MenuContentExportComponent } from './menu.content.export.component';
import { MenuContentProductComponent } from './menu.content.product.component';

@Component({
	selector: 'menu-content',
	templateUrl: './templates/menu/content/menu.content.component.html',
	styleUrls: ['./css/menu/content/menu.content.component.css'],
	directives: [[MenuContentProductComponent], [MenuContentImageComponent], [MenuContentPaintComponent], [MenuContentExportComponent]]
})

export class MenuContentComponent {
	
	@Input()  currentTab: ITab;
	@Output() paintSaved = new EventEmitter();

	/**
	 * Emitting to parent that paint in draw mode has been saved
	 */
	onPaintSaved(): void {
		this.paintSaved.emit();
	}
}
