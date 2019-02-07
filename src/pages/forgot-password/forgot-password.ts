import { Component } from '@angular/core';
import { NavController, ToastController, LoadingController } from 'ionic-angular';
import { LoginPage } from '../login/login';

import { WebservicProvider } from '../../providers/webservic/webservic';

@Component({
  selector: 'page-forgot-passwor',
  templateUrl: 'forgot-password.html',
})
export class ForgotPasswordPage {
  public seed:any;
  public newpassword:any;
  public newconfirmPassword:any;
  constructor(public navCtrl: NavController,
    public toastCtlr: ToastController,
    public loadCtrl : LoadingController,
  public webServe: WebservicProvider
    ) {

  }

  recover(f){
    let data = {
      seed: this.seed,
      password : this.newpassword,
      confirmPassword : this.newconfirmPassword
    }
    let loading = this.loadCtrl.create();
    loading.present()
    this.webServe.recoverAccount(data)
    .subscribe(
      (res:any) => {
        loading.dismiss()
        if(res.status === 200) {
          let toast = this.toastCtlr.create({ message : res.message, duration: 2000  })
					toast.present();
        }else{
          let toast = this.toastCtlr.create({ message : res.message, duration: 2000  })
					toast.present();
        }
      },
      err => {
        loading.dismiss()
        let toast = this.toastCtlr.create({ message :'Something Went wrong. Try after some time', duration: 2000  })
        toast.present();
      }
    )
  }

  goToLoginPage() {
      this.navCtrl.push(LoginPage);
  }

}

