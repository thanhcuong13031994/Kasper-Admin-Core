import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable, map, take } from "rxjs";
import { AuthService } from "./auth.service";
@Injectable({
  providedIn: "root"
})

export class AuthGuardService implements CanActivate{
  constructor(
    private auth: AuthService,
    private router: Router
  ){}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    const s = this.auth.getCurrentUser().pipe(
      take(1),
      map(user => {
        if(user) {
          return true;
        }
        const backUrl = (<any>route)._routerState.url;
        const loginUrlTree = this.router.createUrlTree(['/auth/login', {returnRouter: backUrl}]);
        return loginUrlTree;
      })
    );
    return s;
  }
}
