import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { LegendService } from '@app/_services';
import { Legend } from '@app/_models';

@Component({
    templateUrl: 'list.component.html'
})
export class ListComponent implements OnInit {
    title: string;
    legends: Legend[] = [];
    newLegend: Legend = { 
        id: 0, 
        picture: '', 
        title: '', 
        description: '', 
        date: new Date(2024, 4, 23), 
        editing: false, 
        editTitle: '', 
        editDescription: '', 
        editDate: new Date(2024, 4, 23) 
    };
    showAdd: boolean = false;
    errorMessage: string;

    constructor(private legendService: LegendService) { }

    ngOnInit() {
        this.loadAllLegends();
    }

    loadAllLegends() {
        this.legendService.getAll()
            .pipe(first())
            .subscribe(
                legends => {
                    this.legends = legends.map(legend => ({ 
                        ...legend, 
                        editing: false, 
                        editTitle: legend.title, 
                        editDescription: legend.description, 
                        editDate: new Date(legend.date) 
                    }));
                },
                error => {
                    this.errorMessage = 'Error fetching traditions';
                }
            );
    }

    showAddForm() {
        this.showAdd = true;
    }

    cancelAdd() {
        this.showAdd = false;
        this.newLegend = { 
            id: 0, 
            picture: '', 
            title: '', 
            description: '', 
            date: new Date(), 
            editing: false, 
            editTitle: '', 
            editDescription: '', 
            editDate: new Date() 
        };
    }

    addLegend() {
        const { picture, title, description, date } = this.newLegend;
    
        if (!picture || !title || !description || !date) {
            console.error('Please fill in all fields');
            return;
        }
    
        this.legendService.addLegend(title, description, picture, date).subscribe(
            (response) => {
                console.log('Legend added successfully:', response);
                this.loadAllLegends(); // Reload the list of traditions after adding a new one
                this.cancelAdd(); // Clear the form after adding
            },
            (error) => {
                console.error('Error adding tradition:', error);
                this.errorMessage = 'Error adding tradition';
            }
        );
    }

    editLegend(legend: Legend) {
        this.legends = this.legends.map(t => t.id === legend.id ? { ...t, editing: true } : t);
    }

    saveLegend(legend: Legend) {
        const { editTitle, editDescription, editDate } = legend;
        if (!editTitle || !editDescription || !editDate) {
            console.error('Please fill in all fields');
            return;
        }
    
        // Create an object with the updated tradition data
        const updatedLegend = {
            title: editTitle,
            description: editDescription,
            date: editDate
        };
    
        console.log('Updating legend with data:', updatedLegend);
    
        this.legendService.update(legend.id, updatedLegend).subscribe(
            (response) => {
                console.log('Legend updated successfully:', response);
                this.loadAllLegends(); // Reload the list of traditions after updating
            },
            (error) => {
                console.error('Error updating tradition:', error);
            }
        );
    
        legend.editing = false; // Set editing back to false after saving
    }

    cancelEdit(legend: Legend) {
        this.legends = this.legends.map(t => t.id === legend.id ? { ...t, editing: false, editTitle: t.title, editDescription: t.description, editDate: new Date(t.date) } : t);
    }

    deleteLegend(legend: Legend) {
        if (confirm(`Are you sure you want to delete ${legend.title}?`)) {
            this.legendService.delete(legend.id)
                .pipe(first())
                .subscribe(
                    () => {
                        this.legends = this.legends.filter(t => t.id !== legend.id);
                        console.log(`${legend.title} has been deleted.`);
                    },
                    error => {
                        console.log('Error deleting tradition:', error);
                        this.errorMessage = 'Error deleting tradition';
                    }
                );
        }
    }

    
    updateLegend(legend: Legend) {
        this.legendService.update(legend.id, legend)
            .subscribe(
                () => {
                    console.log('Tradition updated successfully');
                    // Reload the list of traditions after updating
                    this.loadAllLegends();
                },
                (error) => {
                    console.error('Error updating tradition:', error);
                    // Handle the error as needed
                }
            );
    }
}
