import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingMiembrosComponent } from './landing-miembros.component';

describe('LandingMiembrosComponent', () => {
  let component: LandingMiembrosComponent;
  let fixture: ComponentFixture<LandingMiembrosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LandingMiembrosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LandingMiembrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
