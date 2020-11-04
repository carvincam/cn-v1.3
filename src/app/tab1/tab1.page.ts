import { Component } from '@angular/core';

import { LocalNotifications } from '@ionic-native/local-notifications/ngx';

import { AlertController } from '@ionic/angular';

import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
clickSub: any;
  constructor(private localNotifications: LocalNotifications,
  public alertController: AlertController,
  private storage : Storage) {} 
 

  public destination: any;
  public name: any;
  public temp: any;

  public cArr: any = [];
  public iArr: any = [];
 

 async presentAlert() {
    const alert = await this.alertController.create({
      header: 'RESET ALL',
      message: 'Are you sure you want to erase all data?',
	  cssClass: 'alert-buttons',
      buttons: [
	  {
		text: 'Confirm',

		handler: () => {
			this.resetAll();
		}
	  },
	  {
	  	  text: 'Cancel',
		  role: 'cancel',

		  handler: (blah) => {
		  this.storage.set('mykey', this.name);
		  this.storage.get('mykey').then((temp) => {
		  this.destination = temp;
			});

            console.log('cancelled reset');
		    console.log(this.name);
			console.log(this.destination);
		}
	  }]
    });

    await alert.present();
  }

  testNotif() {
    // schedule notification
    this.localNotifications.schedule({
      id: 1,
      text: 'Your contractions are now 5 minutes or less apart. Now is a good time to start heading to the hospital.',
      title: 'Baby on the way!',
	  summary: '',
	  foreground: true,
	  data: { secret: 'key_data' }
    });
  }

  timerColor: string = null;
  

  hour: number
  min: number
  sec: number
  ms: number
  
  public totalTime: any;
  public totalTT: any = [];
  public timeBegan = null
  public timeStopped: any = null
  public stoppedDuration: any = 0
  public started = null
  public running = false
  public blankTime = "00:00:00.000"
  public time = "00:00:00.000"
  public mytime = "00:00:00.000"
  public textGO = "START"
  public textType: any = []
  public laps: any = []
  public timeLog: any = []
  public fivemin: any = 0
  public tempsec: any = 0
  public counter: any = 1

	start() {
	 if(this.running) return;
	  if (this.timeBegan === null) {
        this.reset();
        this.timeBegan = new Date();
	  }
	  if (this.timeStopped !== null) {
      let newStoppedDuration:any = (+new Date() - this.timeStopped)
      this.stoppedDuration = this.stoppedDuration + newStoppedDuration;
	  }
	  this.started = setInterval(this.clockRunning.bind(this), 10);
      this.running = true;
	  
  }

    stop() {
      this.running = false;
      this.timeStopped = new Date();
      clearInterval(this.started);
      this.textGO = 'START';
   }

    reset() {
      this.running = false;
      clearInterval(this.started);
      this.stoppedDuration = 0;
      this.timeBegan = null;
      this.timeStopped = null;
      this.time = this.blankTime;
	  
    }

    zeroPrefix(num, digit) {
      let zero = '';
      for(let i = 0; i < digit; i++) {
        zero += '0';
      }
      return (zero + num).slice(-digit);
    }
	
	getContrTime(){
		let cSec: any = this.sec;
		let cMin: any = this.min;
		let cHr: any = this.hour;
		
		let totalSeconds: any = (cSec) + (cMin*60) + (cHr*60*60);	// converts time to total seconds
		
		this.totalTime = totalSeconds;
	  }

	 setContrTime() {
	 if(this.textGO.includes('START')){
	  this.cArr.push(this.totalTime);	
		  let sum: any = 0;
		  for (var i = 1; i < this.cArr.length; i++) {
		  	  sum += this.cArr[i];
		  }
		this.temp = (sum / (i));
		this.storage.set('cAvg', this.temp);
		console.log(this.temp);
		this.storage.set('cNo', i);
		this.storage.set('cDur', this.time);
		}
	  }

	  getIntTime(){
		let iSec: any = this.sec;
		let iMin: any = this.min;
		let iHr: any = this.hour;
		
		let totalSeconds: any = (iSec) + (iMin*60) + (iHr*60*60);	// converts time to total seconds
		
		this.totalTime = totalSeconds;
	  }

	  setIntTime() {
	 if(this.textGO.includes('STOP')){
	  this.iArr.push(this.totalTime);	
		  let sum: any = 0;
		  for (var i = 1; i < this.iArr.length; i++) {
		  	  sum += this.iArr[i];
		  }
		 
		this.temp = (sum / (i-1));	// gets average
		
		this.mytime = this.temp;
		this.storage.set('iAvg', this.mytime);
		console.log(this.mytime);
		this.storage.set('iNo', i-1);
		this.storage.set('iDur', this.time);
		}
	  }

    clockRunning() {
      let currentTime:any = new Date()
      let timeElapsed:any = new Date(currentTime - this.timeBegan - this.stoppedDuration)
      this.hour = timeElapsed.getUTCHours()
      this.min = timeElapsed.getUTCMinutes()
      this.sec = timeElapsed.getUTCSeconds()
      this.ms = timeElapsed.getUTCMilliseconds()	

	  this.tempsec = this.sec;
	  this.fivemin = this.min;		// variable to store minutes for local notification function
		  this.getContrTime();
		  this.getIntTime();
	  this.time =
      this.zeroPrefix(this.hour, 2) + ":" +
      this.zeroPrefix(this.min, 2) + ":" +
      this.zeroPrefix(this.sec, 2) + "." +
      this.zeroPrefix(this.ms, 3);
    }

	// Returns date/time for output to list
	displayDate() {
		var nowdate = new Date(); 
		var datetime = nowdate.getMonth() + "/"
                + nowdate.getDate() + "/" 
                + nowdate.getFullYear() + " @ " +

				nowdate.toLocaleTimeString();	// local time in AM/PM format
		
				return datetime;
	}

	// Changes the start button to stop and vice versa
    changeText() {
      if(this.textGO.includes('STOP')){
        this.textGO = 'START';
      }
      else if(this.textGO.includes('START')){
        this.textGO = 'STOP';
      }
  }
	
	// Stores variables from this tab to local storage
	storageMethod() {
	this.storage.set('start', this.timeLog[0]);	// stores start time into local storage
	
		let mytemp: any = this.totalTime;
		this.storage.set('totalTT', mytemp);

  }

    lapTime() {      
	  this.timeLog.push(this.displayDate());	// Stores current date/time into array, for output to list.
	  this.storageMethod();			// accesses storage
	   
	  this.setContrTime();
	  this.setIntTime();

	  let lapsTime = this.time;
		  if (this.textGO.includes('START')) {
			this.laps.push(lapsTime);
		  }
		  if (this.textGO.includes('STOP')) {
			this.laps.push(lapsTime);
		  }

	  this.alertTrigger();
      this.reset();
      this.start();
  }

  // Local Notification Alert Algorithm
	alertTrigger() {
	  this.counter++;
		if (this.time != "00:00:00.000") {	// if timer is 0, reset button was pressed. (we don't want an alert after resetting)
		if(this.counter > 2){	// counter starts at 1 by default and after reset. 
								//prevents the alert from triggering on the first press.
		 if (this.counter % 2 === 0) {	// modulus by 2 checks if counter is even
			if (this.fivemin < 5) {	// if counter is even, checks if the current minute is less than 6.
			this.testNotif();		// displays local notification for 5 minute active labor warning
			}
		  }
		}
	  }
	  }

	lapType() {
		if (this.textGO.includes('START')) {
		  this.textType.push('INTERVAL');
		}
		if (this.textGO.includes('STOP')) {
		  this.textType.push('CONTRACTION');
		}
	  }

	timerColorCycle() {
		 if (this.textGO.includes('START')){
		 this.timerColor = null;
		 }
			else this.timerColor = 'red'; 
		 }
		 
	public resetAll(): void {
		  this.stop();
		  this.time = "00:00:00.000";
		  this.laps = [];
		  this.textType = [];
		  this.counter = 1;
		  this.timerColor = null;

		  console.log(this.name);
		  this.storage.clear().then(() => {
			 console.log('all key pairs cleared');
			 this.storage.get('dest').then((temp) => {
			 this.name = temp});
			 console.log(this.name);
		 });
		 
		 this.cArr.length = 0;
		 this.iArr.length = 0;
		 
		}
	  
	  
	}
  
