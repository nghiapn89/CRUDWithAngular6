import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterModule} from '@angular/router';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './Components/header/header.component';
import { FooterComponent } from './Components/footer/footer.component';
import { MenuComponent } from './Components/menu/menu.component';
import { ContentComponent } from './Components/content/content.component';
import { ProductComponent } from './Pages/product/product.component';
import { ProductService } from '../app/services/product.service';

import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { DataTableModule, SharedModule, ButtonModule, DialogModule } from 'primeng/primeng';
import { HttpClientModule } from '@angular/common/http';
import { AppGlobals } from './shared/app.global';

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
    DataTableModule, SharedModule, ButtonModule, DialogModule,
    RouterModule.forRoot([
      { path: 'app-product', component: ProductComponent }
   ])
  ],
  providers: [ProductService, AppGlobals],
  bootstrap: [AppComponent]
})
export class AppModule {
}
