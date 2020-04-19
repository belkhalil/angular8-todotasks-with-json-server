import { Component, OnInit } from '@angular/core';
import { Taskervice } from 'src/app/services/task.service.service';
import { Task } from 'src/app/models/task';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  constructor(private taskService: Taskervice) { }
  searchText = '';
  editForm = false;
  showForm = false;
  tasks: Task[] = [];
  resultTasks: Task[] = [];
  taskForm: Task = {
    label: '',
    completed: false
  };
  ngOnInit(): void {
    this.getTasks();
  }
  getTasks() {
    this.taskService.findAll().subscribe(
      (tasks) => {
        this.resultTasks = this.tasks = tasks;
      }
    );
  }

  deleteTask(id) {
    this.taskService.delete(id).subscribe(() => {
      // there is tow solutions possible : to delete the element id DB an in the list without getting the updated list of task from db 
      // or to delete element in database and after that we fetch de update list of tasks from db
      this.getTasks();
      // this.tasks = this.tasks.filter(task => task.id !== id);
    });
  }

  addTask() {
    if (this.taskForm.label.length !== 0 && this.taskForm.id == null) {

      this.taskService.add(this.taskForm)
        .subscribe(
          (task) => {
            this.tasks = [task, ... this.tasks];
            this.resetForm();
            this.showForm = false;
          }
        );
    } else if (this.taskForm.id != null) {
      console.log('updating ');
    }
  }

  updateTask() {
    if (this.taskForm.label.length !== 0 && this.taskForm.id == null) {

      this.taskService.update(this.taskForm)
        .subscribe(
          (task) => {
            this.editForm = false;
            // this.tasks = [task, ... this.tasks];
            this.resetForm();
          }
        );
    }
  }

  toggleCompleted(task) {
    this.taskService.completed(task.id, task.completed).subscribe(
      () => {
        task.completed = !task.completed;
      }
    );
  }

  editTask(id) {
    this.taskService.getOne(id).subscribe((task) => {
      this.taskForm = task;
      this.editForm = true;
      this.showForm = true;
    });
  }

  resetForm() {
    this.taskForm = {
      label: '',
      completed: false
    };
  }

  newTask() {
    this.editForm = false;
    this.showForm = !this.showForm;
    this.resetForm();
  }

  searchTasks() {
    this.resultTasks = this.tasks.filter(task => task.label.toLowerCase().includes(this.searchText.toLowerCase()));
  }
}
