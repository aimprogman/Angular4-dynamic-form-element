import { Component, OnInit } from '@angular/core';
import { AimService } from './service/aim.service';
// import {NgForm} from '@angular/forms'; 
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AimService]
})
export class AppComponent implements OnInit {

  data: any[];

  elements: any[];

  myForm: FormGroup;

  formData: any = {};

  sectionActive: any = [];

  errorMessages: any = {
    required: 'Не заполнено обязательное поле!',
    minLength: 'Длина строки не должно быть меньше',
    maxLength: 'Длина строки не должно быть больше',
    min: 'Минимальное допустимое число',
    max: 'Максимальное допустимое число',
    pattern: 'Недопустимые символы!',
    email: 'Пожалуйста. введите правильный Email адрес!'
  };


  constructor(private aimService: AimService, private fb: FormBuilder) { }

  ngOnInit() {
    this.init();
  }

  /**
   * Initialization
   */
  init() {
    this.getFromServer();
    this.myForm = this.fb.group({});
  }

  /**
  * Get data from server, set active section, create dynamic form with receipt data
  */
  getFromServer() {
    this.aimService.getData().subscribe((response) => {
      this.data = response['data'];
      this.sectionActive = this.data.map(() => { return false; })
      this.sectionActive[0] = true;
      this.createDynamicForm(0);
    });
  }
  /**
   * Create dynamic form with validation 
   * @param index 
   */
  createDynamicForm(index) {
    this.formData = {};
    for (let item of this.data[index].body) {
      this.formData[item.name] = ['', this.createDynamicValidation(item.validation)];
    }
    this.myForm = this.fb.group(this.formData);
    this.elements = this.data[index]['body'];
  }

  /**
   * Create dynamic validation 
   * @param validators 
   */
  createDynamicValidation(validators) {
    let validation = [];

    if ('required' in validators) {
      if (validators.required) validation.push(Validators.required);
    }
    if ('min' in validators) {
      validation.push(Validators.min(validators.min));
    }
    if ('max' in validators) {
      validation.push(Validators.max(validators.max));
    }
    if ('minLength' in validators) {
      validation.push(Validators.minLength(validators.minLength));
    }
    if ('maxLength' in validators) {
      validation.push(Validators.maxLength(validators.maxLength));
    }
    if ('pattern' in validators) {
      validation.push(Validators.pattern(validators.pattern));
    }
    if ('email' in validators) {
      if (validators.email) validation.push(Validators.email);
    }

    return validation;

  }

  /**
   * Called from view when clicked sections
   * @param index 
   */
  onChangeSection(index) {

    this.validateAllFormFields(this.myForm);

    if (this.myForm.valid) {
      this.aimService.postData(this.myForm.value).subscribe((response)=>{alert(response['data'])});
      this.sectionActive.fill(false);
      this.sectionActive[index] = true;
      this.createDynamicForm(index);
    }
  }
  /**
   * check validate of form element 
   * @param formGroup 
   */
  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      control.markAsTouched({ onlySelf: true });
    });
  }



}
