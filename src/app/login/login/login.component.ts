import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {QuoteService} from '../../services/quote.service';
import {Quote} from '../../domain/quote.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  // 为了防止为空给初始值
  quote: Quote =  {
    cn: '慧妍',
    en: 'Aliquam erat volutpat.',
    pic: '/assets/img/quotes/1.jpg'
  };
  constructor(private fb: FormBuilder, private quoteService: QuoteService) {
    this.quoteService.getQuote().subscribe(q => {
      this.quote = q;
    });
  }

  ngOnInit() {
    this.form = this.fb.group({
      email: ['wang@163.com', Validators.compose([Validators.required, Validators.email, this.validate])],
      password: ['', Validators.required],
    });
  }

  onSubmit({value, valid}, ev: Event) {
    ev.preventDefault();
    console.log(JSON.stringify((value)));
    console.log(JSON.stringify((valid)));
    this.form.controls['email'].setValidators(this.validate);
  }

  validate(c: FormControl): {[key: string]: any} {
    if (!c.value) {
      return null;
    }
    const pattern = /^wang+/;
    if (pattern.test(c.value)) {
      return null;
    }
    return {
      emailNotValid: 'The email must start with wang'
    };
  }
}
