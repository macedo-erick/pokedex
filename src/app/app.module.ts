import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './pages/home/home.component';
import { DetailsComponent } from './pages/details/details.component';
import { PokemonCardComponent } from './components/pokemon-card/pokemon-card.component';
import { StatsCardComponent } from './components/stats-card/stats-card.component';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatRippleModule } from '@angular/material/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ProgressBarComponent } from './components/progress-bar/progress-bar.component';
import { AboutCardComponent } from './components/about-card/about-card.component';
import { CardComponent } from './components/card/card.component';
import { FormatTextPipe } from './pipes/format-text/format-text.pipe';
import { FormatValuePipe } from './pipes/format-value/format-value.pipe';
import { EvolutionCardComponent } from './components/evolution-card/evolution-card.component';
import { PokemonComponent } from './components/pokemon/pokemon.component';
import { FormatIdPipe } from './pipes/format-id/format-id.pipe';
import { VarietiesComponent } from './components/varieties/varieties.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { OverlayModule } from '@angular/cdk/overlay';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NotFoundComponent } from './pages/not-found/not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DetailsComponent,
    PokemonCardComponent,
    StatsCardComponent,
    ProgressBarComponent,
    AboutCardComponent,
    CardComponent,
    FormatTextPipe,
    FormatValuePipe,
    EvolutionCardComponent,
    PokemonComponent,
    FormatIdPipe,
    VarietiesComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatSnackBarModule,
    MatRippleModule,
    MatProgressBarModule,
    RouterModule,
    MatSelectModule,
    MatFormFieldModule,
    OverlayModule,
    FormsModule,
    ReactiveFormsModule
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
