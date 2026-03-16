import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCard } from './list-card';
import { ListModel } from '../../../models/ListModel/list-model';

describe('ListCard', () => {
  let component: ListCard;
  let fixture: ComponentFixture<ListCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListCard],
    }).compileComponents();

    fixture = TestBed.createComponent(ListCard);
    component = fixture.componentInstance;
    component.list = { id: 1, title: 'Test List', position: 1, boarId: 1 };
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
