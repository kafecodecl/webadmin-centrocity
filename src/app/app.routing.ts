import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { InitComponent } from './components/init/init.component';
import { LoginComponent } from './components/login/login.component';
import { AdminGuard } from './guards/admin.guard';
import { IndexDepartamentosComponent } from './components/departamentos/index-departamentos/index-departamentos.component';
import { CreateDepartamentoComponent } from './components/departamentos/create-departamento/create-departamento.component';
import { UpdateDepartamentoComponent } from './components/departamentos/update-departamento/update-departamento.component';
import { GaleriaDepartamentoComponent } from './components/departamentos/galeria-departamento/galeria-departamento.component';

const appRoute: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: InitComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'departamentos',
    children: [
      {
        path: 'index',
        component: IndexDepartamentosComponent,
        canActivate: [AdminGuard],
      },
      {
        path: 'crear-departamento',
        component: CreateDepartamentoComponent,
        canActivate: [AdminGuard],
      },
      {
        path: 'editar-departamento/:id',
        component: UpdateDepartamentoComponent,
        canActivate: [AdminGuard],
      },
      {
        path: 'galeria-departamento/:id',
        component: GaleriaDepartamentoComponent,
        canActivate: [AdminGuard],
      },
    ],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoute);
