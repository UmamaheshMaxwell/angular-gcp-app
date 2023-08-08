import { Component } from '@angular/core';
import { UserService } from './services/user/user.service';
import { AuthService } from './services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Angular Gcp App';
  users: any;

  constructor(private userService: UserService, private authService: AuthService){}

  ngOnInit() {
    this.authService.getIdentityToken().subscribe(token => {
      console.log(`token ${token}`)
      this.userService.getUsers(token).subscribe((data) => {
        this.users = data;
      });
    })

  }
}


