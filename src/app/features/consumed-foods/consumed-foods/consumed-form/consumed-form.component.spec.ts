import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsumedFormComponent } from './consumed-form.component';

describe('ConsumedFormComponent', () => {
  let component: ConsumedFormComponent;
  let fixture: ComponentFixture<ConsumedFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsumedFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsumedFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
