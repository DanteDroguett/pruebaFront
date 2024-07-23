// lista-detalles.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IndicadoresService, Indicador } from '../indicadores.service';

@Component({
  selector: 'app-lista-detalles',
  templateUrl: './lista-detalles.component.html',
  styleUrls: ['./lista-detalles.component.css']
})
export class ListaDetallesComponent implements OnInit {
  indicators: Indicador[] = [];
  filteredIndicators: Indicador[] = [];

  constructor(
    private route: ActivatedRoute,
    private indicatorService: IndicadoresService
  ) { }

  ngOnInit(): void {
    this.indicatorService.getIndicators().subscribe(indicators => {
      this.indicators = indicators;
      this.filterIndicators();
    });
  }

  filterIndicators(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      const id = +idParam;
      this.filteredIndicators = this.indicators.filter(indicator => indicator.id === id);
    } else {
      console.error('No ID parameter found in route.');
    }
  }
}
