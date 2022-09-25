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
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';

import { NgxTinymceModule } from 'ngx-tinymce';
import { IndexDepartamentosComponent } from './components/departamentos/index-departamentos/index-departamentos.component';
import { UpdateDepartamentoComponent } from './components/departamentos/update-departamento/update-departamento.component';
import { CreateDepartamentoComponent } from './components/departamentos/create-departamento/create-departamento.component';
import { GaleriaDepartamentoComponent } from './components/departamentos/galeria-departamento/galeria-departamento.component';
import { CurrencyMoneyPipe } from './pipes/currency-money.pipe';

@NgModule({
  declarations: [
    AppComponent,
    InitComponent,
    SidebarComponent,
    HeaderComponent,
    LoginComponent,
    IndexDepartamentosComponent,
    UpdateDepartamentoComponent,
    CreateDepartamentoComponent,
    GaleriaDepartamentoComponent,
    CurrencyMoneyPipe,
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
