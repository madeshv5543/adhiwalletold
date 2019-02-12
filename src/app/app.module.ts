import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { NgxQRCodeModule } from 'ngx-qrcode2';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { IonicStorageModule } from '@ionic/storage';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { Clipboard } from '@ionic-native/clipboard';
import { InterceptorModule } from '../providers/webservic/interceptor';
import { Network } from '@ionic-native/network';
import { AmChartsModule } from "@amcharts/amcharts3-angular";


import { WalletPage } from '../pages/wallet/wallet';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { TopupPage } from '../pages/topup/topup';
import { LoginPage } from '../pages/login/login';
import { ForgotPasswordPage } from '../pages/forgot-password/forgot-password';
import { NotificationsPage } from '../pages/notifications/notifications';
import { CreateAccountPage } from '../pages/create-account/create-account';
import { AddCardPage } from '../pages/add-card/add-card';
import { MyRewardsPage } from '../pages/my-rewards/my-rewards';
import { MyCataloguePage} from '../pages/my-catalogue/my-catalogue';
import { QuickPayPage } from '../pages/quick-pay/quick-pay';
import { KycPage } from '../pages/kyc/kyc';
import { ProfilePage } from '../pages/profile/profile';
import { CouponsPage } from '../pages/coupons/coupons';
import { AddTokenPage } from '../pages/add-token/add-Token';
import { SettingPage } from '../pages/setting/setting';
import { CashoutPage } from '../pages/cashout/cashout';
import { CardrequestPage } from '../pages/cardrequest/cardrequest';
import { ReceivePage } from '../pages/receive/receive';
import { MenuPage } from '../pages/menu/menu'
import { LoanPage } from '../pages/loan/loan'
import { LoanDetailsPage } from '../pages/loandetails/loandetails'
import { PayPage } from '../pages/pay/pay'
import { DepositPage } from '../pages/deposit/deposit'
import { PaymentPage } from '../pages/payment/payment'

import  {EqualValidator} from "../pages/create-account/EqualValidator";

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { WebservicProvider } from '../providers/webservic/webservic';
import { TokenserviceProvider } from '../providers/webservic/tokenService';
import { NFC, Ndef } from '@ionic-native/nfc';
import { File } from '@ionic-native/file';
import { Transfer } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';
import { AES256 } from '@ionic-native/aes-256';
import { AppState } from '../providers/AppState';

import { ComponentsModule} from '../components/components.module';
import { from } from 'rxjs/observable/from';

@NgModule({
  declarations: [
    MyApp,
    WalletPage,
    HomePage,
    MenuPage,
    LoanPage,
    PayPage,
    DepositPage,
    LoanDetailsPage,
    TopupPage,
    LoginPage,
    PaymentPage,
    TabsPage,
    CouponsPage,
    ForgotPasswordPage,
    NotificationsPage,
    CreateAccountPage,
    AddCardPage,
    MyRewardsPage,
    MyCataloguePage,
    AddTokenPage,
    QuickPayPage,
    KycPage,
    ProfilePage,
    CashoutPage,
    SettingPage,
    CardrequestPage,
    ReceivePage,
    EqualValidator
        ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgxQRCodeModule,
    InterceptorModule,
    AmChartsModule,
    ComponentsModule,
    IonicModule.forRoot(MyApp, {
      tabsHideOnSubPages:true
   }),
   IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    WalletPage,
    HomePage,
    TopupPage,
    LoginPage,
    PaymentPage,
    PayPage,
    DepositPage,
    TabsPage,
    KycPage,
    MenuPage,
    LoanPage,
    LoanDetailsPage,
    ProfilePage,
    ForgotPasswordPage,
    NotificationsPage,
    CreateAccountPage,
    AddCardPage,
    CouponsPage,
    MyRewardsPage,
    MyCataloguePage,
    QuickPayPage,
    AddTokenPage,
    SettingPage,
    CardrequestPage,
    ReceivePage,
    CashoutPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    BarcodeScanner,
    InAppBrowser,
    Clipboard,
    Network,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    WebservicProvider,
    TokenserviceProvider,
    NFC,
    Ndef,
    File,
    AES256,
    Transfer,
    Camera,
    FilePath,
    AppState
  ]
})
export class AppModule {}
