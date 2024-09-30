import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { error } from 'console';

@Injectable({
  providedIn: 'root'
})
export class ClipboardService {

  constructor(private snackBarService:MatSnackBar) { }

  copy(text:string){
    if(navigator.clipboard){
      navigator.clipboard.writeText(text).then(() => {
        this.snackBarService.open('copied to the clipboard...','close');
      }).catch(error => {
        this.snackBarService.open('try again...','close');
      })
    }else{
      this.snackBarService.open('clipboard api not support in this browser...','close');
    }
  }

}
