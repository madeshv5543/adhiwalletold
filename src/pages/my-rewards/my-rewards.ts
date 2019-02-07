import { Component } from '@angular/core';
import { NavController, LoadingController, ToastController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { WebservicProvider } from '../../providers/webservic/webservic';
import { Storage } from '@ionic/storage';

import { LoginPage } from '../login/login';

@Component({
  selector: 'page-my-rewards',
  templateUrl: 'my-rewards.html'
})
export class MyRewardsPage {
  granted: boolean;
  denied: boolean;
  scanned: boolean;
  tagId: string;  
  credentials:any ={}
  
  constructor(public navCtrl: NavController, 
    public loadCtrl:LoadingController,
    public webservice:WebservicProvider,
    public toastCtrl:ToastController,
    private storage:Storage) {

  }

  changePassword(f:NgForm) {
    let self = this;
    let loading = self.loadCtrl.create();
    loading.present()
    self.webservice.changepassword(self.credentials)
    .subscribe(
      (res:any) => {
        loading.dismissAll()
        if(res.status == 200) {
          this.storage.clear();
          this.navCtrl.setRoot(LoginPage);
          let toast = self.toastCtrl.create({ message: 'Password Changed Successfully. Please Login to continue', duration: 2000  });
          toast.present()
        }else { 
          let toast = self.toastCtrl.create({ message: res.message, duration: 2000  });
          toast.present()
        }
      },
      err =>{
        loading.dismissAll()
        let toast = self.toastCtrl.create({ message: 'Something Went wrong try after sometime', duration: 2000  });
        toast.present()
      }
    )

  }
}