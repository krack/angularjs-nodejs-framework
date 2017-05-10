import { Router, ActivatedRoute } from '@angular/router';
export class ErrorComponent {
  protected router:Router;

  constructor (router:Router) {
    this.router = router;
  }


  protected manageError(status:String){
    if(status == '401'){
      localStorage.setItem('last-url-error', this.router.url);
      this.router.navigate(['/login']);
    }else{
      console.log("error "+status);
    }
  }
}
