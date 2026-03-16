import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'board',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'board/:id',
    renderMode: RenderMode.Client
  },
  {
    path: 'listDetail/:id',
    renderMode: RenderMode.Client
  },
  {
    path: 'login',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'register',
    renderMode: RenderMode.Prerender
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
