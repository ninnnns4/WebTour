import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SubNavComponent } from './subnav.component';
import { LayoutComponent } from './layout.component';
import { OverviewComponent } from './overview.component';

const accountsModule = () => import('./accounts/accounts.module').then(x => x.AccountsModule);
const explorerModule = () => import('./explorer/explorer.module').then(x => x.ExplorerModule);
const traditionModule = () => import('./tradition/tradition.module').then(x => x.TraditionModule);
const scavengerModule = () => import('./scavenger/scavenger.module').then(x => x.ScavengerModule);

const routes: Routes = [
    { path: '', component: SubNavComponent, outlet: 'subnav' },
    {
        path: '', component: LayoutComponent,
        children: [
            { path: '', component: OverviewComponent },
            { path: 'accounts', loadChildren: accountsModule },
            { path: 'explorer', loadChildren: explorerModule },
            { path: 'tradition', loadChildren: traditionModule },
            { path: 'scavenger', loadChildren: scavengerModule },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule { }