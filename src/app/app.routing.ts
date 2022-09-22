import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { InitComponent } from './components/init/init.component';
import { LoginComponent } from './components/login/login.component';
import { AdminGuard } from './guards/admin.guard';
import { IndexClientComponent } from './components/client/index-client/index-client.component';
import { CreateClientComponent } from './components/client/create-client/create-client.component';
import { EditClientComponent } from './components/client/edit-client/edit-client.component';
import { CreateProductsComponent } from './components/products/create-products/create-products.component';
import { IndexProductsComponent } from './components/products/index-products/index-products.component';
import { EditProductComponent } from './components/products/edit-product/edit-product.component';
import { InventoryProductComponent } from './components/products/inventory-product/inventory-product.component';
import { ConfigComponent } from './components/config/config.component';
import { VariedadProductoComponent } from './components/products/variedad-producto/variedad-producto.component';
import { GaleryProductsComponent } from './components/products/galery-products/galery-products.component';
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
