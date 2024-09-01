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
  }}
