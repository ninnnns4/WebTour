import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { LegendRoutingModule } from './legend-routing.module';
import { ListComponent } from './list.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        LegendRoutingModule,
        FormsModule
    ],
    declarations: [
        ListComponent,
    ]
})
export class LegendModule { }