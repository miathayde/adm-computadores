import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ComputadoresService } from '../computadores/computadores.service';
import { FormularioService } from './formulario.service';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss']
})
export class FormularioComponent implements OnInit {

  form: FormGroup;
  submitted: boolean = false;
  files: Set<File>;

  constructor(
    private formularioService: FormularioService,
    private computadorService: ComputadoresService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      nome: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      arquivo: [null],

    });
  }

  hasError(item: string) {
    return this.form.get(item).errors;
  }

  onChange(event) {
    const selectedFile = <FileList>event.srcElement.files;

    const fileNames = [];
    this.files = new Set();

    for(let i = 0; i < selectedFile.length; i++) {
      fileNames.push(selectedFile[i].name);
      this.files.add(selectedFile[i]);
    }
    // document.getElementById('customFileLabel').innerHTML = fileNames.join(', ');
  }

  onSubmit() {
    this.submitted = true;
    if(this.form.valid) {
      console.log("valido");
      this.computadorService.create(this.form.value).subscribe(
        result => {

        }, error => console.log(error)
      )
    }
    console.log(this.form.value)

    // this.formularioService.upload(this.files, 'http://localhost:8000/upload')
    //   .subscribe(response => console.log("concluido"));
  }

  onCancel() {
    this.submitted = false;
    this.form.reset();
  }
}
