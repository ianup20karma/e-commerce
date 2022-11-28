import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router, private common: CommonService) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  onSubmit(form: FormGroup) {
    let formValue = form.value;
    this.http.get<any>('http://localhost:3000/users')
      .subscribe({
        next: (res) => {
          const regUsers = res;
          const userExists = regUsers.find((user: any) => (user.username === formValue.username || user.email === formValue.username) && user.password === formValue.password);

          if (userExists) {
            this.common.setLoggedUserData(userExists);
            alert('Login Successful!');
            alert('Welcome to E-Commerce! Enjoy your Stay!');
            this.loginForm.reset();
            this.router.navigate(['/'])
              .then(() => {
                window.location.reload();
              });
          } else {
            alert('User Not Found!')
          }
        },
        error: () => {
          alert('Something went wrong!');
        },
        complete: () => { }
      });
  }
  
  registerRoute() {
    this.router.navigate(['/signup']);
  }
}
