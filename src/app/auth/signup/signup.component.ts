import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})


export class SignupComponent implements OnInit {
  isLoading = false;

  constructor(public authService: AuthService) {}

  onSignup(form: NgForm) {
    if (form.invalid) {
      console.log(form.value);
      return;
    }
    this.authService.createUser(form.value.email, form.value.password);
    console.log(form.value);
  }

  ngOnInit() {}

}
