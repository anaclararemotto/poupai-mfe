import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomeAccount } from './income-account';

describe('IncomeAccount', () => {
  let component: IncomeAccount;
  let fixture: ComponentFixture<IncomeAccount>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IncomeAccount]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IncomeAccount);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
