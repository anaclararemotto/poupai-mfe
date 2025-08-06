
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedRoutingModule } from './shared-routing-module';
import { ModalTransactions } from './modal-transactions/modal-transactions'; 




@NgModule({
 
  declarations: [], 
  imports: [
    CommonModule,
    SharedRoutingModule,
    ModalTransactions 
  ],
  exports: [
    ModalTransactions
  ]
})
export class SharedModule { }


