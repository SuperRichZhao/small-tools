import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
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
        redirectTo: 'calc'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
