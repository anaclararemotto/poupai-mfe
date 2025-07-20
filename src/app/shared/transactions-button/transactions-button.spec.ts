import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionsButton } from './transactions-button';

describe('TransactionsButton', () => {
  let component: TransactionsButton;
  let fixture: ComponentFixture<TransactionsButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransactionsButton]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransactionsButton);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
