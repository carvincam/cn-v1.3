import { Component, OnInit } from '@angular/core';

import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {

ionViewWillEnter(){
			this.storage.get('cNo').then((temp) => {
			 this.contrNo = temp;
			});		// cNo

			this.storage.get('cDur').then((temp) => {
			 this.contrDur = temp;
			});		// cNo

			this.storage.get('cAvg').then((temp) => {
			 this.contrAvg = temp;
			});		
			
			this.storage.get('iNo').then((temp) => {
			 this.intNo = temp;
			});		// cNo

			this.storage.get('iDur').then((temp) => {
			 this.intDur = temp;
			});		// cNo

			this.storage.get('iAvg').then((temp) => {
			 this.intAvg = temp;
			});		

			this.storage.get('start').then((temp) => {
			 this.startTime = temp;
			});		

			this.storage.get('totalTT').then((temp) => {
			 this.totalTime = temp;
			});		

  }

  constructor(private storage : Storage) { }

  ngOnInit() {

  }

  public destination: any;
  public name: any;
  public temp: any;
						// Key Pairs
  public contrNo: any;		// cNo
  public contrDur: any;		// cDur
  public contrAvg: any;		// cAvg

  public intNo: any;		// iNo
  public intDur: any;		// iDur
  public intAvg: any;		// iAvg

  public startTime: any;	// start time
  public totalTime: any;	// total time
}
