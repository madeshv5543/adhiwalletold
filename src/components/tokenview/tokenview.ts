import { Component, Input } from '@angular/core';

import { TokenserviceProvider } from '../../providers/webservic/tokenService'

/**
 * Generated class for the TokenviewComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'tokenview',
  templateUrl: 'tokenview.html'
})
export class TokenviewComponent {

   @Input() public token:any;
   public balance:any = 0;
   public defaultImg:any = "assets/imgs/default.png";

  constructor(private TokenServive: TokenserviceProvider) {
  }

  ngAfterViewInit(){
    this.getBalance(this.token.contractAddress)
  }

  getBalance(address){
    console.log("get balance", address)
    let self = this;
    self.TokenServive.balanceOf(address)
    .then(
      res =>{
        self.balance = res
      },
      err =>{
        self.balance =0;
        console.log("cannot get balance err")
      }
    )
  }

}
