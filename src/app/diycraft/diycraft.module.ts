import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { FeedbackRoutingModule  } from './diycraft-routing.module';
import { LayoutComponent } from './layout.component';
import { DetailsComponent } from './details.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FeedbackRoutingModule ,
        FormsModule
    ],
    declarations: [
        LayoutComponent,
        DetailsComponent,
    ]
})
export class CraftModule { }