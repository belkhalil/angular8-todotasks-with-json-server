import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Task } from '../models/task';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Taskervice {
  apiUrl = 'http://localhost:3000/tasks';
  constructor(private http: HttpClient) { }

  findAll(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl);
  }
  delete(id) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
  add(task) {
    return this.http.post<Task>(this.apiUrl, task);
  }
  completed(id, completed) {
    return this.http.patch(`${this.apiUrl}/${id}`, { completed: !completed });
  }
  getOne(id) {
    return this.http.get<Task>(`${this.apiUrl}/${id}`);
  }
  update(task) {
    return this.http.put(`${this.apiUrl}/${task.id}`, task);
  }
}
