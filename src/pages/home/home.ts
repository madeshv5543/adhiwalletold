import { Component, ViewChild } from '@angular/core';
import { NavController, ToastController, LoadingController, NavParams } from 'ionic-angular';
import { WebservicProvider } from '../../providers/webservic/webservic';
import { TokenserviceProvider } from '../../providers/webservic/tokenService';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { NFC, Ndef  } from "@ionic-native/nfc";

import { TabsPage } from '../tabs/tabs'

import { NgForm } from '@angular/forms';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers:[WebservicProvider]
})
export class HomePage {
  @ViewChild('focusInput') myInput ;
  public transfer:any ={
    gasprice:40
  };
  mimeType = "game/rockpaperscissors";
  public account:any ={};
  nfcsubscribe:any;
  public token:any = null;
  public enableNfc:boolean = false;
  public balance:any = 0;
  constructor(
    public navCtrl: NavController,
    public webserve:WebservicProvider,
    private barcodeScanner: BarcodeScanner,
    private toastCtrl:ToastController,
    private loading:LoadingController,
    private nfc: NFC,
    private ndef: Ndef,
    private navParams: NavParams,
    private tokenService:TokenserviceProvider
  ) {
      this.token = this.navParams.data;
      this.checkNfc();
      this.getBalance()
      this.getUserData()
  }

  ionViewWillEnter(){
    this.getBalance()
  }

  doRefresh(e) {
    setTimeout(() => {
      e.complete()
    }, 2000);
  }

  getUserData () {
    this.webserve.getStoredData()
    .then(
      res => {
          this.account = res;
      },
      err =>{ 
        this.createtoast(`can't get the user data`)
      }
    )    
  }

  checkNfc() {
    this.nfc.enabled()
    .then(res => {
      this.enableNfc = true;
    }, err => {
      this.enableNfc = false;
    })
  }

  setFocus ( ){
    this.myInput.setFocus();
  }


  // async getSelecetedCoin(){
  //   this.getBalance()
  //   // this.webserve.getEthTransaction()
  // }


  getBalance(){
   let self = this;
   console.log("token", self.token) 
   self.tokenService.balanceOf(self.token.contractAddress)
   .then(
     res => {
       console.log("balance", res)
       self.balance = res;
     },
     err => {
      let toast = self.toastCtrl.create({ message: 'Please try after some time.', duration: 2000  });
      toast.present();
     }
   )
  }

  addListenNFC():void {
    this.nfcsubscribe = this.nfc.addMimeTypeListener(this.mimeType,this.onNfc,this.onnfcfailed )
    .subscribe((event) => {
      if(event){
        if(event && event.tag) {
          let msg = this.nfc.bytesToString(event.tag.ndefMessage[0].payload);
          if(msg) {
            this.checkAddress(msg, true)
            this.setFocus();
          }else{
            this.createtoast(`can't find valid address`)
          }
        }else{
          this.createtoast('Cannot find the nfc')
        }
      }
    });
}
gotoinfo () {
  console.log('INFORMATION ON TOKEN : ',this.navParams.data)
  let token = this.navParams.data
  this.navCtrl.push(TabsPage, {token})
}

onnfcfailed() {
  this.createtoast('nfc failed.Try again ')
}

onNfc (nfcEvent) {
 console.log('Listener added')
}

createtoast(message, duration = 2000) {
  let self = this;
  let toast = self.toastCtrl.create({ message, duration });
  toast.present()
}

  transferAmount(f:NgForm){
    let self = this;
    let data ={
      transferTo:f.value.address,
      amount:f.value.amount,
      gasprice: this.transfer.gasprice,
      contractAddress: this.token.contractAddress
    }
    let loading = self.loading.create();
    loading.present()
    self.webserve.transferToken(data)
    .subscribe((res:any)=>{
      loading.dismissAll()
      console.log("response",res)
      if(res.recepit){
        let toast = self.toastCtrl.create({ message: 'Transaction Completed Successfully', duration: 2000  });
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

   scanQr(){
    let self = this;
    this.barcodeScanner.scan().then(barcodeData => {
      self.checkAddress(barcodeData.text)
     }).catch(err => {
          let toast = self.toastCtrl.create({ message: 'Please try after some time.', duration: 2000  });
          toast.present()
     });
  }

  checkbalance(amount) {
    let self = this;
    if(amount){
      if(!(amount <= self.balance)) {
        self.transfer.amount='';
        let toast = self.toastCtrl.create({ message: 'Amount should not be greater than balance', duration: 10000  });
        toast.present()
      }
    }
  }



  checkAddress(addr, from=false) {
    let self = this;
    if(!addr) {
      // let toast = self.toastCtrl.create({ message: 'Invalid Address, Please enter a valid address.', duration: 10000  });
      // toast.present()
      return;
    }
    self.webserve.checkAddress(addr).subscribe(
      (res:any)=>{
        if(res.status) {
          this.transfer.address = addr;
          if(from) {
            this.createtoast('Address Detected')
          }
          console.log(addr)
        }else {
          self.transfer.address =""
          let toast = self.toastCtrl.create({ message: 'Invalid Address', duration: 2000  });
          toast.present()
        }
      },
      err=>{
        self.transfer.address =""
       let toast = self.toastCtrl.create({ message: 'Invalid Address', duration: 2000  });
       toast.present()
      }
    )
  }

  ngOnDestroy(){
    if(this.nfcsubscribe){
      this.nfcsubscribe.unsubscribe()
    }
  }
 
}
