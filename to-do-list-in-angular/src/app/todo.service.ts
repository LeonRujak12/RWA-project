import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import { HttpHeaders } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  url = 'http://localhost:3000/todos';
  constructor(private http: HttpClient) {}
  getTodos(): Observable<any> {
    const header = new HttpHeaders();
    header.set('Access-Control-Allow-Origin', '*');
    header.set('Accept', 'application/json');
    try {
      const result =  this.http.get(this.url, { headers: header });
      console.log("got response from server", result)
      return result
    } catch (ex) {
      console.log("fetch exception:", ex)
      throw ex
    }
  }

  postTodo(todo:any): Observable<any> {
    const header = new HttpHeaders();
    header.set('Access-Control-Allow-Origin', '*');
    header.set('Accept', 'application/json');

    try {
      const body = {
        title: todo.taskName,
        description: todo.taskDescription,
        projectName: 'never ending story',
        isCompleted: todo.isCompleted
      }
      const result =  this.http.post(this.url, body, { headers: header });
      console.log("got response from server", result)
      return result
    } catch (ex) {
      console.log("fetch exception:", ex)
      throw ex
    }
  }
  deleteTodo(todo:any): Observable<any> {
    const header = new HttpHeaders();
    header.set('Access-Control-Allow-Origin', '*');
    header.set('Accept', 'application/json');

    try {
      const url = `${this.url}/${todo.id}`
      console.log("deletam sa url", url)
      const result =  this.http.delete(url, { headers: header });
      console.log("got delete response from server", result)
      return result
    } catch (ex) {
      console.log("delete exception:", ex)
      throw ex
    }
  }
  updateTodo(todo:any): Observable<any> {
    const header = new HttpHeaders();
    header.set('Access-Control-Allow-Origin', '*');
    header.set('Accept', 'application/json');

    try {
      const body = {
        title: todo.taskName,
        description: todo.taskDescription,
        projectName: 'never ending story',
        isCompleted: todo.isCompleted
      }
      const url = `${this.url}/${todo.id}`
      const result =  this.http.put(url, body, { headers: header });
      console.log("got response from server", result)
      return result
    } catch (ex) {
      console.log("fetch exception:", ex)
      throw ex
    }
  }

}
