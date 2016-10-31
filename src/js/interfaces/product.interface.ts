import { ILayerLimits } from './layer.interface';

export interface IProduct {
	name: string;
	previewImageUrl: string;
	mainImageUrl: string;
	layerLimits: ILayerLimits;
}
