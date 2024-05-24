import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';

import { ScavengerService, AlertService } from '@app/_services';
import { Scavenger } from '@app/_models'; // Assuming Event model is defined in _models folder

@Component({
  selector: 'app-details',
  templateUrl: 'details.component.html'
})
export class DetailsComponent implements OnInit {
  form: FormGroup;
  loading = false;
  submitted = false;
  isAddMode = true;
  selectedFile: File | null = null;
  scavengers: Scavenger[] = []; // Array to hold all events
  imageName: string = '';
  showTable: boolean = true;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private scavengerService: ScavengerService,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      lugar: ['', Validators.required],
      image: ['']
    });

    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isAddMode = false;
        this.loadScavenger(params['id']);
      }
    });

    // Load all events when component initializes
    this.loadAllScavengers();
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.imageName = file.name; // Update imageName with the selected file's name
    }
  }

  // Convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  onSubmit() {
    this.submitted = true;

    this.alertService.clear();

    if (this.form.invalid) {
      return;
    }

    this.loading = true;
    const formData = new FormData();
    formData.append('name', this.form.get('name')?.value);
    formData.append('lugar', this.form.get('lugar')?.value);
    if (this.selectedFile) {
      formData.append('image', this.selectedFile, this.selectedFile.name);
    }

    const request = this.isAddMode
      ? this.scavengerService.create(formData)
      : this.scavengerService.update(this.route.snapshot.params['id'], formData);

    request.pipe(first())
      .subscribe({
        next: () => {
          this.alertService.success('Scavenger saved successfully', { keepAfterRouteChange: true });
          this.router.navigate(['/photoscavenger']);
        },
        error: error => {
          this.alertService.error(error);
          this.loading = false;
        }
      });
  }

  private loadScavenger(id: string) {
    this.scavengerService.getById(id)
      .pipe(first())
      .subscribe(scavenger => {
        this.form.patchValue(scavenger);
      });
  }

  private loadAllScavengers() {
    this.scavengerService.getAllScavengers()
      .pipe(first())
      .subscribe(scavengers => {
        this.scavengers = scavengers;
      });
  }
}
