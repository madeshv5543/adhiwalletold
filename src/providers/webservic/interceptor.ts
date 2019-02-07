import { Injectable, NgModule} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/mergeMap';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Events, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Network } from '@ionic-native/network';
const COMPANY_KEY = '8MRXnoG3nTmjb35U0tFwnoZpdCBBj5EX';


@Injectable()
export class HttpsRequestInterceptor implements HttpInterceptor {
    private token:string;
    constructor(
        public events: Events,
        private storage:Storage,
        private network: Network,
        private toastCtrl: ToastController
    ){
        this.tokengetter()
    }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if(this.network.type == 'none') {
            let toast = this.toastCtrl.create({ message : 'Please Connect to the network', duration: 2000});
            toast.present();
        }else {
            if(req.url.includes('/api') && !req.url.includes('/login') && !req.url.includes('/signUp') && !req.url.includes('/recoverAccount') && !req.url.includes('etherscan')){
                return this.tokengetter()
                .mergeMap(result => {
                    this.token = result;
                    if(this.token){
                        // let headers = req.headers.set('apikey', '8MRXnoG3nTmjb35U0tFwnoZpdCBBj5EX');
                        // headers=req.headers.set('x-access-token', this.token)
                        // const dupReq = req.clone({ headers });
                        const dupReq = req.clone({
                            headers: new HttpHeaders({
                              'apikey':  COMPANY_KEY,
                              'x-access-token': this.token
                            })
                          });
                        return next.handle(dupReq)
                            .do(
                                (event: HttpEvent<any>) => {
                                    if (event instanceof HttpResponse) {  
                                        }
                                },
                                (err: any) => {
                                    if (err instanceof HttpErrorResponse) {
                                        if (err.status === 403) {
                                            this.events.publish('user:logout', true);
                                            console.log("err",err)
                                        }else{
                                            let toast = this.toastCtrl.create({ message : 'Please try after sometime', duration: 2000});
                                            toast.present();
                                        }
                                    }
                                }
                            );
                    }else{
                        this.events.publish('user:logout', true);
                    }  
                })
            }else{
                return next.handle(req);
            }
        }
    }

    

    tokengetter(): Observable<any>{
        let self = this;
            return Observable.fromPromise( self.storage.get('token'));
    }
};

@NgModule({
    providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpsRequestInterceptor, multi: true }
    ]
   })
export class InterceptorModule { }