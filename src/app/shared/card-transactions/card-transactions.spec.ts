import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardTransactions } from './card-transactions';

describe('CardTransactions', () => {
  let component: CardTransactions;
  let fixture: ComponentFixture<CardTransactions>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardTransactions]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardTransactions);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
