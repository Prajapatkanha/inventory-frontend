import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes'; // ✅ Ensure you have this file
import { importProvidersFrom } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes), // ✅ Using Standalone Routing
    importProvidersFrom(FormsModule, HttpClientModule) // ✅ Required Modules
  ]
}).catch(err => console.error(err));
