import { Component } from '@angular/core';
import { TokenserviceProvider } from '../../providers/webservic/tokenService';
import { NavParams, ToastController, LoadingController } from 'ionic-angular';

@Component({
    selector: 'page-cashout',
    templateUrl:'cashout.html'
})

export class CashoutPage{
    public amount:any = null;
    public token : any= null;
    public balance: any = 0;
    constructor(private tokenService:TokenserviceProvider, private navParams:NavParams, private toastCtrl: ToastController, private loadingCtrl : LoadingController) {
        this.token = this.navParams.data;
        this.getBalance()
    }

    getBalance() {
        let self = this;
        self.tokenService.balanceOf(this.token.contractAddress)
        .then(
            res=>{
                self.balance = res;  
            },
            err => {
                self.balance = 0;
                let toast = self.toastCtrl.create({message: 'Cannot get balance', duration: 3000})
                toast.present()
            }
        )
    }

    checkbalance(amount) {
        let self = this;
        if(amount){
          if(!(amount <= self.balance)) {
            self.amount=null;
            let toast = self.toastCtrl.create({ message: 'Amount should not be greater than balance', duration: 10000  });
            toast.present()
          }
        }
      }

      cashOut(){
        let self = this;
        let data ={
          amount:self.amount,
          contractAddress: this.token.contractAddress
        }
        let loading = self.loadingCtrl.create();
        loading.present()
        self.tokenService.cashOut(data)
        .subscribe((res:any)=>{
          loading.dismissAll()
          if(res.recepit){
            let toast = self.toastCtrl.create({ message: 'Cashout process is initiated.', duration: 2000  });
            toast.present()
            self.getBalance()
          }else{
            let toast = self.toastCtrl.create({ message: 'Transaction Failed', duration: 2000  });
            toast.present()
          }
         
        },err=>{
          loading.dismissAll()
          let toast = self.toastCtrl.create({ message: 'Please try after some time.', duration: 2000  });
          toast.present()
        })

      }
}