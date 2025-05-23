import { TestBed } from '@angular/core/testing';
import { NavbarComponent } from './navbar.component';
import { provideExperimentalZonelessChangeDetection } from '@angular/core';

describe('NavbarComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarComponent],
      providers: [provideExperimentalZonelessChangeDetection()],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(NavbarComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it(`should render the 'branch-from-task' title`, async () => {
    const fixture = TestBed.createComponent(NavbarComponent);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('span')?.textContent).toEqual(
      'branch from task',
    );
  });

  it('should render a link to GitHub respository', async () => {
    const fixture = TestBed.createComponent(NavbarComponent);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('a')?.href).toEqual(
      'https://github.com/mathisvester/branch-from-task',
    );
  });
});
