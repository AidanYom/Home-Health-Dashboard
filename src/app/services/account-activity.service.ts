import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AccountActivityService {
  noRequest = ""
  lostEmail!: BehaviorSubject<string>;
  constructor() {
    this.lostEmail = new BehaviorSubject(this.noRequest);
    
  }
  requestForget(email:string){
    this.lostEmail.next(email)
  }
  passwordFound(){
    this.lostEmail.next(this.noRequest)
  }
}
