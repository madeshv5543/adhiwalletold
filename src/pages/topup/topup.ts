import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';

import { WebservicProvider } from '../../providers/webservic/webservic';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { TokenserviceProvider } from '../../providers/webservic/tokenService';

@Component({
  selector: 'page-topup',
  templateUrl: 'topup.html'
})
export class TopupPage {
public token:any= null;
public balance: any = 0;
 public todayPrice:any ={
  "BTT":1,
  "ETH":1
}
 public ethTransaction:any  =[];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public webservice:WebservicProvider,
    private iab: InAppBrowser,
    private toastCtrl:ToastController,
    private tokenSevice:TokenserviceProvider
  ) {
      this.token= this.navParams.data;
      console.log(this.navParams)
      this.getBalance()
      this.gettodayPrice();
      this.getEtheriumTransaction(this.token.contractAddress)
  }

  // doRefresh(e){
  //   this.getBalance()
  //   this.gettodayPrice();
  //   setTimeout(() => {
  //     e.complete()
  //   }, 2000);
  // }

  getBalance(){
    let self = this;
    self.tokenSevice.balanceOf(self.token.contractAddress)
    .then(
      res =>{
        self.balance = res
      },
      err =>{
        let toast = self.toastCtrl.create({message: 'Cannot get the balance', duration: 2000});
        toast.present();
        self.balance =0;
      }
    )
  }

  OpenUrl(url)
    {
        const browser = this.iab.create(url);
        browser.show()
    }  
  ionViewWillEnter() { 
    this.token= this.navParams.data;
    this.getBalance()
    this.gettodayPrice();
    this.getEtheriumTransaction(this.token.contractAddress)
   }
   

   getEtheriumTransaction(address){
     let respromise:any;
       respromise = this.webservice.getTokenTxList(this.token.contractAddress)
    //  if(this.selectedCur == 'Etheriun' || this.selectedCur == 'evenscoin' ){
      respromise.then(
        res=>{
          this.ethTransaction = res;
        }
      )
    //  }
   }

 
  
   gettodayPrice(){
    let self = this;
    self.webservice.getTodayPrice()
    .subscribe(res=>{
       self.todayPrice = res;
    },err=>{
      let toast = self.toastCtrl.create({ message: 'Please try after some time.', duration: 2000  });
      toast.present()
    })
  }

  
}
