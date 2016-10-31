import { Component } from '@angular/core';
import { ITab } from '../../interfaces/tab.interface';
import { NAVIGATION_TABS } from '../../data/navigation.data';
import { MenuContentComponent } from './content/menu.content.component';
import { MenuNavigationComponent } from './navigation/menu.navigation.component';

@Component({
	selector: 'menu',
	templateUrl: './templates/menu/menu.component.html',
	styleUrls: ['./css/menu/menu.component.css'],
	directives: [[ MenuNavigationComponent ], [ MenuContentComponent ]]
})

export class MenuComponent {
	protected currentTab: ITab = NAVIGATION_TABS[0];

	/**
	 * Handling tabChange event
	 */
	protected onTabChange(tab: ITab): void {
		this.currentTab = tab;
	}

	/**
	 * Handling paintSaved event
	 */
	protected onPaintSaved(): void {
		this.currentTab = NAVIGATION_TABS[1];
	}
}
