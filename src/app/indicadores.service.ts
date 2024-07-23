import { Injectable } from '@angular/core';
import { Observable, forkJoin, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export interface Indicador {
  id: number;
  name: string;
  value: number;
  fecha: string;
}

export interface ApiResponse {
  Dolares?: { Valor: string; Fecha: string }[];
  UFs?: { Valor: string; Fecha: string }[];
  Euros?: { Valor: string; Fecha: string }[];
  IPCs?: { Valor: string; Fecha: string }[];
  UTMs?: { Valor: string; Fecha: string }[];
}

@Injectable({
  providedIn: 'root'
})
export class IndicadoresService {

  private apiKey = '8a639c4a94de5c79e64e6593b5a728bd6cf874b9';
  private baseUrl = 'https://api.sbif.cl/api-sbifv3/recursos_api';

  private dolarUrl: string;
  private ufUrl: string;
  private euroUrl: string;
  private ipcUrl: string;
  private utmUrl: string;

  constructor() {
    const currentDate = new Date();
    const pastDate = new Date(currentDate);
    pastDate.setDate(pastDate.getDate() - 30);

    const currentYear = currentDate.getFullYear();
    const currentMonth = String(currentDate.getMonth() + 1).padStart(2, '0');
    const currentDay = String(currentDate.getDate()).padStart(2, '0');

    const pastYear = pastDate.getFullYear();
    const pastMonth = String(pastDate.getMonth() + 1).padStart(2, '0');
    const pastDay = String(pastDate.getDate()).padStart(2, '0');

    this.dolarUrl = `${this.baseUrl}/dolar/periodo/${pastYear}/${pastMonth}/dias_i/${pastDay}/${currentYear}/${currentMonth}/dias_f/${currentDay}?apikey=${this.apiKey}&formato=json`;
    this.ufUrl = `${this.baseUrl}/uf/periodo/${pastYear}/${pastMonth}/dias_i/${pastDay}/${currentYear}/${currentMonth}/dias_f/${currentDay}?apikey=${this.apiKey}&formato=json`;
    this.euroUrl = `${this.baseUrl}/euro/periodo/${pastYear}/${pastMonth}/dias_i/${pastDay}/${currentYear}/${currentMonth}/dias_f/${currentDay}?apikey=${this.apiKey}&formato=json`;
    this.ipcUrl = `${this.baseUrl}/ipc/${currentYear}?apikey=${this.apiKey}&formato=json`;
    this.utmUrl = `${this.baseUrl}/utm/${currentYear}?apikey=${this.apiKey}&formato=json`;
  }

  private fetchData(url: string): Observable<ApiResponse> {
    return new Observable(observer => {
      fetch(url)
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then(data => {
          observer.next(data);
          observer.complete();
        })
        .catch(error => {
          observer.error(error);
        });
    });
  }

  getIndicators(): Observable<Indicador[]> {
    return forkJoin([
      this.fetchData(this.dolarUrl),
      this.fetchData(this.ufUrl),
      this.fetchData(this.euroUrl),
      this.fetchData(this.ipcUrl),
      this.fetchData(this.utmUrl)
    ]).pipe(
      map(([dolarResponse, ufResponse, euroResponse, ipcResponse, utmResponse]) => {

        const indicadores: Indicador[] = [];

        if (dolarResponse.Dolares) {
          dolarResponse.Dolares.forEach(item => {
            indicadores.push({
              id: 1,
              name: 'Dólar',
              value: parseFloat(item.Valor.replace(',', '.')),
              fecha: item.Fecha.replace(',', '.')
            });
          });
        }

        if (ufResponse.UFs) {
          ufResponse.UFs.forEach(item => {
            indicadores.push({
              id: 2,
              name: 'UF',
              value: parseFloat(item.Valor.replace(',', '.')),
              fecha: item.Fecha.replace(',', '.')
            });
          });
        }

        if (euroResponse.Euros) {
          euroResponse.Euros.forEach(item => {
            indicadores.push({
              id: 3,
              name: 'Euro',
              value: parseFloat(item.Valor.replace(',', '.')),
              fecha: item.Fecha.replace(',', '.')
            });
          });
        }

        if (ipcResponse.IPCs) {
          ipcResponse.IPCs.forEach(item => {
            indicadores.push({
              id: 4,
              name: 'IPC',
              value: parseFloat(item.Valor.replace(',', '.')),
              fecha: item.Fecha.replace(',', '.')
            });
          });
        }

        if (utmResponse.UTMs) {
          utmResponse.UTMs.forEach(item => {
            indicadores.push({
              id: 5,
              name: 'UTM',
              value: parseFloat(item.Valor.replace(',', '.')),
              fecha: item.Fecha.replace(',', '.')
            });
          });
        }

        return indicadores;
      }),
      catchError(error => {
        console.error('Error', error);
        return throwError(() => new Error('Error'));
      })
    );
  }

  getIndicator(id: number): Observable<Indicador> {
    return this.getIndicators().pipe(
      map(indicators => {
        const indicator = indicators.find(ind => ind.id === id);
        if (indicator) {
          return indicator;
        } else {
          throw new Error(`sin  ${id}`);
        }
      })
    );
  }
}
