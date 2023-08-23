import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private _snackBar:MatSnackBar) { }
  openSnackBarTop(message:string , action:string) {
    this._snackBar.open(message,action, {
      duration:1000,
      verticalPosition:'top'
    });
  }
  openSnackBarBottom(message:string , action:string='OK') {
    this._snackBar.open(message,action, {
      duration:1000,
      verticalPosition:'bottom'
    });
  }
}
