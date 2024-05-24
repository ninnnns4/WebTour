import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { ScavengerService } from '@app/_services';
import { Scavenger } from '@app/_models';

@Component({ templateUrl: 'list.component.html' })
export class ListComponent implements OnInit {
    scavengers: any[];

    constructor(private scavengerService: ScavengerService) {}

    ngOnInit() {
        this.scavengerService.getAllScavengers()
            .pipe(first())
            .subscribe(scavengers => this.scavengers = scavengers);
    }
    
    deleteScavenger(id: string) {
        const scavenger = this.scavengers.find(x => x.id === id);
        scavenger.isDeleting = true;
        this.scavengerService.deleteScavenger(id)
            .pipe(first())
            .subscribe(() => {
                this.scavengers = this.scavengers.filter(x => x.id !== id) 
            });
    }
    
}