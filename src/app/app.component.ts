import { Component } from '@angular/core';
import { UserService } from './services/user/user.service';
import { GoogleAuthService } from './services/auth/auth.service';
import { error } from 'console';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Angular Gcp App';
  users: any;

  constructor(private userService: UserService, private authService : GoogleAuthService){}

  ngOnInit() {

  }

  fetchToken() {
    const storedToken = localStorage.getItem('google_auth_token');
    if(!storedToken){
      console.log('I am generating token....')
      this.authService.requestToken()
    } else {
      console.log('Token Present Already')
    }
  }
  fetchUsers() {
    this.userService.getUsers().then((response) => {
      console.log(response)
      this.users=response
    }).catch(error => console.log(error));
  }
}


