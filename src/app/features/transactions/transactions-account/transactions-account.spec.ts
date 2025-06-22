import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionsAccount } from './transactions-account';

describe('TransactionsAccount', () => {
  let component: TransactionsAccount;
  let fixture: ComponentFixture<TransactionsAccount>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransactionsAccount]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransactionsAccount);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
