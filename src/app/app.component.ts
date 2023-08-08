import { Component } from '@angular/core';
import { UserService } from './services/user/user.service';
import { GoogleAuthService } from './services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Angular Gcp App';
  users: any;

  constructor(private userService: UserService, 
              private authService: GoogleAuthService){

  }

  ngOnInit() {
      this.authService.requestToken().then(token => console.log(`token : ${token}`))
      this.userService.getUsers().subscribe((data) => {this.users = data;});
  }
}


