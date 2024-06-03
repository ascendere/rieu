import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingObjetivesComponent } from './landing-objetives.component';

describe('LandingObjetivesComponent', () => {
  let component: LandingObjetivesComponent;
  let fixture: ComponentFixture<LandingObjetivesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LandingObjetivesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LandingObjetivesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
