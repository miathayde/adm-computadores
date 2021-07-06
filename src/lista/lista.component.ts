import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Computadores } from 'src/app/computadores/computadores';
import { ComputadoresService } from 'src/app/computadores/computadores.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.scss']
})
export class ListaComponent implements OnInit {

  computadores: Computadores[];

  constructor(
    private service: ComputadoresService,
    private router: Router,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.service.list().subscribe(
      result => {
        this.computadores = result;
      }
    );
  }

  onEdit(id) {
    this.router.navigate(['editar', id], { relativeTo: this.route})
  }
}
