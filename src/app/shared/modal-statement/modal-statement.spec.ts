import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalStatement } from './modal-statement';

describe('ModalStatement', () => {
  let component: ModalStatement;
  let fixture: ComponentFixture<ModalStatement>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalStatement]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalStatement);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
