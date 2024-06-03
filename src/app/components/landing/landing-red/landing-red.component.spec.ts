import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingREDComponent } from './landing-red.component';

describe('LandingREDComponent', () => {
  let component: LandingREDComponent;
  let fixture: ComponentFixture<LandingREDComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LandingREDComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LandingREDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
