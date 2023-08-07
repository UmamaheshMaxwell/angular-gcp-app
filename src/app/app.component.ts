import { Component } from '@angular/core';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Angular Gcp App';
  users: any;

  constructor(private userService: UserService){}

  ngOnInit() {
    this.userService.getUsers().subscribe((data) => {
      this.users = data;
    });
  }
}


