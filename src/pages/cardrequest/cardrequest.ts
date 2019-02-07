import { Component } from '@angular/core';
import {  NavController, NavParams, ToastController, LoadingController, AlertController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TokenserviceProvider } from '../../providers/webservic/tokenService';

import { NotificationsPage } from '../notifications/notifications'
import { toArray } from 'rxjs/operators';

@Component({
  selector: 'page-cardrequest',
  templateUrl: 'cardrequest.html',
})
export class CardrequestPage {
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
 
 ionViewWillEnter() {
   this.getCardList()
 }
  ionViewDidLoad() {
    console.log('ionViewDidLoad CardrequestPage');
  }

  createToast = (msg) => {
    return this.toastCtrl.create({ message: msg, duration: 2000 })
  }

  goToHome(){
    this.navCtrl.setRoot(NotificationsPage);
  }

  getCardList() {
    let self = this;
    self.tokenService.getUserCardList()
    .subscribe(
      (res:any) => {
        if(res.status !== 200){
          let toast = self.createToast(res.message);
          toast.present()
        }else{
          self.cardlist = res.data;
        }
      },
      err =>{
        self.cardlist = [];
        let toast = self.createToast('Please try after sometime')
        toast.present()
      }
    )
  }

  showConfirmAlert(cardNumber) {
    let alert = this.alertCtrl.create({
        title: 'Block Card',
        message: `Are you sure you want to permanently block this ${cardNumber} card?`,
        buttons: [
            {
                text: 'No',
                handler: () => {
                    console.log('Cancel clicked');
                }
            },
            {
                text: 'Yes',
                handler: () => {
                  this.blockCard(cardNumber)
                }
            }
        ]
    })
    alert.present()
  }

  blockCard = (cardNumber) =>{
    let self = this;
    let loading = self.loadCtrl.create()
    loading.present();
    self.tokenService.blockCard(cardNumber)
    .subscribe(
      (res:any) => {
        loading.dismissAll();
        if(res.status !== 200){
          let toast = self.createToast(res.message);
          toast.present()
        }else{
         let toast = self.createToast(`Card ${cardNumber} Blocked Successfully.`)
         toast.present()
         self.getCardList()
        }
      },
      err =>{
        loading.dismissAll();
        let toast = self.createToast('Please try after sometime')
        toast.present()
      }
    )
  }

  logForm(){
    let self = this;
    let data = this.todo.value;
    let loading = self.loadCtrl.create();
    loading.present()
    self.tokenService.placeCardRequest(data)
    .subscribe(
      (res:any) => {
        loading.dismissAll()
        if (res.status !== 200) {
          let toast = self.createToast(res.message)
          toast.present()
        }else{
          self.showSuccess = true;
          self.getCardList()
        }
      },
      err => {
        loading.dismissAll()
        let toast = self.createToast('Please try after sometime')
        toast.present()
      }
    )
  }

}
