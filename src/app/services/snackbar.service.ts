import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: "root",
})
export class SnackBarService {
  constructor(private snackBar: MatSnackBar) {}

  open(message: string, duration = 2000) {
    this.snackBar.open(message, undefined, {
      duration,
      panelClass: ["success-snackbar"],
    });
  }

  showError(message = "Something went wrong!", duration = 2000) {
    this.snackBar.open(message, undefined, {
      duration,
      panelClass: ["red-snackbar"],
    });
  }
}
