import { Task } from "./../../model/task";
import { Component, OnInit } from "@angular/core";
import { TaskService } from "./../../services/task.service";
import { Task } from "src/app/model/task";
@Component({
  selector: "app-tasks",
  templateUrl: "./tasks.component.html",
  styleUrls: ["./tasks.component.css"]
})
export class TasksComponent implements OnInit {
  showForm = false;
  searchText = "";
  editForm = false;
  tasks: Task[] = [];
  resultTasks: Task[] = [];
  myTask: Task = {
    label: "",
    completed: false
  };
  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.getTasks();
  }
  getTasks() {
    this.taskService.findAll().subscribe(tasks => {
      this.resultTasks = this.tasks = tasks;
    });
  }
  deleteTask(id) {
    this.taskService.delete(id).subscribe(() => {
      this.tasks = this.tasks.filter(task => task.id != id);
    });
  }
  persisTask() {
    this.taskService.persist(this.myTask).subscribe(task => {
      this.tasks = [task, ...this.tasks];
      this.reseTask();
      this.showForm = false;
    });
  }
  reseTask() {
    this.myTask = {
      label: "",
      completed: false
    };
  }
  toggleCompleted(task) {
    this.taskService.completed(task.id, task.completed).subscribe(() => {
      task.completed = !this.taskService.completed;
    });
  }
  editTask(task) {
    this.myTask = task;
    this.editForm = true;
  }
  updateTask() {
    this.taskService.update(this.myTask).subscribe(() => {
      this.reseTask();
      this.editForm = false;
    });
  }
  searchTasks() {
    this.resultTasks = this.tasks.filter(task =>
      task.label.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }
}
