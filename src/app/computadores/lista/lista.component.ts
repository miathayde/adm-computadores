import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Computadores } from '../computadores';
import { ComputadoresService } from '../computadores.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.scss']
})
export class ListaComponent implements OnInit {
  @ViewChild('deleteModal') deleteModal;

  computadores: Computadores[];
  allComputadores: Computadores[];
  computadorSelected: Computadores;
  search: string;

  deleteModalRef: BsModalRef;

  constructor(
    private service: ComputadoresService,
    private router: Router,
    private route: ActivatedRoute,
    private modalService: BsModalService
    ) { }

  ngOnInit(): void {
    this.onRefresh();
  }

  onEdit(id) {
    this.router.navigate(['editar', id], { relativeTo: this.route})
  }

  onRefresh() {
    this.service.list().subscribe(
      result => {
        this.computadores = result;
        this.allComputadores = result;
        // this.computadores.forEach(pc => {
        //   pc.arquivo ? pc.arquivo = 'server/uploads/' + pc.arquivo : pc.arquivo = null;
        // })
      }
    );
  }

  onDelete(computador) {
    this.computadorSelected = computador;

    this.deleteModalRef = this.modalService.show(this.deleteModal, {
      class: 'modal-sm'
    })
  }

  onDeclineDelete() {
    this.deleteModalRef.hide();
  }

  onConfirmDelete() {
    this.service.remove(this.computadorSelected.id).subscribe(
      () => {
        this.onRefresh();
        this.deleteModalRef.hide();
      }
    );
  }

  onSearch(e: string) {
    this.search = e.trim();
     
      this.computadores = this.allComputadores.filter(x => {
        const filter = (x.nome.indexOf(this.search) >= 0) || 
        (x.placaMae.indexOf(this.search) >= 0) || (x.processador.indexOf(this.search) >= 0) ||
        (x.hd.indexOf(this.search) >= 0) || (x.hdMarca.indexOf(this.search) >= 0) ||
        (x.marca.indexOf(this.search) >= 0) || (x.modelo.indexOf(this.search) >= 0) ||
        (x.memoriaRam.indexOf(this.search) >= 0);

        return filter;
      });
  }
}