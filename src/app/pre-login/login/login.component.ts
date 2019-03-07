import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators ,ReactiveFormsModule, FormControl} from '@angular/forms';
import { Router } from '@angular/router';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  registerForm: FormGroup;
  submitted = false;
  public myID:String;

  constructor(private formBuilder: FormBuilder,private router: Router) { }
  
  ngOnInit() {
    localStorage.removeItem("myID");
    /*this.registerForm = this.formBuilder.group({
      firstName: ['', [Validators.required,Validators.pattern(new RegExp("^([0|\+[0-9]{1,5})?([7-9][0-9]{9})$|[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?"))]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });*/

    const emailValidator = Validators.email;
    const phoneValidator = Validators.pattern(/^[0-9]{10}$/)

    this.registerForm = this.formBuilder.group({
      firstName: new FormControl('', [
        Validators.required, 
        (control) => {
          if (emailValidator(control) !== null && phoneValidator(control) !== null) {
            return { invalid: true };
          } else {
            return null;
          }
        }
      ]),
      password: new FormControl('', [
        Validators.required, 
        Validators.min(8), 
        Validators.max(20),
        Validators.pattern(/[a-z]+/),
        Validators.pattern(/[A-Z]+/),
        Validators.pattern(/[0-9]+/),
        Validators.pattern(/[!@#\$%\^\&*\)\(+=._-]+/)
      ])
    });

    console.log(this.registerForm);
  }

  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;
    var firstName : string = name;
    // stop here if form is invalid
    if (this.registerForm.invalid) {
        return;
    }
    console.log("myname" +this.f.firstName.value);
    //localStorage.setItem("myID",this.f.firstName.value);
    //this.router.navigate(['home']);
}



}
