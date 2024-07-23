import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaIndicadoresComponent } from './lista-indicadores/lista-indicadores.component';
import { ListaDetallesComponent } from './lista-detalles/lista-detalles.component';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { UniquePipe } from './pipes/datosUnicos.pipe';
import { GraficoIndicadoresComponent } from './grafico-indicadores/grafico-indicadores.component';
import { HighchartsChartModule } from 'highcharts-angular';


export const routes: Routes = [
  { path: '', component: ListaIndicadoresComponent },
  { path: 'indicador/:id', component: ListaDetallesComponent },
  { path: 'grafico/:id', component: GraficoIndicadoresComponent } 
];

@NgModule({
    declarations: [
      ListaIndicadoresComponent,
      ListaDetallesComponent,
      GraficoIndicadoresComponent,
      UniquePipe 
    ],
    imports: [
      BrowserModule,
      RouterModule.forRoot(routes), // Importa RouterModule y configura las rutas
      HighchartsChartModule
    ],
    providers: [],
    bootstrap: [AppComponent]
  })
  export class AppModule { }