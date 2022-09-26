import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { User } from '../entity/User';
import { ApiUsersService } from '../services/api-users.service';
import { SubSink } from 'subsink';
@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css'],
})
export class UserCardComponent implements OnInit, OnDestroy {
  private subs = new SubSink();
  @Input() user: User;
  @Output() clickUser = new EventEmitter();
  userForm = this.fb.group({
    id: [''],
    _nom: ['', Validators.required],
    _prenom: ['', Validators.required],
    _nombre_enfants: ['', Validators.required],
  });
  constructor(private userService: ApiUsersService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.loadUser();
  }
  userSelect() { }
  deleteUser() {
    this.subs.sink = this.userService
      .deleteUser(this.user.id)
      .subscribe((res) => {
        console.log('user deleted');
      });
  }
  onSubmit() {
    const id = this.userForm.value.id;
    this.subs.sink = this.userService
      .updatUser(this.userForm.value, id)
      .subscribe((r) => { });
  }
  loadUser() {
    this.userForm.patchValue({
      ...this.user,
    });
  }
  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
