import { IMAGES } from '../../../data/image.data';
import { IImage } from '../../../interfaces/image.interface';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { LayersService } from '../../../services/layers.service';

@Component({
	selector: 'menu-content-image',
	templateUrl: './templates/menu/content/menu.content.image.component.html',
	styleUrls: ['./css/menu/content/menu.content.image.component.css']
})

export class MenuContentImageComponent  {

	protected images: IImage[] = IMAGES;

	@ViewChild("imageList") $imageList: ElementRef;

	constructor(private layersService: LayersService) {}

	/**
	 * Creating a new layer and adding it to an editor on image icon clicking
	 */
	protected onClick(image: IImage): void {
		this.layersService.createLayer(image.url)
	}

	/**
	 * Loading image from local disc on "load image" button clicking
	 */
	protected loadImage(event: any): void {
		this.images.unshift({ name: Date.now() + '', url: URL.createObjectURL(event.target.files[0])});
		this.$imageList.nativeElement.scrollTop = 0;
	}
}
