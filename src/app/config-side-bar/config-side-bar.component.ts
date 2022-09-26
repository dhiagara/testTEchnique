import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { User } from '../entity/User';
import { Validators, FormBuilder } from '@angular/forms';
import { ApiUsersService } from '../services/api-users.service';

@Component({
  selector: 'app-config-side-bar',
  templateUrl: './config-side-bar.component.html',
  styleUrls: ['./config-side-bar.component.css']
})
export class ConfigSideBarComponent implements OnInit {
  @Input() user: User;
  userForm = this.fb.group({
    id: [''],
    _nom: ['', Validators.required],
    _prenom: ['', Validators.required],
    _nombre_enfants: ['', Validators.required],
  });

  constructor(private fb: FormBuilder, private userService: ApiUsersService) { }
  ngOnChanges(changes: SimpleChanges) {
    console.log(changes)
  }

  ngOnInit(): void {
    this.loadUser();
  }
  onSubmit() {

    const id = this.userForm.value.id;
    this.userService.updatUser(this.userForm.value, id).subscribe(r => {
      console.log("succes ???")
    })

  }
  loadUser() {
    console.log("user", this.user)
    this.userForm.patchValue({
      ...this.user
    });
  }

  // toggl() {
  //   var element = document.getElementById("sidebar");
  //   element.classList.toggle("active");
  // }

}
