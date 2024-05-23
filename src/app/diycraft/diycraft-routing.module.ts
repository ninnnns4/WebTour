import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//import { ListComponent } from './list.component';
import { DetailsComponent } from './details.component';

const routes: Routes = [
    { path: '', component: DetailsComponent }
    //{ path: 'add', component: DetailsComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class FeedbackRoutingModule { }