import { TestBed } from '@angular/core/testing';
import { IndicadoresService, Indicador } from './indicadores.service';
import { of, throwError } from 'rxjs';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('IndicadoresService', () => {
  let service: IndicadoresService;
  let httpMock: HttpTestingController;

  const mockIndicators: Indicador[] = [
    { id: 1, name: 'Dólar', value: 1000, fecha: '2024-07-01' },
    { id: 2, name: 'UF', value: 30, fecha: '2024-07-01' },
    { id: 3, name: 'Euro', value: 900, fecha: '2024-07-01' }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [IndicadoresService]
    });

    service = TestBed.inject(IndicadoresService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return a single Indicador by ID', () => {
    spyOn(service, 'getIndicators').and.returnValue(of(mockIndicators));

    service.getIndicator(1).subscribe(indicator => {
      // Ensure that expectedIndicator is defined
      const expectedIndicator = mockIndicators.find(ind => ind.id === 1);
      expect(expectedIndicator).toBeDefined();
      if (expectedIndicator) {
        expect(indicator).toEqual(expectedIndicator);
      }
    });
  });

});
