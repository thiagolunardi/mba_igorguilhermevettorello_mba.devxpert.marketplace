import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter } from 'rxjs/operators';
import { BreadcrumbViewModel } from '../../viewmodels/breadcrumb/breadcrumb.viewmodel';

@Component({
  selector: 'app-breadcrumb',
  imports: [CommonModule, RouterLink],
  templateUrl: './breadcrumb.html',
  styles: ``
})
export class Breadcrumb {
  breadcrumbs: BreadcrumbViewModel[] = [];

  constructor(private router: Router, private route: ActivatedRoute) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.breadcrumbs = this.construirBreadcrumb(this.route.root);
    });
  }

  private construirBreadcrumb(
    route: ActivatedRoute,
    url: string = '',
    breadcrumbs: BreadcrumbViewModel[] = []
  ): BreadcrumbViewModel[] {
    const rotasFilhas = route.children;

    if (rotasFilhas.length === 0) {
      return [{ titulo: 'Home', url: '/' }, ...breadcrumbs];
    }

    for (const rotaFilha of rotasFilhas) {
      const routeURL = rotaFilha.snapshot.url.map(segment => segment.path).join('/');

      if (routeURL) {
        url += `/${routeURL}`;
      }

      const titulo = rotaFilha.snapshot.data['breadcrumb'];

      if (titulo) {
        breadcrumbs.push({ titulo: titulo, url });
      }

      return this.construirBreadcrumb(rotaFilha, url, breadcrumbs);
    }

    return breadcrumbs;
  }

}
