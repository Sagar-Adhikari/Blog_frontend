import { ChartsModule } from 'ng2-charts';

import { TextFieldModule } from '@angular/cdk/text-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
    MatButtonModule, MatCardModule, MatFormFieldModule, MatIconModule, MatInputModule,
    MatListModule, MatMenuModule, MatPaginatorModule, MatProgressBarModule, MatSelectModule,
    MatSidenavModule, MatSnackBarModule, MatSortModule, MatTableModule, MatToolbarModule
} from '@angular/material';

export const MaterialModules = [
  FormsModule,
  ReactiveFormsModule,
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatSnackBarModule,
  MatToolbarModule,
  MatSidenavModule,
  MatIconModule,
  MatMenuModule,
  MatListModule,
  MatTableModule,
  MatSortModule,
  MatPaginatorModule,
  MatSelectModule,
  ChartsModule,
  MatProgressBarModule,
  TextFieldModule,
  MatCardModule,
];
