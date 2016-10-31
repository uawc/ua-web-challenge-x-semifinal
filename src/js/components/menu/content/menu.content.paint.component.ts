import { PaintService } from '../../../services/paint.service';
import { Component, Output, EventEmitter } from '@angular/core';
import { LayersService } from '../../../services/layers.service';
import { ControlsService } from '../../../services/controls.service';

@Component({
	selector: 'menu-content-paint',
	templateUrl: './templates/menu/content/menu.content.paint.component.html',
	styleUrls: ['./css/menu/content/menu.content.paint.component.css']
})

export class MenuContentPaintComponent  {

	@Output() paintSaved = new EventEmitter();

	constructor(private layersService: LayersService, 
	            private paintService: PaintService, 
	            private controlsService: ControlsService) {}

	/**
	 * Enabling paint mode and deactivating all layers on component's ngOnInit
	 */
	protected ngOnInit(): void {
		this.paintService.enablePaintMode();
		this.controlsService.hideControls();
		this.layersService.deactivateAllLayers();
	}

	/**
	 * Disabling paint mode on component's ngOnDestroy
	 */
	protected ngOnDestroy(): void {
		this.paintService.disablePaintMode();
	}

	/**
	 * Handling color changing
	 */
	protected onColorClick(color: string): void {
		this.paintService.setActiveColor(color);
	}

	/**
	 * Handling brush size
	 */
	protected onBrashSizeClick(size: number): void {
		this.paintService.setActiveSize(size);
	}

	/**
	 * Handling "save paint" button clicking
	 */
	protected savePaint(): void {
		let dataURL = this.paintService.paintSettings.canvas.toDataURL();

		this.layersService.createLayer(dataURL, true);
		this.layersService.makeLastLayerActive();
		this.paintSaved.emit();
		this.paintService.clearDrawLayer();
		this.controlsService.showControls(this.layersService.activeLayer);
	}

	/**
	 * Handling "clear paint" button clicking
	 */
	protected clearPaint(): void {
		this.paintService.clearDrawLayer();
	}
}
