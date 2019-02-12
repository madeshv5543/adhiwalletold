import { Component, ViewChild } from '@angular/core';
import { Platform, MenuController, Nav, Events, ToastController} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';


import { MyRewardsPage } from '../pages/my-rewards/my-rewards';
import { NotificationsPage } from '../pages/notifications/notifications';
import { WebservicProvider } from '../providers/webservic/webservic';
import { LoginPage } from '../pages/login/login';
import { KycPage } from '../pages/kyc/kyc';
import { ProfilePage } from '../pages/profile/profile';
import { MyCataloguePage} from '../pages/my-catalogue/my-catalogue';
import { AppState } from '../providers/AppState';
import { CardrequestPage } from '../pages/cardrequest/cardrequest'

// import { SettingPage } from '../pages/setting/setting';

import { NFC, Ndef  } from "@ionic-native/nfc";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  showQr:boolean = false;
  rootPage:any;
  pages: Array<{title: string, component: any,icon:string}>;
  public user:any ={};
  mimeType = "game/rockpaperscissors";
  public selectedTheme: String;
  constructor(public platform: Platform, 
    public menu: MenuController, 
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen,
    private webservice:WebservicProvider,
    private storage:Storage,
    public events: Events,
    private toastCtrl: ToastController,
    private nfc: NFC,
    private ndef: Ndef,
    private appState:AppState
  ) {
   this.appState.getActiveTheme().subscribe(val => this.selectedTheme = val);
   this.initializeApp();
   this.setRootPage()
   this.events.subscribe('user:logout', (status) => {
     if(status){
      let toast = this.toastCtrl.create({ message: 'Access token Expired.Please login to get access token', duration: 2000})
      toast.present();
      this.logOut()
     }
   });
   this.events.subscribe('getUser', (status) => {
    this.getUserInfo();
   })
   this.pages = [
      {title: 'HOME', component: NotificationsPage , icon:'home2.png'},
      { title: 'PROFILE',  component: ProfilePage, icon:'picture.png'},
      {title : 'DOCUMENTS', component : KycPage, icon:'document.png'},
      {title: 'REQUEST CARD', component : CardrequestPage, icon:'document.png'},
      // {title: 'ExchangeRate', component: MyRewardsPage, icon:'send'},
      {title: 'CHANGE PASSWORD', component: MyRewardsPage, icon:'lock.png'},
      // {title: 'SETTING', component: SettingPage, icon:'lock.pnmg'},
      // {title: 'Quick Pay', icon:'lock',  component: QuickPayPage},
      {title: 'SIGN OUT', component:LoginPage,icon:'log-out.png'}
   ];
  }
  initializeApp(){
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      // this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  setRootPage(){
    let self = this;
    self.webservice.getStoredData()
    .then((res) => {
      if(!res){
        this.rootPage = LoginPage;
      }else{
        this.rootPage = NotificationsPage
      }
    })
  }

  openPage(page) {
    if(page.title == 'ACCOUNT'){
      this.menu.close();
      this.nav.setRoot(page.component);
    }else if(page.title == 'SIGN OUT') {
      this.logOut()
    }
    else{
      this.menu.close();
      this.nav.setRoot(page.component);
    }
    
  }

  getUserInfo(){
    let self = this;
    self.webservice.getUserInfo()
    .subscribe(
      (res:any) => {
        if(res.status == 200) {
          console.log("user",res)
          this.nfc.enabled()
          .then( res => {
            console.log("nfc enabled",res)
            let message = this.ndef.mimeMediaRecord(this.mimeType,this.user.address);
            this.nfc.share([message]).then(this.onSuccess).catch(this.onError);
          },
          err => {
            console.log("nfc not enabled", err)
          })
          self.user = res.data;
          self.showQr = true
				}else {
					let toast = self.toastCtrl.create({ message : res.message, duration: 2000  })
          toast.present();
          self.showQr = false;
				}
      },
      err => {
        self.showQr = false;
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

  onSuccess(){
    alert("message sent  ")
  }

  onError(err){
    alert(`Error msg sharing ${JSON.stringify(err)}`)
  }

  goToprofile(){
    let self = this;
    self.menu.close()
    self.nav.setRoot(MyCataloguePage)
  }

  logOut(){
    this.menu.close()
    this.storage.remove('selectedcoin');
    this.storage.remove('user');
    this.storage.remove('token')
    this.nav.setRoot(LoginPage);
  }
}
