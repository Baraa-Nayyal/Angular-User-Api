import { provideHttpClient } from '@angular/common/http';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { provideStore, StoreModule } from '@ngrx/store';
import { userReducer } from './app/store/user/user.reducer';
import { EffectsModule, provideEffects } from '@ngrx/effects';
import { UserEffects } from './app/store/user/user.effects';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideStore({ user: userReducer }),
    provideEffects([UserEffects]),
    provideAnimationsAsync(),
    provideAnimations(),
  ],
}).catch((err) => console.error(err));
