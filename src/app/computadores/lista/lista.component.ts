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
  // @ViewChild('deleteModal') deleteModal;

  computadores: Computadores[];
  computadorSelected: Computadores;
  search: string;

  // deleteModalRef: BsModalRef;

  constructor(
    private service: ComputadoresService,
    private router: Router,
    private route: ActivatedRoute
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

        this.computadores.push(this.computadores[0])
        this.computadores.push(this.computadores[1])
        // this.computadores.forEach(pc => {
        //   pc.arquivo ? pc.arquivo = 'server/uploads/' + pc.arquivo : pc.arquivo = null;
        // })
      }
    );
  }

  onDelete(computador) {
    this.computadorSelected = computador;
    // this.deleteModalRef = this.modalService.show(this.deleteModal, {
    //   class: 'modal-sm'
    // })

    this.service.remove(this.computadorSelected.id).subscribe(
      () => this.onRefresh()
    )
  }

  onSearch() {
    let allComputadores = this.computadores;
     
      this.computadores = allComputadores.filter(x => x.nome.includes(this.search) ||
        x.placaMae.includes(this.search) || x.processador.includes(this.search) || 
        x.hd.includes(this.search) || x.hdMarca.includes(this.search) || x.marca.includes(this.search) ||
        x.memoriaRam.includes(this.search) || x.modelo.includes(this.search));
  }
}
