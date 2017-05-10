import { Router, ActivatedRoute } from '@angular/router';




export class ErrorComponent {
  protected router:Router;
  protected route:ActivatedRoute;

  constructor (router:Router, route:ActivatedRoute) {
    this.router = router;
    this.route = route;
  }
  

  protected manageError(status:String){
    if(status == '401'){
      console.log(this.route);
      this.router.navigate(['/login']);
    }else{
      console.log("error "+status);
    }
  }


}
