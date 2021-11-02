import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from '@base/app/core/interfaces/models/user.interface';

@Component({
  selector: 'app-auth-options',
  templateUrl: './auth-options.component.html',
  styleUrls: ['./auth-options.component.sass']
})
export class AuthOptionsComponent implements OnInit {

  @Input() user: User | any;

  @Output() logoutEvent = new EventEmitter<boolean>();

  public userName: string;

  constructor() { }

  ngOnInit(): void {
  }

  public logout() {
    this.logoutEvent.emit(true);
  }
}
