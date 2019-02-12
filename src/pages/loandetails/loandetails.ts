import { Component } from '@angular/core';
import {  NavController, NavParams, ToastController, LoadingController, AlertController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TokenserviceProvider } from '../../providers/webservic/tokenService';

import { PayPage } from '../pay/pay'

import { NotificationsPage } from '../notifications/notifications'
import { toArray } from 'rxjs/operators';

@Component({
  selector: 'page-loandetails',
  templateUrl: 'loandetails.html',
})
export class LoanDetailsPage {
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
  gotopay() {
      this.navCtrl.push(PayPage)
  }


}
