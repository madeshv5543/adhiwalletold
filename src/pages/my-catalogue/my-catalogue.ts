import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { Clipboard } from '@ionic-native/clipboard';
import { WebservicProvider } from '../../providers/webservic/webservic';

@Component({
  selector: 'page-my-catalogue',
  templateUrl: 'my-catalogue.html'
})
export class MyCataloguePage {
  public user:any = {};
  constructor(
    public navCtrl: NavController,
    public webService:WebservicProvider,
    private toastCtrl: ToastController,
    private clipboard: Clipboard) {
    this.getUSerInfo();
  }

  getUSerInfo(){
    let self = this;
    self.webService.getUserInfo()
    .subscribe(
      (res:any) => {
        if(res.status == 200) {
          console.log("user",res)
          self.user = res.data;
				}else {
					let toast = self.toastCtrl.create({ message : res.message, duration: 2000  })
					toast.present();
				}
      },
      err => {
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

  copyAddress() {
    let self = this;
    this.clipboard.copy(self.user.address)
    .then(
      res => {
        let toast = self.toastCtrl.create({ message: 'Address Copied.', duration: 2000  });
        toast.present()
      }
    )  
  }
}