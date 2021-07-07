import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ArquivoService } from '../arquivo.service';
import { ComputadoresService } from '../computadores.service';
@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss']
})
export class FormularioComponent implements OnInit {
  @ViewChild('successModal') successModal;

  form: FormGroup;
  submitted: boolean = false;
  files: Set<File>;
  isNew: boolean;

  successModalRef: BsModalRef;

  constructor(
    private arquivoService: ArquivoService,
    private computadorService: ComputadoresService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private modalService: BsModalService
  ) { }

  ngOnInit(): void {

    const computador = this.route.snapshot.data['computador'];

    this.form = this.fb.group({
      id: [computador.id],
      nome: [computador.nome, [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      arquivo: [computador.arquivo],
      modelo: [computador.modelo, [Validators.required]],
      marca: [computador.marca, [Validators.required]],
      placaMae: [computador.placaMae, [Validators.required]],
      memoriaRam: [computador.memoriaRam, [Validators.required]],
      hd: [computador.hd, [Validators.required]],
      hdMarca: [computador.hdMarca, [Validators.required]],
      processador: [computador.processador, [Validators.required]]
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

      this.form.value.arquivo = selectedFile[i].name;
    }
  }

  modalOpen() {
    this.successModalRef = this.modalService.show(this.successModal, {
      class: 'modal-sm'
    })
  }

  exitModal() {
    this.successModalRef.hide();
  }

  onSubmit() {
    this.submitted = true;
    if(this.form.valid) {
      if(this.form.value.id) {
        this.computadorService.update(this.form.value).subscribe(
          () => {
            this.modalOpen();
          }, error => console.log(error)
        );
      } else {
        this.computadorService.create(this.form.value).subscribe(
          () => {
            this.modalOpen();
          }, error => console.log(error)
        );
      }
      if(this.files) {
        this.arquivoService.upload(this.files, 'http://localhost:8000/upload')
        .subscribe();
      }
    }
  }

  onCancel() {
    this.submitted = false;
    this.form.reset();
  }
}
