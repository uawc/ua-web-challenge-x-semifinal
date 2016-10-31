import { ITab } from '../../../interfaces/tab.interface';
import { NAVIGATION_TABS } from '../../../data/navigation.data';
import { Component, EventEmitter, Output, Input } from '@angular/core';

@Component({
	selector: 'menu-navigation',
	templateUrl: './templates/menu/navigation/menu.navigation.component.html',
	styleUrls: ['./css/menu/navigation/menu.navigation.component.css']
})

export class MenuNavigationComponent {
	protected tabs: ITab[] = NAVIGATION_TABS;

	@Input()  currentTab: string;
	@Output() tabChange = new EventEmitter();

	/**
	 * Emitting to parent that navigation tab has been changed
	 */
	protected onClick(tab: ITab): void {
		this.tabChange.emit(tab);
	}
}
