import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageProductImageComponent } from './manage-product-image.component';

describe('ManageProductImageComponent', () => {
  let component: ManageProductImageComponent;
  let fixture: ComponentFixture<ManageProductImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageProductImageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageProductImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
