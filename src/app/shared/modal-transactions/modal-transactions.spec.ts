import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalTransactions } from './modal-transactions';

describe('ModalTransactions', () => {
  let component: ModalTransactions;
  let fixture: ComponentFixture<ModalTransactions>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalTransactions]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalTransactions);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
