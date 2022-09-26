import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { User } from './entity/User';
import { ApiUsersService } from './services/api-users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger(
      'enterAnimation', [
      transition(':enter', [
        style({ transform: 'translateX(-100%)', opacity: 0 }),
        animate('500ms', style({ transform: 'translateX(0)', opacity: 1 }))
      ]),
      transition(':leave', [
        style({ transform: 'translateX(0)', opacity: 1 }),
        animate('500ms', style({ transform: 'translateX(-100%)', opacity: 0 }))
      ])
    ]
    )
  ],
})
export class AppComponent implements OnInit {
  title = 'test-technique';
  listUsers: User[] = [];
  selectedUser: User;
  isShown = false;
  style1 = false;
  p: number = 1;
  userForm = this.fb.group({
    id: [''],
    _nom: ['', Validators.required],
    _prenom: ['', Validators.required],
    _nombre_enfants: ['', Validators.required],
  });
  constructor(private fb: FormBuilder, private userService: ApiUsersService) {

  }
  ngOnInit(): void {
    this.LoadListUsersFromJson();

  }
  userSelect(user) {
    console.log("selected user ", this.selectedUser, "user", user)
    if (user !== this.selectedUser) {
      this.style1 = true;
      this.selectedUser = user;
      if (!this.isShown)
        this.isShown = true;
      else {
        this.isShown = false;
        setTimeout(() => {
          this.isShown = true;
        }, 500);

      }
    }
  }

  onSubmit() {
    this.SaveListUsersInJson();

  }

  /*
  * @ToDo
  * */
  LoadListUsersFromJson() {
    this.userService.getUsers().subscribe(data => {
      this.listUsers = this.getRandomUserImage(data);
    })
  }
  //just fetching random picture and add it to uer Object
  getRandomUserImage(data: User[]) {
    const mapedData: User[] = data.map(element => {
      const random = Math.floor(Math.random() * 500)
      element.image = `https://joeschmoe.io/api/v1/${random}`
      return element
    });

    return mapedData
  }

  /*
  * @ToDo
  * */
  SaveListUsersInJson() {
    const length = this.listUsers.length - 1
    const id = this.listUsers[length].id + 1;
    const newUser = { ...this.userForm.value, id }
    this.userService.addUser(newUser).subscribe(r => {
      console.log("succes ???")
    })
  }

}
