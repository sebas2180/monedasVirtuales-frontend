import { AuthService } from './../services/authService/auth.service';
import { Component } from '@angular/core';
import { interval } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'cryptoInfo';

  constructor(private auth: AuthService){
    interval(20000).subscribe(
      res =>{
        console.log(res);
      }
    )
  }
}
