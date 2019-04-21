import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Item } from '../Item';
import { UserServiceService } from '../user-service.service';
import { Observable } from '../../../node_modules/rxjs';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

    item = new Item();
    errorMessage: any;
   @Input() exitItemFormPage: boolean = false;
   @Output() onExitEvent: EventEmitter<boolean> = new EventEmitter<boolean>(false);

   isdisable: boolean = true;

  constructor(private userService: UserServiceService) { }

  ngOnInit() {
  }

  saveFormData(item){
         alert(JSON.stringify(item));
        this.userService.createUser(item)
        .subscribe(
            data => {if(data) alert("Data Saved Successfully");
            this.userService.getUsersList().subscribe(data => data);
            this.reset();
        },
        error => {
            alert("Got some error while saving data..'");
            this.errorMessage = <any>error;
        return Observable.throw(error);
                 },
        () => {alert("finished post req...");
                this.isdisable = false; }
        );

  }
  exitItemForm(){
         this.exitItemFormPage = false;
         this.onExitEvent.emit(this.exitItemFormPage);      
  }
  reset(){
      this.item.id = null;
      this.item.userId = null;
      this.item.title = null;
      this.item.body = null;
  }
}
