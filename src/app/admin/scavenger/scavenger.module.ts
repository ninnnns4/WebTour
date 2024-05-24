import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ScavengerRoutingModule } from './scavenger-routing.module';
import { ListComponent } from './list.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        ScavengerRoutingModule,
        FormsModule
    ],
    declarations: [
        ListComponent,
    ]
})
export class ScavengerModule { }