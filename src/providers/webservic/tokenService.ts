import { HttpClient } from '@angular/common/http'; 
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';
import * as Web3 from 'web3';
import { AES256 } from '@ionic-native/aes-256';
@Injectable()
export class TokenserviceProvider {
    private abi = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"addressLaw","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"tokensKoreaTeam","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"INITIAL_SUPPLY","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"addressFXReserve","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"tokensICOSale","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_subtractedValue","type":"uint256"}],"name":"decreaseApproval","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"addressThailand","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"tokensAdvisors","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"addressIndiaTeam","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"tokensFXReserve","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"addressICOManager","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"halted","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"tokensThailand","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_addedValue","type":"uint256"}],"name":"increaseApproval","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_spender","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"addressAdvisors","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"tokensIndiaTeam","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"addressKoreaTeam","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"tokensPMTBankReserve","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"addressPMTBankReserve","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"tokensLaw","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"constant":false,"inputs":[],"name":"halt","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"unhalt","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}];
    // public imagPath:any = 'http://192.168.0.105:3200/static/img/';
    public imagPath:any ="http://ecash.smartchain.in:3200/static/img/"
    private ethereumHost = 'http://explorer.evenscoin.io:8545/';
    // private serverUrl:any = 'http://localhost:3100/api';
    // private serverUrl:any = 'http://192.168.0.105:3200/api';
    private web3:any;
    private serverUrl:any = 'http://ecash.smartchain.in:3200/api';
    public userData:any;
    private tokenList=[];
    constructor(public http: HttpClient, private storage:Storage, private aes256: AES256) {
        this.setProvider()
        this.setUser()
        this.getLocalToken()
    }

    setProvider() {
        let self = this;
        if(!self.web3) {
          self.web3 =new Web3 (new Web3.providers.HttpProvider(self.ethereumHost))
        }
    }

    async getLocalToken(){
        let tokens = await this.storage.get('tokenslist');
        if(tokens){
            tokens = JSON.parse(tokens);
        }
        if(Array.isArray(tokens)){
            this.tokenList = tokens
        }
    }

    addToken(token) {
        let self = this;
        let promise = new Promise((resolve, resject) => {
            self.tokenList.push(token);
            self.setTokenlist(self.tokenList);
            resolve('success')
        })
        return promise;
    }



    removeItem(addr){
        let self = this;
        let promise = new Promise((resolve, reject)=>{
            self.tokenList = self.tokenList.filter( n =>{
                return n.contractAddress != addr;
            })
            self.setTokenlist(self.tokenList);
            resolve('success')
        })
        return promise;
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

    getStoredData(){
        let self = this;
        let promise = new Promise((resolve,reject) => {
          self.storage.get('user')
          .then((val)=>{
            if(!val){
                resolve(null) ;
            }else{
                resolve(JSON.parse(val))
            }
          })
        })
        return promise;
    }

    getTokenList() {
        let self = this;
        return self.http.get(`${this.serverUrl}/tokenList`)
    };

    cashOut(data) {
        let self = this;
        return self.http.post(`${self.serverUrl}/cashout`, data)
    }

    setTokenlist(data){
        let self = this;
        console.log("add token", JSON.stringify(data))
        self.storage.set('tokenslist',JSON.stringify(data))
        self.storage.get('tokenslist')
        .then(
            res=>{
                console.log("saved data", res)
            },
            err =>{
                console.log("err")
            }
        )
        self.tokenList = data;
    };

    balanceOf(contractAddress) {
        let self = this;
        let promise = new Promise((resolve, reject)=>{
          try{
              console.log("balance of the user", self.userData)
            const smartContrat = self.web3.eth.contract(self.abi).at(contractAddress);
            const balance = smartContrat.balanceOf(self.userData.address) / 1e18;
            resolve(balance)
          }catch(e){
            reject('Cannot get Balance')
          }
        })
        return promise;
    }


    transferToken() {
        let self = this
        // let seed = crypto.AES.decrypt(self.userData.seed, self.userData.pharse).toString();
    }

    async decryptSeed() {
        let self = this;
        let iv = await this.aes256.generateSecureIV(self.userData.password);
        let seed = await this.aes256.decrypt(self.userData.password, iv, self.userData.seed );
        console.log("seed", seed)
    }
    

    async getLocalTokenList(){
        if(!this.tokenList.length){
            this.getLocalToken()
        }
        return this.tokenList;
    }

    placeCardRequest = (data) =>{
        let self = this;
        return self.http.post(`${self.serverUrl}/cardRequest`, data)
    }

    receiveViaQr = (data) => {
        let self = this;
        return self.http.post(`${self.serverUrl}/sendViaQr`, data)
    }
    
    getUserCardList = () => {
        let self = this;
        return self.http.get(`${self.serverUrl}/usercardlist`)
    }

    blockCard =(data) => {
        let self = this;
        return self.http.post(`${self.serverUrl}/blockcard/${data}`,{})
    }
}

