import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HTTP_PROVIDERS } from '@angular/http';
import { EventService }  from './services/event.service';
import { PaintService }  from './services/paint.service';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent }  from './components/app.component';
import { LayersService }  from './services/layers.service';
import { ProductService }  from './services/product.service';
import { ControlsService }  from './services/controls.service';

@NgModule({
	imports: [[BrowserModule, FormsModule]],
	declarations: [[AppComponent]],
	bootstrap: [[AppComponent]],
	providers: [[HTTP_PROVIDERS], [LayersService], [EventService], [ControlsService], [PaintService], [ProductService]]
})

export class AppModule {}
