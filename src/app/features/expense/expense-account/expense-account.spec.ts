import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenseAccount } from './expense-account';

describe('ExpenseAccount', () => {
  let component: ExpenseAccount;
  let fixture: ComponentFixture<ExpenseAccount>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpenseAccount]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpenseAccount);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
