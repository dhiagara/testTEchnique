import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { User } from '../entity/User';
import { ApiUsersService } from '../services/api-users.service';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css']
})
export class UserCardComponent implements OnInit {
  @Input() user: User;
  @Output() clickUser = new EventEmitter();
  constructor(private userService: ApiUsersService) { }

  ngOnInit(): void {
  }
  userSelect() {

  }
  deleteUser() {
    this.userService.deleteUser(this.user.id).subscribe(res => {
      console.log("user deleted");
    })
  }

}
