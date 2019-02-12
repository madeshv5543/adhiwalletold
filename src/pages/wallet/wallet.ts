import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { WebservicProvider } from '../../providers/webservic/webservic';
import { TokenserviceProvider } from '../../providers/webservic/tokenService';

import { TabsPage } from '../tabs/tabs'

@Component({
  selector: 'wallet',
  templateUrl: 'wallet.html',
  providers:[WebservicProvider]
})
export class WalletPage {
 public token:any = null;
    showQr:boolean = false;
    balance:any = 0;
    account:any= {};
    value = "test";
    selectedCur:any;
    public todayPrice:any ={
      "BTT":1,
      "ETH":1
    }
  constructor(public navCtrl: NavController,public webserve:WebservicProvider, public tokenService:TokenserviceProvider,  public navParams: NavParams) {
    this.token = this.navParams.data;
    this.gettodayPrice()
    this.getBalance()
    this.getUserData()
  }
 gotoinfo () {
  console.log('INFORMATION ON TOKEN : ',this.navParams.data)
  let token = this.navParams.data
  this.navCtrl.push(TabsPage, {token})
 }
  doRefresh(e){
    this.gettodayPrice()
    setTimeout(() => {
      e.complete()
    }, 2000);
  }

  ionViewWillEnter(){
    this.getBalance()
  }

  
  gettodayPrice(){
    let self = this;
    self.webserve.getTodayPrice()
    .subscribe(res=>{
       self.todayPrice = res;
    },err=>{
       console.log(err)
    })
  }

  getUserData () {
    this.webserve.getStoredData()
    .then(
      res => {
          this.account = res;
          this.showQr= true;
      }
    )    
  }

    
  

  getBalance(){
    let self = this;
    self.tokenService.balanceOf(self.token.contractAddress)
    .then(
      res =>{
        self.balance = res;
      },
      err =>{
        self.balance =0;
        console.log("Err on the getting balance")
      }
    )

  }

  
}
