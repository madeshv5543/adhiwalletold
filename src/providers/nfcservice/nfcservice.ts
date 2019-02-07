import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NFC, Ndef } from '@ionic-native/nfc';

/*
  Generated class for the NfcserviceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class NfcserviceProvider {

  constructor(public http: HttpClient, private nfc: NFC, private ndef: Ndef) {
    console.log('Hello NfcserviceProvider Provider');
  }

  addNfcListener(cb){
    this.nfc.addNdefListener(() => {
      console.log('successfully attached ndef listener');
    }, (err) => {
      console.log('error attaching ndef listener', err);
    }).subscribe((event) => {
      console.log('received ndef message. the tag contains: ', event.tag);
      console.log('decoded tag id', this.nfc.bytesToHexString(event.tag.id));
    
      let message = this.ndef.textRecord('Hello world');
      // this.nfc.share([message]).then(onSuccess).catch(onError);
    });
  }

  callback() {

  }

}
