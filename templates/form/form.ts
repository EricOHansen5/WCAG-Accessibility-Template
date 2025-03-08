// form.component.ts
export class FormComponent implements OnInit {
    form = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  
    constructor(private fb: FormBuilder) {}
  }