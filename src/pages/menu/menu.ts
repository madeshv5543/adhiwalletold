import { Component } from '@angular/core';
import { NavController, MenuController, Events, AlertController, LoadingController, ToastController } from 'ionic-angular';
import { WebservicProvider } from '../../providers/webservic/webservic';
import { TokenserviceProvider } from '../../providers/webservic/tokenService';
import { AmChartsService, AmChart } from "@amcharts/amcharts3-angular";




import { TabsPage } from '../tabs/tabs';
import { MyRewardsPage } from '../my-rewards/my-rewards';
import { AddTokenPage } from '../add-token/add-Token';
// import { Title } from '@angular/platform-browser';



@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html'
})
export class MenuPage {
  etherAccount:any ={
    address:'-',
    balance:0
  }

  defaultImg:any="assets/imgs/default.png"

  name: string = "Carlos";
  
  evensAccount:any={
    address:'-',
    balance:0
  }


  tokens:any = [];
  todayPrice:any ={
    "BTT":1,
    "ETH":1,
    "INR":1,
    "THB":1,
    "KRW":1,
    "USD":1
  }
  allBalance:any ={
    eth:0,
    tokenOne:0,
    tokenTwo:0,
    tokenThree:0,
    tokenFour:0,
    ens:0,
    address:'',
    tokenTwosym:'',
    tokenOnesym:'',
    tokenThreeSym:'',
    tokenFourSym:''
  }
  private chart: AmChart;
  public colors = [
    "#FF0F00",
    "#FF6600",
    "#FF9E01",
    "#FCD202",
    "#0D8ECF"
  ]
  public tokenList = [];
  public options = {
    "type": "serial",
    "theme": "dark",
    "dataDateFormat": "DD-MMM-YYYY",
    "dataProvider": [],
    "valueAxes": [{
      "id": "v1",
      "axisAlpha": 0,
      "position": "left",
      "title": "ETH in USD",
    }],
    "balloon": {
      "borderThickness": 0.5,
      "shadowAlpha": 0
    },
    "graphs": [ {
      "id": "g1",
      "balloon": {
        "drop": true,
        "adjustBorderColor": false,
        "color": "#ffffff",
        "type": "smoothedLine"
      },
      "fillAlphas": 0.2,
      "bullet": "round",
      "bulletBorderAlpha": 0.5,
      "bulletColor": "#FFFFFF",
      "bulletSize": 2,
      "hideBulletsCount": 50,
      "lineThickness": 2,
      "title": "red line",
      "useLineColorForBulletBorder": true,
      "valueField": "value",
      "balloonText": "<span style='font-size:8px;'>[[value]]</span>"
    } ],
    "startDuration": 1,
    "chartCursor": {
      "valueLineEnabled": true,
      "valueLineBalloonEnabled": true,
      "cursorAlpha": 0,
      "zoomable": false
    },
    "categoryAxis": {
      "gridPosition": "start",
      "labelRotation": 30,
      "dashLength": 0,
      "minorGridEnabled": true
    },
    "categoryField": "date",
    "export": {
      "enabled": false
    }
  };
  constructor(
    public navCtrl: NavController,
    public webserve:WebservicProvider,
    private menu:MenuController,
    public events:Events,
    public alertCtrl:AlertController,
    public loadingCtrl:LoadingController,
    public toastCtrl:ToastController,
    private AmCharts: AmChartsService,
    private TokenService: TokenserviceProvider) {
    this.gettodayPrice();
    // this.getAllBalance();
    this.menu.enable(true);
    this.events.publish('getUser', true);
    this.getUserTokens()
  }

  getBalnce(address){
    let self = this;
    self.TokenService.balanceOf(address)
    .then(
      res =>{
        if(!res){
          return res
        }else{
          return 0
        }
      },
      err =>{
        return 0;
      }
    )
  }

  getUserTokens () {
    let self = this;
    self.TokenService.getLocalTokenList()
    .then(
      res =>{
        if(Array.isArray(res) && res.length){
          self.tokenList = res;
        }else{
          self.tokenList =[];
        }
      },
      err =>{
        console.log("Err in getting tokens")
      }
    )
  }


  addtoken(){
    let self = this;
    self.navCtrl.push(AddTokenPage)
  }


  removeItem(addrss) {
    let self = this;
    self.TokenService.removeItem(addrss)
    .then(
      res=>{
        let toast = self.toastCtrl.create({ message: 'Token Remove from the list', duration: 2000  });
        toast.present();
        self.getUserTokens();
      }
    )
  }


  createChart(data = []){
    this.options.dataProvider = data;
    this.chart = this.AmCharts.makeChart("chartdiv", this.options);
    console.log("chart", this.chart)
  }
 
  ngAfterViewInit(){
    this.addlistenerchart()
    this.getChartDate()
  }

  addlistenerchart(){
    let self = this;
    self.AmCharts.addInitHandler(function(chart) {
      console.log("axis values",chart.valueAxes[1]) ;
    })
  }

  doRefresh(e) {
    this.gettodayPrice();
    this.getUserTokens()
    setTimeout(() => {
      e.complete()
    }, 2000);
  }


  getBalance(){
    let self = this;
    self.webserve.getBalance()
    .subscribe(res=>{
      console.log('res',res)
      self.etherAccount = res;
    },err=>{
      console.log("err",err)
    })
   }



   getAllBalance (){
     let self = this;
     let loading = this.loadingCtrl.create({
      // spinner: 'hide',
      content: 'Fetching Balance  Please Wait...'
    });
  
    loading.present();
  
     self.webserve.getAllBalance()
     .subscribe(res=>{
      self.allBalance = res;
      loading.dismiss()
     },
    err=>{
      loading.dismiss()
    })
   }

   evensBalance(){
    let self = this;
    self.webserve.evensBalance()
    .subscribe(res=>{
      // console.log('res',res)
      self.evensAccount = res;
    },err=>{
      // console.log("err",err)
    })
   }
  
  openSingleNotification(coin,type){
    this.webserve.setSelecetedcoin(coin)
      this.navCtrl.push(TabsPage,{data:type})
  }

  viewToken(token) {
    console.log("push data in navparams", token)
    this.navCtrl.push(TabsPage, {token})
  }

  gettodayPrice(){
    let self = this;
    self.webserve.getTodayPrice()
    .subscribe(res=>{
       self.todayPrice = res;
    },err=>{
       console.log(err)
    })
  }

  getChartDate() {
    let self = this;
    self.webserve.getChartDate()
    .subscribe( (res:any) => {
      self.createChart(res.data)
    },
    err =>{
      self.createChart()
    })
  }

  ionViewWillEnter(){
    this.getUserTokens()
  }

  goToPricePage(){
    let self = this;
    self.navCtrl.push(MyRewardsPage)
  }

  decrypt() {
    let self = this;
    self.TokenService.decryptSeed()
  }
}