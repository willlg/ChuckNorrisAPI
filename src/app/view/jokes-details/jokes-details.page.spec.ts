import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JokesDetailsPage } from './jokes-details.page';

describe('JokesDetailsPage', () => {
  let component: JokesDetailsPage;
  let fixture: ComponentFixture<JokesDetailsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(JokesDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
