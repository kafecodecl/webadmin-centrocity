import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { routing } from './app.routing';
import { InitComponent } from './components/init/init.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './components/login/login.component';
import { IndexClientComponent } from './components/client/index-client/index-client.component';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { CreateClientComponent } from './components/client/create-client/create-client.component';
import { EditClientComponent } from './components/client/edit-client/edit-client.component';
import { CreateProductsComponent } from './components/products/create-products/create-products.component';

import { NgxTinymceModule } from 'ngx-tinymce';
import { IndexProductsComponent } from './components/products/index-products/index-products.component';
import { EditProductComponent } from './components/products/edit-product/edit-product.component';
import { InventoryProductComponent } from './components/products/inventory-product/inventory-product.component';
import { ConfigComponent } from './components/config/config.component';
import { VariedadProductoComponent } from './components/products/variedad-producto/variedad-producto.component';
import { GaleryProductsComponent } from './components/products/galery-products/galery-products.component';
import { IndexDepartamentosComponent } from './components/departamentos/index-departamentos/index-departamentos.component';
import { UpdateDepartamentoComponent } from './components/departamentos/update-departamento/update-departamento.component';
import { CreateDepartamentoComponent } from './components/departamentos/create-departamento/create-departamento.component';
import { GaleriaDepartamentoComponent } from './components/departamentos/galeria-departamento/galeria-departamento.component';

@NgModule({
  declarations: [
    AppComponent,
    InitComponent,
    SidebarComponent,
    HeaderComponent,
    LoginComponent,
    IndexClientComponent,
    CreateClientComponent,
    EditClientComponent,
    CreateProductsComponent,
    IndexProductsComponent,
    EditProductComponent,
    InventoryProductComponent,
    ConfigComponent,
    VariedadProductoComponent,
    GaleryProductsComponent,
    IndexDepartamentosComponent,
    UpdateDepartamentoComponent,
    CreateDepartamentoComponent,
    GaleriaDepartamentoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    routing,
    NgbPaginationModule,
    NgxTinymceModule.forRoot({
      baseURL: '../../assets/tinymce/',
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
