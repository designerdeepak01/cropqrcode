import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CropQRComponent } from './crop-qr.component';

describe('CropQRComponent', () => {
  let component: CropQRComponent;
  let fixture: ComponentFixture<CropQRComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CropQRComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CropQRComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
