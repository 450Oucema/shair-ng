import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FichierFormComponent } from './fichier-form.component';

describe('FichierFormComponent', () => {
  let component: FichierFormComponent;
  let fixture: ComponentFixture<FichierFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FichierFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FichierFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
