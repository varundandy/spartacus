import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { I18nTestingModule } from '@spartacus/core';
import { Budget } from '@spartacus/my-account/organization/core';
import { UrlTestingModule } from 'projects/core/src/routing/configurable-routes/url-translation/testing/url-testing.module';
import { of } from 'rxjs';
import { OrganizationCardTestingModule } from '../../shared/organization-card/organization-card.testing.module';
import { OrganizationItemService } from '../../shared/organization-item.service';
import { OrganizationMessageTestingModule } from '../../shared/organization-message/organization-message.testing.module';
import { CurrentBudgetService } from '../services/current-budget.service';
import { BudgetDetailsComponent } from './budget-details.component';
import createSpy = jasmine.createSpy;

const budgetCode = 'b1';

class MockBudgetItemService implements Partial<CurrentBudgetService> {
  key$ = of(budgetCode);
  load = createSpy('load').and.returnValue(of());
}

@Component({
  selector: 'cx-budget-cost-center-list',
  template: '',
})
export class MockBudgetCostCenterListComponent {}

describe('BudgetDetailsComponent', () => {
  let component: BudgetDetailsComponent;
  let fixture: ComponentFixture<BudgetDetailsComponent>;
  let budgetService: OrganizationItemService<Budget>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        RouterTestingModule,
        I18nTestingModule,
        UrlTestingModule,
        OrganizationCardTestingModule,
        OrganizationMessageTestingModule,
      ],
      declarations: [BudgetDetailsComponent, MockBudgetCostCenterListComponent],
      providers: [
        { provide: OrganizationItemService, useClass: MockBudgetItemService },
      ],
    }).compileComponents();

    budgetService = TestBed.inject(OrganizationItemService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BudgetDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should trigger reload of cost center model on each code change', () => {
    expect(budgetService.load).toHaveBeenCalledWith(budgetCode);
  });
});