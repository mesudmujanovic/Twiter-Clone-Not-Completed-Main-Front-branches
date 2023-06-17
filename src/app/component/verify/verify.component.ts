import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, of, tap } from 'rxjs';
import { LocalStorageService } from 'src/app/service/local-storage.service';
import { VerifyService } from 'src/app/service/verify.service';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.css']
})
export class VerifyComponent {

  verifyForm: FormGroup

  constructor(private formBuilder: FormBuilder,
    private verifyService: VerifyService,
    private localStorage: LocalStorageService,
    private router: Router) {

    this.verifyForm = this.formBuilder.group({
      nameAccount: ['', Validators.required],
      lastNameAccount: ['', Validators.required],
      age: [null, Validators.required],
      job: ['', Validators.required],
      phone: ['', Validators.required]
    });
  }

  onVerify() {
    if (this.verifyForm) {
      const verify = this.verifyForm.value;
      const userId = this.localStorage.getLocalStorage("user")
      this.verifyService.addVerify(verify, userId).pipe(
        tap(response => {
          this.router.navigate(['/post']);
          const verifyId = response.id;
          const allVerify = response;
          this.localStorage.setLocalStorage("verifyId", verifyId);
          this.localStorage.setLocalStorage("allVerify", allVerify)
          console.log("verifyRes", response);
        }),
        catchError( (error) =>{
          console.log("verError",error);
          alert("Morate se prvo ulogovati")
          this.router.navigate(['/login']);
          return of([]);
        }),
      ).subscribe(() => {
        console.log();
      })
    }
  }

  ngOnInit(): void {

  }
}
