import { Component } from '@angular/core';
import { GlobalContants } from '../shared/global-constant';
import { Router } from "@angular/router";
import { TaskboardService } from '../services/taskboard.service';
import { SnackbarService } from '../services/snackbar.service';
import { MatDialogRef } from '@angular/material/dialog';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { FormGroup } from '@angular/forms'
import { FormBuilder,Validators} from '@angular/forms';

@Component({
  selector: 'app-task-create',
  templateUrl: './task-create.component.html',
  styleUrls: ['./task-create.component.css']
})
export class TaskCreateComponent {
  taskForm: any = FormGroup;
  responseMessage: any;


  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private taskboardService: TaskboardService,
    private snackbarService: SnackbarService,
    private dialogRef: MatDialogRef<TaskCreateComponent>,
    private ngxService: NgxUiLoaderService) { }

  ngOnInit(): void {
    this.taskForm = this.formBuilder.group({
      name: [null, [Validators.required]],
      description: [null, [Validators.required]],
      due_date: [null, Validators.required]
    })
  }

  handleSubmit() {
    this.ngxService.start();
    var formData = this.taskForm.value;
    var data = {
      name: formData.name,
      description: formData.description,
      due_date: formData.due_date
    }
    this.taskboardService.createTask(data).subscribe((response: any) => {
      this.ngxService.stop();
      this.dialogRef.close();
      this.responseMessage = response?.message;
      this.snackbarService.openSnackBar(this.responseMessage, "");
      this.router.navigate(['/']);
    }, (error) => {
      this.ngxService.stop();
      if (error.error?.message) {
        this.responseMessage = error.error?.message;
      }
      else {
        this.responseMessage = GlobalContants.genericError;
      }
      this.snackbarService.openSnackBar(this.responseMessage, GlobalContants.error);
    })
  }
}
