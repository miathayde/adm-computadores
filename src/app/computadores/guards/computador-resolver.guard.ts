import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable, of } from "rxjs";
import { Computadores } from "../computadores";
import { ComputadoresService } from "../computadores.service";

@Injectable({
    providedIn: 'root'
})
export class ComputadorResolverGuard implements Resolve<Computadores> {
    
    constructor(
        private service: ComputadoresService
    ) { }
    
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Computadores> {

        if(route.params && route.params['id']) {
            return this.service.loadById(route.params['id']);
        }

        return of({
            id: null,
            nome: null,
            arquivo: null,
            modelo: null,
            marca: null,
            placaMae: null,
            memoriaRam: null,
            hd: null,
            hdMarca: null,
            processador: null
         });
    }
}