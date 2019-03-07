import { Component  , OnInit, ViewChild, TemplateRef } from '@angular/core';
import { FormBuilder} from '@angular/forms';
import { Router } from '@angular/router';
import {Idle, DEFAULT_INTERRUPTSOURCES} from '@ng-idle/core';
import {Keepalive} from '@ng-idle/keepalive';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { IdleDialogComponent } from '../idle-dialog/idle-dialog.component';
import { HttpLoadObserverService } from 'src/app/http-load-observer.service';
import { HttpClientModule,HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
 
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  idleState = 'Not started.';
  timedOut = false;
  lastPing?: Date = null;
  public progressSpin:boolean =false;

  public isIPEnabled:boolean =false;
  public mySystemIP:String="";

  private idleModal: BsModalRef|null = null;

  public searchTerm: string = '';
  public myArray =['One','Two','Three','Four'];

  constructor(private formBuilder: FormBuilder, private router: Router,private idle: Idle, private modalService: BsModalService, private httpLoadObserver: HttpLoadObserverService
    , private httpClient : HttpClient) {
    idle.setIdle(60);
    // sets a timeout period of 5 seconds. after 10 seconds of inactivity, the user will be considered timed out.
    idle.setTimeout(30);
    // sets the default interrupts, in this case, things like clicks, scrolls, touches to the document
    idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

    idle.onTimeout.subscribe(() => {
      if (this.idleModal) {
        this.idleModal.hide();
      }
      this.router.navigate(['login']);
    });
    idle.onIdleStart.subscribe(() => {
      this.idleModal = this.modalService.show(IdleDialogComponent, {
        animated: false
      });
    });
  
    this.reset();

    this.httpLoadObserver.httpLoading.subscribe((value) => {
      this.progressSpin = value;
    });
   }

   reset() {
    this.idle.watch();
  }

  ngOnInit() { 
    let myID : String = localStorage.getItem("myID");
    console.log("Login ID "+ myID);
    if(myID==null){
    console.log("login id is null");
      alert("Unauthorized Access ! Please try to login first");
      this.router.navigate(['login']);
    }
    
   
  }
  modalFunc(){
    this.httpClient.get('https://api.ipify.org?format=json').subscribe((response) => {
      this.isIPEnabled =true;
      this.mySystemIP = response['ip'];
      console.log('my ip ' +this.mySystemIP );
      
      console.log(response);
    });
  }

  public myID : String = localStorage.getItem("myID");
  
  logOutMethod(){
    console.log("log out pressed");
    
    if(window.confirm("Do you really want to logout ?")){
  console.log("confirmed pressed");
  localStorage.removeItem("myID");
    this.router.navigate(['login']);

    }
    
    console.log("My logOut function " + this.myID);
  }

  onSearchKeyUp(event: KeyboardEvent) {
    
  }

  getListItemsFiltered(): string[] {
    const term = this.searchTerm.trim();
    if (this.searchTerm.length > 0) {
      return this.myArray.filter((value) => value.toLowerCase().startsWith(term.toLowerCase()));
    } else {
      return this.myArray;
    }
  }
}
