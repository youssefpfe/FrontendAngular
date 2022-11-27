import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { AuthService } from './auth/auth.service';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class FrontGuard implements CanActivate {
  constructor(public authService: AuthService, public router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.authService.isServiceIn && !this.authService.isPaymentIn && !this.authService.isConsultantIn && !this.authService.isAcceuilIn && !this.authService.isPriseIn && !this.authService.isAttentIn) {
      Swal.fire('Autorisation Requise!', 'Désolé, vous n’êtes pas autorisé à accéder à cette page ', 'error')

      this.router.navigate(['login']);
    }
    return true;
  }
}
