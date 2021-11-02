import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsumedFoodsComponent } from './consumed-foods.component';

describe('ConsumedFoodsComponent', () => {
  let component: ConsumedFoodsComponent;
  let fixture: ComponentFixture<ConsumedFoodsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsumedFoodsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsumedFoodsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
