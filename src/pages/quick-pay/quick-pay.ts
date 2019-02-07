import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { WebservicProvider } from '../../providers/webservic/webservic';


import { NFC, Ndef  } from "@ionic-native/nfc";

@Component({
  selector: 'page-quick-pay',
  templateUrl: 'quick-pay.html'
})
export class QuickPayPage {
  tagId:any;
  scanned: boolean = false;
  mimeType = "game/rockpaperscissors";
  nfcsubscribe:any;
  constructor(
    public navCtrl: NavController,
    public webService:WebservicProvider,
    private nfc: NFC,
    private ndef: Ndef) {
  }


  addListenNFC():void {
    this.nfcsubscribe = this.nfc.addMimeTypeListener(this.mimeType,this.onNfc,this.onnfcfailed )
    .subscribe((event) => {
      console.log(`received ndef message. the tag contains: ${JSON.stringify(event.tag)}`);
      console.log(`decoded tag id ${this.nfc.bytesToString(event.tag.ndefMessage[0].payload)}`);
    });
}

onnfcfailed() {
  alert ('nfc failed.Try again ')
}


onNfc (nfcEvent) {
  var tag = nfcEvent.tag,
  records = tag.ndefMessage,
  opponentsChoice = this.nfc.bytesToString(records[0].payload)
  alert(`Opponents choices ${opponentsChoice}`)
}


  tagListenerSuccess(tagEvent) {
    console.log(tagEvent.type);
        let data:Ndef = tagEvent;
       alert(JSON.stringify(data));
}


recSuccess(data){
  alert
}

  sesReadNFC(data): void {
  console.log(data,'Workimg')
}

failNFC(err) {
    console.log('NFC Failed :' + JSON.stringify(err))
}

  sendTransaction() {
    let message = this.ndef.mimeMediaRecord(this.mimeType,'Hello world');
    this.nfc.share([message]).then(this.onSuccess).catch(this.onError);
  }
  onSuccess(){
    alert("message sent  ")
  }

  onError(err){
    alert(`Error msg sharing ${JSON.stringify(err)}`)
  }

  ionViewCanLeave(){
    this.nfcsubscribe.unsubscribe();   
  }
}