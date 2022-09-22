import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AdminService } from '../services/admin.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(private adminService: AdminService, private router: Router) {}

  canActivate(): any {
    if (!this.adminService.isAuthenticate(['ADMIN_ROLE'])) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}
