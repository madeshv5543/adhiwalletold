import { Component } from '@angular/core';
import {NotificationsPage} from '../notifications/notifications';
import { TokenserviceProvider } from "../../providers/webservic/tokenService";
import { ToastController, NavController } from 'ionic-angular';


@Component({
    selector: 'page-add-token',
    templateUrl: 'add-token.html'
})
export class AddTokenPage{
    public tokenList = [];
    public token:any = {};
    public tokenContract=null;
    public notificationPage:any = NotificationsPage;
    public localToken=[];
    constructor(private tokenService:TokenserviceProvider, private toastCtrl: ToastController,  public navCtrl: NavController,){
        this.getLocaltoken();
        this.getTokenlist()
    }

    getLocaltoken(){
        let self = this;
        self.tokenService.getLocalTokenList()
        .then(
          res =>{
            if(Array.isArray(res) && res.length){
              self.localToken = res;
            }
          },
          err =>{
            console.log("Err in getting tokens")
          }
        )
    }



    getTokenlist() {
        let self = this;
        self.tokenService.getTokenList()
        .subscribe(
            (res:any) =>{
                self.tokenList = res.data;
                self.filterToken()
            },
            err =>{
                console.log("error on getting tokenlist")
            }
        )
    }

    filterToken() {
        let self = this;
        self.tokenList = self.tokenList.filter( (n:any) => {
            let token = self.localToken.find( (k:any ):any => {
                return k.contractAddress === n.contractAddress;
            });
            if(!token) {
             return n;
            }
         });
    }

    tokenDetailSet(address) {
        let self = this;
        if(!address) {
            return;
        }
        self.token = self.tokenList.find( (n:any):any  => {
            return n.contractAddress === address;
        })
    }

    addToken(){
        let self = this;
       const {name, symbol, contractAddress, img} = this.token;
       let token ={
           name,
           symbol,
           contractAddress,
           img
       }
       this.tokenService.addToken(token)
       .then(
           res => {
            let toast = self.toastCtrl.create({ message: 'Token Added Successfully', duration: 2000  });
            toast.present();
            self.navCtrl.setRoot(self.notificationPage)
           }
       )
    }
}
