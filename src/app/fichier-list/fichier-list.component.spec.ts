import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FichierListComponent } from './fichier-list.component';

describe('FichierListComponent', () => {
  let component: FichierListComponent;
  let fixture: ComponentFixture<FichierListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FichierListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FichierListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
