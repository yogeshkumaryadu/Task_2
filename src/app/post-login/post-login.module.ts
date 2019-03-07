import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive'; 

import { MomentModule } from 'angular2-moment'; 
import { NgIdleModule } from '@ng-idle/core';
import { IdleDialogComponent } from './idle-dialog/idle-dialog.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [HomeComponent, IdleDialogComponent],
  imports: [
    CommonModule,
    FormsModule,
    NgIdleModule.forRoot(),
    MomentModule
  ],
  entryComponents: [
    IdleDialogComponent
  ]
})
export class PostLoginModule { }
