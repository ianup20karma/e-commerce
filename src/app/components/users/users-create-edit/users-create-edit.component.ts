import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-users-create-edit',
  templateUrl: './users-create-edit.component.html',
  styleUrls: ['./users-create-edit.component.scss']
})
export class UsersCreateEditComponent implements OnInit {
  @Input() form: FormGroup = new FormGroup({});
  @Input() initialFormData: any = { username: '', name: '', email: '', password: '' };
  @Input() isLoggedIn: boolean = false;
  @Input() isEdit: boolean = false;
  @Input() userData: any = {};
  @Output() submitEvent = new EventEmitter<any>();
  @Output() loginEvent = new EventEmitter<any>();

  ngOnInit() {
    if (this.isEdit) {
      this.form.patchValue({
        username: this.userData.username,
        name: this.userData.name,
        email: this.userData.email,
        password: this.userData.password
      });
      this.initialFormData = this.form.value; 
    }
  }

  submit(form: FormGroup) {
    this.submitEvent.emit(form.value);
  }

  login() {
    this.submitEvent.emit(true);
  }
}
