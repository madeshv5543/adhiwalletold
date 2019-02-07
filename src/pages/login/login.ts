import { Component } from '@angular/core';
import { NavController, MenuController, LoadingController, ToastController } from 'ionic-angular';
import { CreateAccountPage } from '../create-account/create-account';
import { ForgotPasswordPage } from '../forgot-password/forgot-password'
import { WebservicProvider } from '../../providers/webservic/webservic';
import { NotificationsPage } from '../notifications/notifications';

import { TokenserviceProvider } from '../../providers/webservic/tokenService';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
	user:any= {
		appType:'User'
	};
	public CreateAccount = CreateAccountPage;
	public ForgetPassword = ForgotPasswordPage;
  constructor(
		public navCtrl: NavController,
		private menu:MenuController,
		private webService:WebservicProvider,
		private loadCtrl:LoadingController,
		private toastCtrl:ToastController,
		private tokenService:TokenserviceProvider
	) {
    this.menu.enable(false)
  }

  goToCreateAccountPage(){
  		this.navCtrl.push(CreateAccountPage);
  }

	login() {
		let self = this;
		let loading = self.loadCtrl.create();
		loading.present()
		self.webService.login(self.user)
		.subscribe(
			(res:any) => {
				loading.dismiss()
				if(res.status == 200) {
					let data = Object.assign({}, res.data)
					data.password = self.user.password;
					self.webService.saveLocalData(data,res.token);
					self.tokenService.setUser();
					self.navCtrl.setRoot(NotificationsPage)
				}else {
					let toast = self.toastCtrl.create({ message : res.message, duration: 2000  })
					toast.present();
				}
			},
			err => {
				loading.dismiss()
        if('error' in err){
          if(err.error.status){
            let toast = self.toastCtrl.create({ message: err.error.message, duration: 2000  });
            toast.present()
          }
        }
        else {
					let toast = self.toastCtrl.create({ message: 'Please try after some time.', duration: 2000  });
					toast.present()
        }
			}
		)
	}

}

