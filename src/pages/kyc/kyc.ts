import { Component } from '@angular/core';
import { NavController, ActionSheetController, ToastController, Platform, LoadingController, Loading } from 'ionic-angular';

import { File } from '@ionic-native/file';
import { Transfer, TransferObject } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';

import { WebservicProvider } from '../../providers/webservic/webservic';

declare var cordova:any

@Component({
  selector: 'page-kyc',
  templateUrl: 'kyc.html'
})
export class KycPage {
    doctypes = [
        'Passport',
        'Driving Licence',
        'Voter ID',
        'PAN CARD',
        'AADHAR CARD'
    ];
    firstImage:string = null;
    secondImage: string = null;
    selectImg:Number = 1;
    firstfile:any;
    secondfile:any;
    firstimgUrl:any=null;
    secondimgUrl:any=null;
    loading: Loading;
    idproofType:any;
    addproofType:any;
    addproofDocNo:any;
    idproofDocNo:any;
    user:any;
    constructor(public navCtrl: NavController, 
        public webserve:WebservicProvider,private camera: Camera, 
        private transfer: Transfer, private file: File, 
        private filePath: FilePath, 
        public actionSheetCtrl: ActionSheetController,
         public toastCtrl: ToastController, 
         public platform: Platform, 
         public loadingCtrl: LoadingController,
         ) { 
          this.getUSerInfo();
         }

    public presentActionSheet(imgNo) {
        this.selectImg = imgNo;
        let actionSheet = this.actionSheetCtrl.create({
          title: 'Select Image Source',
          buttons: [
            {
              text: 'Load from Library',
              handler: () => {
                this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
              }
            },
            {
              text: 'Use Camera',
              handler: () => {
                this.takePicture(this.camera.PictureSourceType.CAMERA);
              }
            },
            {
              text: 'Cancel',
              role: 'cancel'
            }
          ]
        });
        actionSheet.present();
      };

      public takePicture(sourceType) {
        // Create options for the Camera Dialog
        var options = {
          quality: 100,
          sourceType: sourceType,
          saveToPhotoAlbum: false,
          correctOrientation: true
        };
       
        // Get the data of an image
        this.camera.getPicture(options).then((imagePath) => {
          let self = this;
          if (this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
            this.filePath.resolveNativePath(imagePath)
              .then(filePath => {
                let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
                let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
            //    this.readAsBinary(correctPath, currentName);
                this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
              });
          } else {
            var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
            var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
            this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
          }
        }, (err) => {
          this.presentToast('Error while selecting image.');
        });
      }

      private createFileName() {
        var d = new Date(),
        n = d.getTime(),
        newFileName =  n + ".jpg";
        return newFileName;
      }
       
      // Copy the image to a local folder
      private copyFileToLocalDir(namePath, currentName, newFileName) {
        this.file.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(success => {
            if(this.selectImg ===1){
                this.firstimgUrl=null;
                this.firstImage = newFileName;
            }else if(this.selectImg === 2 ){
                this.secondimgUrl = null;
                this.secondImage = newFileName
            }
        }, error => {
          this.presentToast('Error while storing file.');
        });
      }
       
      private presentToast(text) {
        let toast = this.toastCtrl.create({
          message: text,
          duration: 3000,
          position: 'top'
        });
        toast.present();
      }
       
      // Always get the accurate path to your apps folder
      public pathForImage(img) {
        if (img === null) {
          return '';
        } else {
          return cordova.file.dataDirectory + img;
        }
      }


 public async uploadImage() {
   let fileone;
   let filetwo;
   let self = this;
   let loading = self.loadingCtrl.create();
   loading.present()
      try{
        if(this.firstimgUrl === null   && this.firstImage !=null){
           fileone = await this.webserve.uploadImage(this.firstImage)
        }else if(this.firstimgUrl !== null) {
           fileone = this.user.addproofTypefile
        }else{
          let toast = self.toastCtrl.create({ message : 'Please select the address proof image', duration: 2000  })
          toast.present();
          loading.dismiss()
          return;
        }
        if(this.secondimgUrl === null   && this.secondImage !=null){
          filetwo = await this.webserve.uploadImage(this.secondImage)
        }else if(this.secondimgUrl !== null) {
           filetwo = this.user.idProoftypefile
        }else{
          let toast = self.toastCtrl.create({ message : 'Please select the id proof image', duration: 2000  })
          toast.present();
          loading.dismiss();
          return;
        }
        let data = {
          idProoftype : this.idproofType,
          addproofType : this.addproofType,
          addproofTypefile : fileone,
          idProoftypefile : filetwo,
          addproofDocNo: this.addproofDocNo,
          idproofDocNo: this.idproofDocNo
        }
        this.webserve.uploadkyc(data)
        .subscribe(
          (res:any) =>{
            loading.dismiss()
            if(res.status === 200) {
              let toast = self.toastCtrl.create({ message : 'Kyc Details updated Succesfully.', duration: 2000  })
              toast.present();
              // this.getUSerInfo();
            }else{
              let toast = self.toastCtrl.create({ message : 'Cannot update KYC details', duration: 2000  })
              toast.present();
            }
          },
          err => {
            loading.dismiss()
            let toast = self.toastCtrl.create({ message : 'Cannot update KYC details', duration: 2000  })
            toast.present();
          }  
        )

      }catch(error) {
        loading.dismiss()
        let toast = self.toastCtrl.create({ message : 'Cannot update KYC details', duration: 2000  })
        toast.present();
    }
  }

  public setKycDetails(user ) {
    let self = this;
    self.user = user;
    if(user.hasOwnProperty('idProoftype')){
      self.idproofType = user.idProoftype
   }
   if(user.hasOwnProperty('addproofType')){
    self.addproofType = user.addproofType
   }
    if(user.hasOwnProperty('addproofTypefile')){
      self.firstimgUrl = `${this.webserve.imagPath}${user.addproofTypefile}`
   }
    if(user.hasOwnProperty('idProoftypefile')){
      self.secondimgUrl = `${this.webserve.imagPath}${user.idProoftypefile}`
   }
   if(user.hasOwnProperty('addproofDocNo')){
     self.addproofDocNo = user.addproofDocNo
   }
   if(user.hasOwnProperty('idproofDocNo')){
     self.idproofDocNo = user.idproofDocNo
   }
  };

  getUSerInfo(){
    let self = this;
    self.webserve.getUserInfo()
    .subscribe(
      (res:any) => {
        if(res.status == 200) {
          console.log("user",res)
          this.setKycDetails(res.data)
				}else {
					let toast = self.toastCtrl.create({ message : res.message, duration: 2000  })
					toast.present();
				}
      },
      err => {
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

}