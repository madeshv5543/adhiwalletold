import { NgModule } from '@angular/core';
import { TokenviewComponent } from './tokenview/tokenview';
import {  IonicModule } from 'ionic-angular';

@NgModule({
	declarations: [TokenviewComponent],
	imports: [IonicModule],
	exports: [TokenviewComponent]
})
export class ComponentsModule {}
