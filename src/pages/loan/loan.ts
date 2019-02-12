import { Component } from '@angular/core';
import {  NavController, NavParams, ToastController, LoadingController, AlertController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TokenserviceProvider } from '../../providers/webservic/tokenService';


import { LoanDetailsPage } from '../loandetails/loandetails';

import { NotificationsPage } from '../notifications/notifications'
import { toArray } from 'rxjs/operators';

@Component({
  selector: 'page-loan',
  templateUrl: 'loan.html',
})
export class LoanPage {
  private todo : FormGroup;
  public showSuccess= false;
  public  pattern= /([0-9]{4})/;
  public cardlist = [];
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private formBuilder: FormBuilder,
    private tokenService:TokenserviceProvider,
    private toastCtrl: ToastController,
    private loadCtrl: LoadingController,
    private alertCtrl: AlertController
    ) {
    this.todo = this.formBuilder.group({
      pin: ['', Validators.required],
    });
  }
 
  createToast = (msg) => {
    return this.toastCtrl.create({ message: msg, duration: 2000 })
  }

  goToHome(){
    this.navCtrl.setRoot(NotificationsPage);
  }
  gotodetails() {
    this.navCtrl.push(LoanDetailsPage)
  }


}
