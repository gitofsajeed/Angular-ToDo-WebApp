import { Component, OnInit } from '@angular/core';
import { CrudService } from '../service/crud.service';
import { Task } from '../model/task';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{

  taskobj : Task = new Task();

  taskArray : Task[] = [];

  addTaskValue : string = '';
  
  editTaskValue : string = '';

  constructor(private crudService : CrudService){}

  ngOnInit() {
    this.editTaskValue='';
    this.addTaskValue ='';
    this.taskArray=[];
    this.taskobj = new Task();  
    this.getAllTask()
  }

  getAllTask() {
    this.crudService.getAllTask()
    .subscribe({ next : (res)=>{
      this.taskArray = res;
    },
    error : (err) => {
      alert("enable to get the list of task!!");
    }
  });
  }

  addTask(){
    this.taskobj.taskName = this.addTaskValue;
    this.crudService.addTask(this.taskobj)
    .subscribe({next :(res) =>{
      this.ngOnInit();
      this.addTaskValue='';
    },
    error : err => {alert(err);}
  })
  }

  editTask(){
    this.taskobj.taskName = this.editTaskValue;
    this.crudService.editTask(this.taskobj)
    .subscribe({
      next :(res)=>{this.ngOnInit();},
      error : (err) =>{alert("Faild to Update Task!!")}
  })
  }

  deleteTask(task : Task){
    this.crudService.deleteTask(task)
    .subscribe({
      next :(res) =>{this.ngOnInit()},
      error : (err)=> {alert("Faild to delete the task!! ");}
  })
  }

  call(task :Task){
    this.taskobj = task;
    this.editTaskValue = task.taskName;
  }

  

}
