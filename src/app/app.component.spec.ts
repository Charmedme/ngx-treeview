import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { I18n } from './i18n';

describe('AppComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      providers: [I18n]
    });

    TestBed.overrideComponent(AppComponent, {
      set: { template: '' }
    });
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(AppComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });
});
