import { Component } from '@angular/core';
import {  NavController, NavParams, ToastController, LoadingController, AlertController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TokenserviceProvider } from '../../providers/webservic/tokenService';

import { NotificationsPage } from '../notifications/notifications'
import { toArray } from 'rxjs/operators';

@Component({
  selector: 'page-payment',
  templateUrl: 'payment.html',
})
export class PaymentPage {
  private todo : FormGroup;
  public amount = 1000;
  public to ="0xe07b1da4084ae2bd114012ff6709735cdba4ffef";
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



}
