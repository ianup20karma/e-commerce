import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  loggedIn = false;
  name = ''
  constructor(private common: CommonService) { }

  ngOnInit(): void {
    this.loggedIn = this.common.isLoggedIn();
    this.common.loggedUserData.subscribe((res: any) => this.name = res.name);
  }
}
