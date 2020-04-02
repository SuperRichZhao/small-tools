import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'calc',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../../routes/calc/calc.module').then(m => m.CalcPageModule)
          }
        ]
      },
      {
        path: 'choice',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../../routes/choice/choice.module').then(m => m.ChoicePageModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/calc',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/calc'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
