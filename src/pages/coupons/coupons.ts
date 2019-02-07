import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { WebservicProvider } from '../../providers/webservic/webservic';
//import { ModalController } from 'ionic-angular';

// import { myCouponPage } from '../my-coupon/my-coupon';

@Component({
  selector: 'page-contact',
  templateUrl: 'coupons.html'
})
export class CouponsPage {
  public selectedCur:any;
  public selectedAccount:any ={
    address:'-',
    balance:0
   }
  constructor(public navCtrl: NavController, public webservice:WebservicProvider, public toastCtrl:ToastController) {
    this.selectedCur = this.webservice.getSelectedcoin()
    // this.getBalance()
  }

  getBalance(){
    let self = this;
    let servicecall:any;
    switch(self.selectedCur){
      case 'tokenOne':
      servicecall  = self.webservice.getTokenOneBalance();
      break;
      case 'tokenTwo':
      servicecall = self.webservice.getTokenTwoBalance();
      break;
      case 'tokenThree':
      servicecall = self.webservice.getTokenThreeBalance();
      break;
    }
    servicecall
    .then(res=>{
     self.selectedAccount = res;
     },err=>{
         let toast = self.toastCtrl.create({ message: 'Please try after some time.', duration: 2000  });
         toast.present()
     })
   }
  
  // presentCouponModal() {
  //   let couponModal = this.modalCtrl.create(myCouponPage);
  //   couponModal.present();
  // }

   
}
