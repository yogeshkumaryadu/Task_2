import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpLoadObserverService {

  public httpLoading = new Subject<boolean>();
  public httpCounter: number = 0;
  constructor() { }

  incrementHttpCounter(){
    this.httpCounter++;
    this.httpLoading.next(true);
  }

  descrementHttpCounter(){
    this.httpCounter--;
    if(this.httpCounter ===0){
      this.httpLoading.next(false);
    }
  }
}
