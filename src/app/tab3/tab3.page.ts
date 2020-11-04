import { Component } from '@angular/core';

import { ActionSheetController } from '@ionic/angular';

import { Storage } from '@ionic/storage';


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

theme:string = "";

constructor(
  public actionSheetController:ActionSheetController,
  private storage: Storage
  ) {}

	 public toLat: any
     public toLong: any
     public destination: any
	 public temp: any
	 public name: any = this.storage.get('dest').then((temp) => {
		this.name = temp; });	// input from searchbar	
	

	storeDestination(){

		console.log(this.name);
		console.log(this.destination);
		
		if (this.name == null || this.name == ""){
				this.destination = "nearest hospital";
			}
			else{
				this.storage.ready().then(() => {
					this.storage.set('dest', this.name);
					this.storage.get('dest').then((temp) => {
					this.destination = temp;
				});
			});
		}
		console.log(this.name);
		console.log(this.destination);
	 }

 async presentActionSheet() {

     let actionLinks=[];

	 actionLinks.push({
       text: 'Google Maps',
       icon: 'navigate',
       handler: () => {
         window.open("https://www.google.com/maps/search/?api=1&query="+this.destination)
       }
     })

     actionLinks.push({
       text: 'Waze',
       icon: 'navigate',
       handler: () => {
         window.open("https://www.waze.com/livemap?dir_first=routing_only&utm_source=waze_website&utm_campaign=waze_website&utm_expid=.z332TkT-TdGeMi_l_4XUWA.1&utm_referrer=");
       }
     });

     actionLinks.push({
       text: 'Cancel',
       icon: 'close',
       role: 'cancel',
     })

      const actionSheet = await this.actionSheetController.create({
      header: 'Navigate',
      buttons: actionLinks
    });
    await actionSheet.present();
 }

  // Theme color switcher
switchThemeDefault(){
    this.theme = "";
    document.body.classList.remove("dark");
    document.body.classList.remove("neutral");
  }

  switchThemeNeutral(){
      this.theme = "neutral";
      document.body.classList.remove("dark");
      document.body.classList.add("neutral");
    }

    switchThemeDark(){
        this.theme = "dark";
        document.body.classList.remove("neutral"); 
        document.body.classList.add("dark");
      }


}


