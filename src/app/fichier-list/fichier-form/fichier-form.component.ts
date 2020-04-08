import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Fichier} from '../../models/fichier.model';
import {Router} from '@angular/router';
import {FichierService} from '../../services/fichier.service';

@Component({
  selector: 'app-fichier-form',
  templateUrl: './fichier-form.component.html',
  styleUrls: ['./fichier-form.component.css']
})
export class FichierFormComponent implements OnInit {

  fichierForm: FormGroup;
  fileIsUploading = false;
  fileUrl: string;
  fileUploaded = false;

  constructor(private formBuilder: FormBuilder,
              private fichierService: FichierService,
              private router: Router) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.fichierForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  onSaveFichier() {
    const title = this.fichierForm.get('title').value;
    const description = this.fichierForm.get('description').value;
    const newFichier = new Fichier(title, description, this.fileUrl);
    this.fichierService.createNewFichier(newFichier);

    this.router.navigate(['/fichiers']);
  }

  onUploadedFile(file: File) {
    this.fileIsUploading = true;
    this.fichierService.uploadFile(file).then(
      (url: string) => {
        this.fileUrl = url;
        this.fileIsUploading = false;
        this.fileUploaded = true;
      }
    );
  }

  detectFile(files: FileList) {
    this.onUploadedFile(files.item(0));
  }
}
