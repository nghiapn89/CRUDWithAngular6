import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './Components/header/header.component';
import { FooterComponent } from './Components/footer/footer.component';
import { MenuComponent } from './Components/menu/menu.component';
import { ContentComponent } from './Components/content/content.component';
import { ProductComponent } from './Pages/product/product.component';
import { ProductService } from '../app/services/product.service';

import { FormGroup, FormControl, FormBuilder, Validators, FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { DataTableModule, SharedModule, ButtonModule, DialogModule } from 'primeng/primeng';
import { HttpClientModule } from '@angular/common/http';
import { AppGlobals } from './shared/app.global';

const appRoutes: Routes = [
  { path: 'app-product', component: ProductComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MenuComponent,
    ContentComponent,
    ProductComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule ,
    DataTableModule, SharedModule, ButtonModule, DialogModule,
    RouterModule.forRoot(
      appRoutes,
      // { enableTracing: true }
      // { path: 'app-product', component: ProductComponent }
      )
  ],
  providers: [ProductService, AppGlobals],
  bootstrap: [AppComponent]
})
export class AppModule {
}
