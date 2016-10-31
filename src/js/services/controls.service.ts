import 'rxjs/add/operator/toPromise';
import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';
import { CanvasLayerModel } from '../models/canvas.layer.model';
import { LayerControlsModel } from '../models/layer.controls.model';

@Injectable()
export class ControlsService {

	protected controlsChanged = new Subject<LayerControlsModel>();
	public    controls: LayerControlsModel;

	/**
	 * Hiding control box
	 */
	public hideControls(): void {
		this.controls = null;
		this.controlsChanged.next(this.controls);
	}

	/**
	 * Showing control box
	 */
	public showControls(activeLayer: CanvasLayerModel): void {
		this.controls = activeLayer ? new LayerControlsModel(activeLayer) : null;
		this.controlsChanged.next(this.controls);
	}
}
