import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { SnackbarService } from './snackbar.service';
import { ActivatedRouteSnapshot, Router } from "@angular/router";
import jwt_decode from 'jwt-decode';
import { GlobalContants } from '../shared/global-constant';

@Injectable({
  providedIn: 'root'
})
export class RouteGuardService {

  constructor(public auth: AuthService, 
    public router: Router, 
    public snackbarService:SnackbarService) { }

    canActivate(route:ActivatedRouteSnapshot):boolean{
      
      const token:any=localStorage.getItem('token');
      var tokenPayload:any;
      try{
        tokenPayload = jwt_decode(token);
      }
      catch(err){
        localStorage.clear();
        this.router.navigate(['/']);
      }

      if(this.auth.isAuthenticated())
       {
        return true;
       } 
      else{
        this.router.navigate(['/']);
        localStorage.clear();
        return false;
      }
    }
}
