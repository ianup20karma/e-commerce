import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  loggedIn = false;
  constructor(private common: CommonService, private router: Router) {}

  ngOnInit() {
    this.loggedIn = this.common.isLoggedIn();
  }
  logout() {
    this.common.deleteLoggedUserData();
    this.router.navigate(['/dashboard'])
      .then(() => {
        window.location.reload();
      });
  }

  register() {
    this.router.navigate(['/users/create']);
  }
}
