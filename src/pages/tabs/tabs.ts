import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { WalletPage } from '../wallet/wallet';
import { TopupPage } from '../topup/topup';
import { HomePage } from '../home/home';
import { CouponsPage } from '../coupons/coupons';
import { CashoutPage }  from '../cashout/cashout';
import { ReceivePage } from '../receive/receive';
import { DepositPage } from '../deposit/deposit'


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  tab1Root = HomePage;
  tab2Root = WalletPage;
  tab3Root = TopupPage;
  tab4Root = CouponsPage;
  cashout = CashoutPage;
  deposit = DepositPage;
  receive = ReceivePage;
  mySelectedIndex : any;

  constructor(public navCtrl: NavController,public navParams: NavParams) {
    console.log("params in tabls", this.navParams)
    this.mySelectedIndex = this.navParams.get('tabIndex');
    console.log('SELECTED INDEX : ',this.mySelectedIndex)
  }
}
