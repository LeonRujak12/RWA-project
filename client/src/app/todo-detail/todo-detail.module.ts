import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoDetailComponent } from './todo-detail.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    TodoDetailComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class TodoDetailModule { }
