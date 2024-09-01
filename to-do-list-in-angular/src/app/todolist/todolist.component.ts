import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TodoService } from '../todo.service';
@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.css']
})
export class TodolistComponent implements OnInit {

  taskArray = [
    { taskName: 'Brush teeth', taskDescription: "Ujutro operi zube", isCompleted: false },
    { taskName: 'napraviti da radi', taskDescription:"Neka radi", isCompleted: true}

  ];

  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
    this.todoService.getTodos().subscribe((data: any) => {
      console.log("mislim da su stigli podaci", data);
      //     { taskName: 'Brush teeth', taskDescription: "Ujutro operi zube", isCompleted: false },
      const ta = data.map((task:any) => {
        return {taskName: task.title, taskDescription: task.description, isCompleted: task.isCompleted}
      })
      this.taskArray = ta;
    })
  }

  onSubmit(form: NgForm) {
    console.log(form);

    this.taskArray.push({
      taskName: form.controls['task'].value,
      taskDescription: form.controls['description'].value,
      isCompleted: false
    })

    form.reset();
  }

  onDelete(index: number) {
    console.log(index);

    this.taskArray.splice(index, 1);
  }

  onCheck(index: number) {
    console.log(this.taskArray);

    this.taskArray[index].isCompleted = !this.taskArray[index].isCompleted;
  }

}
