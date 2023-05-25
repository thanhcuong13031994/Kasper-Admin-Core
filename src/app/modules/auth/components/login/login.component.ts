import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../service/auth.service';
import { Credential } from '../../service/credential.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { LoginAction } from '../../action/auth.action';
import { selectIsLogin } from '../../selector/auth.selector';
import { Subject, skip, takeUntil } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  public faEye = faEye;
  public faEyeSlash = faEyeSlash;
  public isShowPsw: boolean = false;
  public loginIncorrect: boolean = false;
  signInForm: FormGroup;
  destroy$: Subject<boolean>;
  constructor(private fb: FormBuilder, private authService: AuthService, private credential: Credential, private rorte: ActivatedRoute, private router: Router, private store: Store<any>) {
    this.destroy$ = new Subject();
    this.signInForm = this.fb.group({
      username: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(6),
          Validators.pattern(/^[a-z]{6,32}$/i),
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
    this.store.pipe(select(selectIsLogin()), takeUntil(this.destroy$), skip(1)).subscribe(res => {
      if(!res) {
        this.loginIncorrect = true;
        return;
      };
      this.router.navigate(['/dashboard']);
    });
  }
  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
  onSubmit(): void {
    console.log(this.signInForm);
    const controls = this.signInForm.controls;
    const authData = {
      username: controls['username'].value,
      password: controls['password'].value,
    }
    this.credential.setUserName(authData.username);
    // this.authService.login(authData).pipe().subscribe(res => {
    //   // console.log(res);
    //   if(!res) {
    //     this.loginIncorrect = true;
    //     return;
    //   };
    //   this.router.navigate(['/dashboard']);
    // });

    this.store.dispatch(new LoginAction(authData));
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
