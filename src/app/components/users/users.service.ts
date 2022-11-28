import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  userForCurrentAction: any = {};
  constructor(private http: HttpClient, private router: Router) {}

  setUserForCurrentAction(user: any) {
    this.userForCurrentAction = user;
  }

  updateUser(user: any, signUpForm: FormGroup, loggedIn: boolean) {
    let newUser = { ...user, id: this.userForCurrentAction.id };
    this.http.put<any>(`http://localhost:3000/users/${newUser.id}`, newUser)
      .subscribe({
        next: () => {
          alert('User Data Updated Successfully!');
          alert('Please login using your new credentials!');
          signUpForm.reset();

          if (!loggedIn) this.router.navigate(['/login']);
          else this.router.navigate(['/users']);
        },
        error: () => {
          alert('Something went wrong!');
        }
      });
  }

  createUser(user: any, signUpForm: FormGroup, loggedIn: boolean) {
    this.http.post<any>('http://localhost:3000/users/', user)
      .subscribe({
        next: () => {
          alert('You are now Registered!');
          alert('Please login using your new credentials!');
          signUpForm.reset();

          if (!loggedIn) this.router.navigate(['/login']);
          else this.router.navigate(['/users']);
        },
        error: () => {
          alert('Something went wrong!');
        }
      });
  }

  deleteUser(user: any) {
    if (window.confirm('Do you really want to delete this user?')) {
      this.http.delete<any>(`http://localhost:3000/users/${user.id}`, user)
        .subscribe({
          next: () => {
            alert('User Data deleted Successfully!');
            location.reload();
          },
          error: () => {
            alert('Something went wrong!');
          }
        });
    }
  }
}
