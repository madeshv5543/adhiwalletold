import { Component } from '@angular/core';
import {  NavController, NavParams, ToastController, LoadingController, AlertController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TokenserviceProvider } from '../../providers/webservic/tokenService';

import { NotificationsPage } from '../notifications/notifications'
import { toArray } from 'rxjs/operators';

import { Storage } from '@ionic/storage';

import { TopupPage } from '../topup/topup'
import { TabsPage } from '../tabs/tabs'

@Component({
  selector: 'page-deposit',
  templateUrl: 'deposit.html',
})
export class DepositPage {
  private todo : FormGroup;
  public amount;
  public showSuccess= false;
  public token:any = null;
  public  pattern= /([0-9]{4})/;
  public cardlist = [];
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private formBuilder: FormBuilder,
    private storage:Storage,
    private tokenService:TokenserviceProvider,
    private toastCtrl: ToastController,
    private loadCtrl: LoadingController,
    private alertCtrl: AlertController
    ) {
      this.token = this.navParams.data;
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

gotoinfo() {
  console.log('INFORMATION ON TOKEN : ',this.navParams.data)
  let token = this.navParams.data
  this.navCtrl.push(TabsPage, {token})

}

}
