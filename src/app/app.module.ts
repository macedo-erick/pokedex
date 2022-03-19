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
import { PokemonDTO, SpecieDTO, TypesDTO } from './models/models';
import { MatRippleModule } from '@angular/material/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ProgressBarComponent } from './components/progress-bar/progress-bar.component';
import { AboutCardComponent } from './components/about-card/about-card.component';
import { CardComponent } from './components/card/card.component';
import { FormatDescriptionPipe } from './pipes/format-description.pipe';

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
    FormatDescriptionPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatSnackBarModule,
    MatRippleModule,
    MatProgressBarModule,
    RouterModule
  ],
  providers: [PokemonDTO, SpecieDTO, TypesDTO],
  bootstrap: [AppComponent],
})
export class AppModule {}
