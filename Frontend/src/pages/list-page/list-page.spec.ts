import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';

import { ListPage } from './list-page';

describe('ListPage', () => {
  let component: ListPage;
  let fixture: ComponentFixture<ListPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListPage, CommonModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ListPage);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
