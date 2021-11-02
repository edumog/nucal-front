import { Component, Input, OnInit } from '@angular/core';
import { FormControl, AbstractControl } from '@angular/forms';

import { errors } from './list-errors';


@Component({
  selector: 'app-form-errors',
  templateUrl: './form-errors.component.html',
  styleUrls: ['./form-errors.component.sass']
})
export class FormErrorsComponent implements OnInit {

  public errors = errors;

  @Input() control: FormControl | AbstractControl | null = null;

  constructor() { }

  ngOnInit(): void {
  }

}
