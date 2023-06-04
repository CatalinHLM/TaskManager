import { Injectable } from '@angular/core';
import { environment } from 'src/environment/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class TaskboardService {
  url=environment.apiUrl;

  constructor(private httpClient: HttpClient) { }
  
  
  createTask(data: any) {
    return this.httpClient.post(this.url +
      "/task/createByEmail", data, {
      headers: new HttpHeaders().set('Content-Type', "application/json")
    })
  }

  getTasks(){
    return this.httpClient.get(this.url + "/task/getByEmail");
  }

  deleteTask(taskId: number){
    var delURL=this.url+"/task/deleteTaskId"+"?taskId="+`${taskId}`;
    return this.httpClient.delete(delURL);
  }

  

}
