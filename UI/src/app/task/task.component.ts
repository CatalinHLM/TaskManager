import { Component, OnInit} from '@angular/core';
import { SnackbarService } from '../services/snackbar.service';
import { TaskboardService } from '../services/taskboard.service';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogConfig } from '@angular/material/dialog';
import { TaskCreateComponent } from '../task-create/task-create.component';
import { Router } from "@angular/router";

interface Task {
  id: number;
  user_id: number;
  name: string;
  description: string;
  due_date: string;
  created_at: string;
}

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent {
  tasks: Task[] = [];

  constructor(private taskService: TaskboardService, private snackbarService: SnackbarService,private dialog: MatDialog,private router: Router) {}

  ngOnInit() {
    this.fetchTasks();
  }

  fetchTasks() {
    this.taskService.getTasks().subscribe(
      (response: any) => { // Use 'any' type for now
        this.tasks = response;
      },
      (error) => {
        console.error(error);
        this.snackbarService.openSnackBar("Failed to fetch", "");
      }
    );
  }

  deleteTask(taskId: number) {
    this.taskService.deleteTask(taskId).subscribe(
      () => {
        this.tasks = this.tasks.filter((task) => task.id !== taskId);
        this.snackbarService.openSnackBar('Task deleted successfully', "");
      },
      (error) => {
        console.error(error);
        this.snackbarService.openSnackBar('Failed to delete task', "");
      }
    );
  }


  createAction() {
      const dialogConfig= new MatDialogConfig();
      dialogConfig.width="550px";
      this.dialog.open(TaskCreateComponent,dialogConfig);
    }

  SignOut(){
    localStorage.clear();
    this.router.navigate(['/']);
  }
}
