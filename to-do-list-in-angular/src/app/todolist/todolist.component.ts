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
        return {
          id: task._id,
          taskName: task.title,
          taskDescription: task.description,
          isCompleted: task.isCompleted
        }
      })
      this.taskArray = ta;
    })
  }

  onSubmit(form: NgForm) {
    console.log(form);
    const request =  {
      taskName: form.controls['task'].value,
      taskDescription: form.controls['description'].value,
      isCompleted: false
    }
    this.todoService.postTodo(request).subscribe((data: any) => {
      console.log("post je upalio", data);
      const ta = {
        id: data._id,
        taskName: data.title,
        taskDescription: data.description,
        isCompleted: data.isCompleted
      }
      this.taskArray.push(ta);
    })

    form.reset();
  }

  onDelete(index: number) {
    console.log(index);
    this.todoService.deleteTodo(this.taskArray[index]).subscribe((data: any) => {
      console.log("delete je upalio", data);
      this.taskArray.splice(index, 1);
    })
  }

  onCheck(index: number) {
    const task = {...this.taskArray[index]};
    task.isCompleted = !task.isCompleted
    this.todoService.updateTodo(task).subscribe((data: any) => {
      console.log("update je upalio", data);
      const taskArray = [...this.taskArray]
      taskArray[index] = task
      this.taskArray = taskArray
    })
  }

}
