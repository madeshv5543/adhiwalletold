import { Component } from '@angular/core';
import { AppState } from '../../providers/AppState';

@Component({
    selector:'page-setting',
    templateUrl: 'setting.html'
})

export class SettingPage{
    selectedTheme:String;
    constructor(public appState:AppState){
        this.appState.getActiveTheme().subscribe(val => {
            this.selectedTheme = val;
        })
    }

    toggleAppTheme() {
        if(this.selectedTheme = 'theme-red'){
            this.appState.setActiveTheme('theme-noir');
        }else{
            this.appState.setActiveTheme('theme-red');
        }
    }
}