// grafico-indicadores.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as Highcharts from 'highcharts';
import { IndicadoresService, Indicador } from '../indicadores.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-grafico-indicadores',
  templateUrl: './grafico-indicadores.component.html',
  styleUrls: ['./grafico-indicadores.component.css']
})
export class GraficoIndicadoresComponent implements OnInit {
  indicadores: Indicador[] = [];
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {};
  filteredIndicators: Indicador[] = [];
  lastDay: any;
  constructor(
    private route: ActivatedRoute,
    private indicadoresService: IndicadoresService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.indicadoresService.getIndicators().subscribe(indicators => {
      this.indicadores = indicators;
      this.filterIndicators();

    });
  }

  filterIndicators(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      const id = +idParam;
      this.filteredIndicators = this.indicadores.filter(indicator => indicator.id === id);
      var recentIndicators;
      this.lastDay = this.filteredIndicators[this.filteredIndicators.length - 1];
      // Solo toma los últimos 10 valores en caso de ser dolar, uf o euro
      if (idParam == '1' || idParam == '2' || idParam == '3') {
        recentIndicators = this.filteredIndicators.slice(-10);
      } else {
        recentIndicators = this.filteredIndicators;
      }

      if (recentIndicators.length > 0) {
        this.chartOptions = {
          title: {
            text: ``
          },
          xAxis: {
            categories: recentIndicators.map(indicador => indicador.fecha)
          },
          yAxis: {
            title: {
              text: 'Valor'
            }
          },
          series: [{
            name: recentIndicators[0].name,
            data: recentIndicators.map(indicador => indicador.value),
            type: 'line'
          }]
        };
      }
    } else {
      console.error('No ID parameter found in route.');
    }
  }
}
