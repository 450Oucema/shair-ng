import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Fichier} from '../../models/fichier.model';
import {Router} from '@angular/router';
import {FichierService} from '../../services/fichier.service';
import {v4 as uuidv4} from 'uuid';
import {TypeService} from '../../services/type.service';
import {Type} from '../../models/type.model';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-fichier-form',
  templateUrl: './fichier-form.component.html',
  styleUrls: ['./fichier-form.component.css']
})
export class FichierFormComponent implements OnInit {

  userSubscription: Subscription;
  fichierForm: FormGroup;
  fileIsUploading = false;
  fileUrl: string;
  fileUploaded = false;
  fileName: string;
  fileUuid = uuidv4();
  fileExt: string;
  fileType: Type;
  fileUnrecognized = false;
  types: Type[];
  selectedType: any;
  today = new Date().toISOString();
  fileExpiration: any;
  users: Array<any>;

  constructor(private formBuilder: FormBuilder,
              private fichierService: FichierService,
              private typeService: TypeService,
              private router: Router) { }

  ngOnInit() {
    this.initForm();
    this.types = this.typeService.types;
    this.userSubscription = this.fichierService.usersSubject.subscribe(
      (users: Array<any>) => {
        this.users = users;
      }
    );
    this.fichierService.getUsersFiles();
  }

  initForm() {
    this.fichierForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: [''],
      expiration: [''],
      user: [''],
    });
  }

  onSaveFichier() {
    this.typeService.findType('image/jpeg').then(
      (type: Type) => {
        console.log(type);
        this.fileType = type;
      }
    );
    const title = this.fichierForm.get('title').value;
    const description = this.fichierForm.get('description').value;
    const expiration  = this.fichierForm.get('expiration').value;
    const user  = this.fichierForm.get('user').value;
    const newFichier = new Fichier(this.fileUuid ,title, description, this.fileUrl, this.fileName, this.fileExt, expiration);
    this.fichierService.createNewFichierUser(newFichier, user);

    this.router.navigate(['/admin']);
  }

  onUploadedFile(file: File) {
    this.fileIsUploading = true;
    this.fileName = this.fileUuid + file.name;
    console.log(file.type)
    if (file.type) {
      this.fileExt = file.type;
    } else {
      this.fileExt = "unknown";
    }
    this.fichierService.uploadFile(file, this.fileName ).then(
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
