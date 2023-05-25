import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  public faEye = faEye;
  public faEyeSlash = faEyeSlash;
  public isShowPsw: boolean = false;
  signInForm: FormGroup;
  constructor(private fb: FormBuilder) {
    this.signInForm = this.fb.group({
      username: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(6),
        ]),
      ],
      password: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(6),
          Validators.pattern(/^(?=.*[!@#$%^&*]+)[a-z0-9!@#$%^&*]{6,32}$/),
        ]),
      ],
    });
  }
  ngOnInit(): void {
  }
  onSubmit(): void {
    console.log(this.signInForm);
  }
  hanhleShowPsw(){
    this.isShowPsw = !this.isShowPsw;
  }

  get f() {
    if (!this.signInForm) return {};
    return this.signInForm.controls;
  }
  getErrorMessage(control: any) {
    if (!control.errors) {
      return "";
    }

    if (control.errors['required']) {
      return "This field is required.";
    }

    if (control.errors['maxlength']) {
      return `This field max length is ${control.errors['maxlength'].requiredLength}.`;
    }

    if (control.errors['minlength']) {
      return `This field min length is ${control.errors['minlength'].requiredLength}.`;
    }

    if (control.errors['invalidStartDate']) {
      return "Should be less than or equal to the end date!";
    }

    if (control.errors['actionDuplicated']) {
      return "The action is existed.";
    }

    if (control.errors['cannotContainSpace']) {
      return "Not allow space."
    }

    if (control.errors['pattern']) {
      return "Not allow special characters."
    }

    if (control.errors['isCodeExisted']) {
      return "Widget code is existed."
    }

    if (control.errors['min']) {
      return `Min is ${control.errors['min'].min}.`
    }

    if (control.errors['max']) {
      return `Max is ${control.errors['max'].max}.`
    }

    return "Invalid field";
  }
}
