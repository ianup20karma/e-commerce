import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {
  loggedIn = false;
  isUserAdmin = false;
  usersData: any = [];
  constructor(private common: CommonService, private users: UsersService ,private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.loggedIn = this.common.isLoggedIn();
    this.common.loggedUserData.subscribe((res: any) => this.isUserAdmin = res.admin);
    if (this.loggedIn) {
      this.http.get<any>('http://localhost:3000/users')
        .subscribe(
          (res) => this.usersData = res,
          () => alert('Something went wrong!')
        );
    }
  }

  createUser() {
    this.router.navigate(['/users/create']);
  }

  action(actiontype: string, user: any) {
    this.users.setUserForCurrentAction(user);
    if (actiontype === 'edit') {
      this.router.navigate([`/users/edit/${user.id}`]);
    } else {
      this.users.deleteUser(user);
    }
  }
}
