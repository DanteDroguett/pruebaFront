import { Component, OnInit } from '@angular/core';
import { IndicadoresService, Indicador } from '../indicadores.service';

@Component({
  selector: 'app-lista-indicadores',
  templateUrl: './lista-indicadores.component.html',
  styleUrls: ['./lista-indicadores.component.css']
})
export class ListaIndicadoresComponent implements OnInit {

  indicators: Indicador[] = [];

  constructor(private indicatorService: IndicadoresService) { }

  ngOnInit(): void {
    this.indicatorService.getIndicators().subscribe(indicators => {
      this.indicators = indicators;
    });
  }
}
