import { HttpClient } from '@angular/common/http'; 
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';
import * as moment from 'moment-timezone';
import { Transfer, TransferObject } from '@ionic-native/transfer';
import * as Web3 from 'web3';
declare var cordova:any

import { TokenserviceProvider } from './tokenService'
/*
  Generated class for the WebservicProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class WebservicProvider {
 private abi = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"addressLaw","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"tokensKoreaTeam","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"INITIAL_SUPPLY","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"addressFXReserve","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"tokensICOSale","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_subtractedValue","type":"uint256"}],"name":"decreaseApproval","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"addressThailand","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"tokensAdvisors","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"addressIndiaTeam","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"tokensFXReserve","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"addressICOManager","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"halted","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"tokensThailand","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_addedValue","type":"uint256"}],"name":"increaseApproval","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_spender","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"addressAdvisors","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"tokensIndiaTeam","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"addressKoreaTeam","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"tokensPMTBankReserve","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"addressPMTBankReserve","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"tokensLaw","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"constant":false,"inputs":[],"name":"halt","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"unhalt","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}];
 public imagPath:any = 'http://192.168.0.105:3200/static/img/';
 private ethereumHost = 'http://localhost:8545';
//  private serverUrl:any = 'http://192.168.0.105:3200/api';
//  private serverUrl:any = 'http://localhost:3200/api';
 private serverUrl:any ="http://ecash.smartchain.in:3200/api";
 private etherscanUrl:any = "https://api.etherscan.io/api?module=account&action=txlist&address="
 private params = "&startblock=0&endblock=99999999&page=1&offset=500&sort=desc&apikey=YourApiKeyToken";
 private evensparams = "&startblock=0&endblock=99999999&page=1&offset=5&sort=desc&apikey=YourApiKeyToken";
 private evenstokenUrl:any ="https://api.etherscan.io/api?module=account&action=tokentx&address="
 private topriceurl = 'https://min-api.cryptocompare.com/data/price?fsym=USD&tsyms=BTT,ETH,INR,THB,KRW,USD'
 private exploreUrl = 'http://explorer.evenscoin.io'
 private selectedCoin:any;
 private USDvalue :any = {};
 private web3:any;
 private userData:any;
  constructor(public http: HttpClient, private transfer: Transfer, private storage:Storage, private tokenService: TokenserviceProvider) {
    //  this.updateCurrence();
    this.setProvider()
    this.setUser()
  }


  setProvider() {
    let self = this;
    if(!self.web3) {
      self.web3 =new Web3 (new Web3.providers.HttpProvider(self.ethereumHost))
    }
  }

  getProvider() {
    let self = this;
    if(!self.web3){
      self.web3 =new Web3 (new Web3.providers.HttpProvider(self.ethereumHost))
    }
    return self.web3;
  }

  setUser(){
    let self = this;
    this.getStoredData()
    .then(
      res => {
        self.userData = res
      },
      err =>{
        console.log("err on get the user data")
      }
    )
  }

  getUser(){
    console.log("thsi", this.userData)
   return this.userData;
  }

  setSelecetedcoin(coin){
    let self = this;
    this.selectedCoin =coin;
    self.storage.set('selectedcoin',coin)
  }

  balanceOf(contractAddress) {
    let self = this;
    let promise = new Promise((resolve, reject)=>{
      try{
        console.log("user", self.userData)
        const smartContrat = self.web3.eth.contract(self.abi).at(contractAddress);
        const balance = smartContrat.balanceOf(self.userData.address) / 1e18;
        resolve(balance)
      }catch(e){
        reject('Cannot get Balance')
      }
    })
    return promise;
  }

  getEthTransaction(address){
    let self = this;
    let promise = new Promise((resolve,reject)=>{
      self.http.get(`${self.etherscanUrl}${address}${self.params}`)
      .subscribe((res:any)=>{
        var temarr = [];
        if(res.result){
          if(res.result.length){
            for(let j =0;j<res.result.length;j++){
               if(temarr.length > 4){
                 break;
               }
               let o = Object.assign({},res.result[j]);
               if(o.value != 0){
                //  console.log(o.timeStamp)
                 let mode =o.from.toUpperCase() == address.toUpperCase()?'Sent':'Received';
                //  let status = o.txreceipt_status == 1?'Success':'Failure';
                 let amount:any = o.value/1e18 ;
                 let time = new Date(parseInt(o.timeStamp))
                 console.log("time",time)
                 let obj ={
                   amount :parseFloat(amount).toFixed(3),
                   date:moment.tz(parseInt(o.timeStamp)*1000,'Asia/Kolkata').format('DD-MMM-YYYY'),
                   mode:mode,
                  //  status:status,
                   receipt:o.hash,
                   link:`http://etherscan.io/tx/${o.hash}`
               }
               temarr.push(obj)
               }
            }
            resolve(temarr)
          }else{
            resolve([])
          }
        }else{
          resolve([])
        }
        
      },err=>{
        alert('Something Went Wrong.')
      })
      // self.storage.get('eth')
      // .then((val)=>{
      //   console.log("value data",val)
      //  if(!val){
      //    resolve([]) ;
      //  }else{
      //    resolve(JSON.parse(val))
      //  }
      // })
    })
   return promise;
  }

  getTokenTransaction(address){
    let self = this;
    let promise = new Promise((resolve,reject)=>{
      self.http.get(`${self.evenstokenUrl}${address}${self.evensparams}`)
      .subscribe((res:any)=>{
        if(res.result){
          if(res.result.length){
            let temarr = res.result.map(function(o){
              let mode =o.from.toUpperCase() == address.toUpperCase()?'Sent':'Received';
              let status = o.txreceipt_status == 1?'Success':'Failure';
              let amount:any = o.value/1e18 ;
             //  amount = (amount * 100 ) / 100;
              let obj ={
               amount :parseFloat(amount).toFixed(3),
                  date:moment.tz(parseInt(o.timeStamp)*1000,'Asia/Kolkata').format('DD-MMM-YYYY'),
                  mode:mode,
                  status:status,
                  receipt:o.hash,
                  link:`https://etherscan.io/tx/${o.hash}`
              }
              return obj;
            })
            resolve(temarr)
          }else{
            resolve([])
          }
        }else{
          resolve([])
        }
        
      },err=>{
        alert('Something Went Wrong.')
      })
      // self.storage.get('eth')
      // .then((val)=>{
      //   console.log("value data",val)
      //  if(!val){
      //    resolve([]) ;
      //  }else{
      //    resolve(JSON.parse(val))
      //  }
      // })
    })
   return promise;
  }

  getSelectedcoinpromise(){
    let promise = new Promise((resolve,reject)=>{
      if(!this.selectedCoin){
        this.storage.get('selectedcoin')
        .then(
          res=>{
            this.selectedCoin = res;
            resolve(this.selectedCoin);
          }
        )
      }else{
        resolve(this.selectedCoin);
      }
    })
    return promise;
    
  }

  getSelectedcoin (){
  if(!this.selectedCoin){
    this.storage.get('selectedcoin')
    .then(
      res=>{
        this.selectedCoin = res;
        return this.selectedCoin;
      }
    )
  }else{
    return this.selectedCoin;
  }
  }

  getUsedValue(){
    return this.USDvalue.USD;
  }

  getBalance(){
    let self = this;
    return self.http.get(`${this.serverUrl}/getBalance`)
  }

  evensBalance(){
    let self = this;
    return  self.http.get(`${this.serverUrl}/evensBalance`)
  }
   

  checkAddress(add){
    let self = this;
    return  self.http.get(`${this.serverUrl}/checkAdddress/${add}`)
  }


  Transfer(data){
    let self = this;
    return self.http.post(`${self.serverUrl}/transfer`,data)
  }

  transferToken (data) {
    let self = this;
    return self.http.post(`${self.serverUrl}/transferToken`, data)
  }

  TransferEns(data){
    let self = this;
    return self.http.post(`${self.serverUrl}/sendEns`,data)
  }
  
   getTodayPrice (){
     let self = this;
     return  self.http.get(self.topriceurl)
   }

  getAllBalance(){
    let self = this;
    return  self.http.get(`${self.serverUrl}/allBalance`)
  }
  

  getTokenOneBalance(){
    let self = this;
    return  self.http.get(`${self.serverUrl}/tokenOneBalance`)
  }

  getTokenTwoBalance(){
    let self = this;
    return  self.http.get(`${self.serverUrl}/tokenTwoBalance`)
  }

  getTokenThreeBalance(){
    let self = this;
    return  self.http.get(`${self.serverUrl}/tokenThreeBalance`)
  }

  getTokenFourBalance() {
    let self = this;
    return  self.http.get(`${self.serverUrl}/tokenFourBalance`)
  }

  TransferTokenOne(data){
    let self = this;
    return self.http.post(`${self.serverUrl}/sendTokenOne`,data)
  }

  TransferTokenTwo(data){
    let self = this;
    return self.http.post(`${self.serverUrl}/sendTokenTwo`,data)
  }

  TransferTokenThree(data){
    let self = this;
    return  self.http.post(`${self.serverUrl}/sendTokenThree`,data)
  }

  TransferTokenFour(data){
    let self = this;
    return  self.http.post(`${self.serverUrl}/sendTokenFour`,data)
  }

  createAccont(data){
    let self = this;
    return  self.http.post(`${self.serverUrl}/signUp`,data)
  }

  login(data) {
    let self = this;
    return  self.http.post(`${self.serverUrl}/login`,data)
  }

  saveLocalData(data,token){
    let self = this;
    self.storage.set('user',JSON.stringify(data))
    self.userData = data;
    self.tokenService.userData = data
    self.storage.set('token',token)
  }

  getStoredData(){
    let self = this;
    let promise = new Promise((resolve,reject) => {
      self.storage.get('user')
      .then((val)=>{
        console.log("value data",val)
       if(!val){
         resolve(null) ;
       }else{
         resolve(JSON.parse(val))
       }
      })
    })
    return promise;
  }

  getTokenTxList(tkaddr){
    let self = this;
    let promise = new Promise((resolve, reject) => {
      self.http.get(`${self.exploreUrl}/tokenTransaction?tkaddr=${tkaddr}&addr=${self.userData.address}&length=5`)
      .subscribe(
        (res:any) => {
          if(res && res.data) {
            if(res.data.length) {
              let temArr = res.data.map((o:any) => {
              let mode =o.from.toUpperCase() == self.userData.address.toUpperCase()?'Sent':'Received';
              let obj ={
                amount :parseFloat(o.value).toFixed(3),
                    date:moment.tz(parseInt(o.timestamp)*1000,'Asia/Kolkata').format('DD-MMM-YYYY'),
                    mode:mode,
                    receipt:o.hash,
                    link:`${self.exploreUrl}/tx/${o.hash}`
                }
              return obj;
              })
              resolve(temArr)
            }
          }else {
            resolve([])
          }
        },
        err => {
          resolve([])
        }
      )
    })
    return promise;
  }

  getUserInfo() {
    let self = this;
    return  self.http.get(`${self.serverUrl}/user`)
  }
  getChartDate() {
    let self = this;
    return self.http.get(`${self.serverUrl}/ethusdprice`)
  }

  changepassword(data) {
    let self = this;
    return self.http.post(`${self.serverUrl}/changePassword`,data)
  }

  public pathForImage(img) {
    if (img === null) {
      return '';
    } else {
      return cordova.file.dataDirectory + img;
    }
  }


  public async tokemgetter () {
    let token:any;
    try{
      token = await this.storage.get('token');
    }catch(error) {
      console.log("err", error)
     }
     return token
  }
  


     async uploadImage( image ) {
      let token:any;
      try{
        token = await this.storage.get('token');
      }catch(error) {
        token = null
       }
      const authHead = { 'x-access-token' : token}
      return new Promise((resolve, reject) => {
      var targetPath = this.pathForImage(image);
      const url = this.serverUrl+'/uploadImage'

      // File name only
      var filename = image;
     
      var options = {
        fileKey: "file",
        fileName: filename,
        chunkedMode: false,
        mimeType: "multipart/form-data",
        params : {'fileName': filename, headers: authHead }
      }
     
      const fileTransfer: TransferObject = this.transfer.create();
     
     
      // Use the FileTransfer to upload the image
      fileTransfer.upload(targetPath, url, options).then(data => {
         let img = JSON.parse(data.response)
        resolve(img.data)
      }, err => {
        reject(err)
      });
    })
  }

  uploadkyc(data) {
    let self = this;
    console.log("upload kyc ")
    return self.http.post(`${self.serverUrl}/kyc`, data)
  }

  recoverAccount(data) {
    let self = this;
    return self.http.post(`${self.serverUrl}/recoverAccount`, data)
  }

  updateprofile(data) {
    let self = this;
    return self.http.post(`${this.serverUrl}/profile`, data)
  }

  getCompanyList() {
    let self = this;
    return self.http.get(`${this.serverUrl}/companyList`);
  }
}
