import { Component } from '@angular/core';
import {  NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { TokenserviceProvider } from '../../providers/webservic/tokenService'
@Component({
  selector: 'page-receive',
  templateUrl: 'receive.html',
})
export class ReceivePage {
  public qrdata = null;
  public amount= 0;
  public pin;
  public token:any= null;
  public showSuccess = false;
  public txhash= null
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private barcodeScanner: BarcodeScanner,
    private toastCtrl: ToastController,
    private loadCtrl: LoadingController,
    private tokenService: TokenserviceProvider) {
      this.token= this.navParams.data;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReceivePage');
  }

  createToast = (msg) => {
    return this.toastCtrl.create({ message: msg, duration: 2000 })
  }

  scanQr(){
    let self = this;
    self.qrdata = null;
    this.barcodeScanner.scan().then(barcodeData => {
      self.qrdata = barcodeData.text
     }).catch(err => {
          let toast = self.toastCtrl.create({ message: 'Please try after some time.', duration: 2000  });
          toast.present()
     });
  }
  

  transferAmount(f) {
    let self = this;
    let data ={
      qrdata: self.qrdata,
      amount: self.amount,
      pin: self.pin,
      contractAddress: self.token.contractAddress
    }
    let loading = self.loadCtrl.create()
    loading.present()
    self.tokenService.receiveViaQr(data)
    .subscribe(
      (res:any) => {
        loading.dismissAll()
        if (res.status !== 200) {
          let toast = self.createToast(res.message)
          toast.present()
        }else{
          self.txhash = res.recepit
          self.showSuccess = true;
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
