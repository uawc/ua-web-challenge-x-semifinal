import { Subscription } from "rxjs/Rx";
import { EventService } from '../../../services/event.service';
import { PaintService } from '../../../services/paint.service';
import { LayersService } from '../../../services/layers.service';
import { ProductService } from '../../../services/product.service';
import { ControlsService } from '../../../services/controls.service';
import { EditorControlsComponent } from './editor.controls.component';
import { Component, ViewChild, ElementRef, ViewChildren, QueryList } from '@angular/core';

@Component({
	selector: 'editor-canvas',
	templateUrl: './templates/editor/canvas/editor.canvas.component.html',
	styleUrls: ['./css/editor/canvas/editor.canvas.component.css'],
	directives: [[ EditorControlsComponent ]]
})

export class EditorCanvasComponent {

	@ViewChild("canvasDraw") $canvasDraw: ElementRef;
	@ViewChild("limitFrame") $limitFrame: ElementRef;
	@ViewChild("backgroundImage") $backgroundImage: ElementRef;
	@ViewChildren('canvasLayers') $canvasLayers: QueryList<ElementRef>;
	
	protected canvasLayersChanged: Subscription;

	constructor(private layersService: LayersService, 
	            private eventService: EventService,
	            private controlsService: ControlsService,
	            private paintService: PaintService,
				private productService: ProductService) {}

	/**
	 * Setting elements references to models on component's ngOnInit
	 */
	protected ngOnInit(): void {
		this.productService.saveBackgroundElement(this.$backgroundImage.nativeElement);
		this.eventService.saveContainerElement(this.$limitFrame.nativeElement);
	}

	/**
	 * Listening for "canvasLayers" Children amount changing on component's ngAfterViewInit
	 */
	protected ngAfterViewInit(): void {
		this.canvasLayersChanged = this.$canvasLayers.changes.subscribe(this.onCanvasAmountChanged.bind(this));
	}

	/**
	 * Checking whether canvasDraw element is accessible and set it to paintSettings model on component's ngDoCheck
	 */
	protected ngDoCheck(): void {
		this.$canvasDraw && this.paintService.setCanvas(this.$canvasDraw.nativeElement as HTMLCanvasElement);
	}

	/**
	 * Unsubscribe events on component's ngOnDestroy
	 */
	protected ngOnDestroy(): void {
		this.canvasLayersChanged.unsubscribe();
	}

	/**
	 * Drawing a dot on draw layer clicking
	 */
	protected onDrawLayerClick(event: Event): void {
		this.eventService.isDraw = true;
		this.eventService.saveMouseCoordinates(event);
		this.paintService.drawLine(this.eventService.coordinates);
	}

	/**
	 * Adding canvas element reference to each layer model after rendering all layers by component
	 */
	protected onCanvasAmountChanged(queryList: QueryList<ElementRef>): void {
		if (queryList.length) {
			queryList.forEach((element, index) => this.layersService.addCanvasElementToModel(element.nativeElement, index));

			this.layersService.renderAllLayers();
		}
	}
}
