import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { ListaDetallesComponent } from './lista-detalles.component';
import { IndicadoresService, Indicador } from '../indicadores.service';

describe('ListaDetallesComponent', () => {
  let component: ListaDetallesComponent;
  let fixture: ComponentFixture<ListaDetallesComponent>;
  let mockIndicadoresService: jasmine.SpyObj<IndicadoresService>;
  let mockActivatedRoute: any;

  beforeEach(async () => {
    const indicadoresServiceSpy = jasmine.createSpyObj('IndicadoresService', ['getIndicators']);
    const mockIndicators: Indicador[] = [
      {
        id: 1, name: 'Indicator 1',
        value: 0,
        fecha: ''
      },
      {
        id: 2, name: 'Indicator 2',
        value: 0,
        fecha: ''
      }
    ];
    indicadoresServiceSpy.getIndicators.and.returnValue(of(mockIndicators));

    mockActivatedRoute = {
      snapshot: {
        paramMap: {
          get: (key: string) => key === 'id' ? '1' : null
        }
      }
    };

    await TestBed.configureTestingModule({
      declarations: [ ListaDetallesComponent ],
      providers: [
        { provide: IndicadoresService, useValue: indicadoresServiceSpy },
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaDetallesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });



  it('should filter indicators based on route parameter', () => {
    component.ngOnInit();
    fixture.detectChanges();

    expect(component.filteredIndicators.length).toBe(1);
    expect(component.filteredIndicators[0].name).toBe('Indicator 1');
  });

  it('should handle missing route parameter', () => {
    mockActivatedRoute.snapshot.paramMap.get = () => null;

    fixture = TestBed.createComponent(ListaDetallesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    component.ngOnInit();
    fixture.detectChanges();

    expect(component.filteredIndicators.length).toBe(0);
  });
});
