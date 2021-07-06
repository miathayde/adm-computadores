import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Computadores } from "./computadores";

@Injectable({
    providedIn: 'root'
})
export class ComputadoresService {

    private readonly API = `${environment.API}computadores`;

    constructor(private http: HttpClient) { }

    list() {
        return this.http.get<Computadores[]>(this.API);
    }

    loadById(id) {
        return this.http.get<Computadores>(`${this.API}/${id}`);
    }

    create(computador) {
        return this.http.post(this.API, computador).pipe();
    }

    update(computador) {
        return this.http.put(`${this.API}/${computador.id}`, computador);
    }

    remove(id) {
        return this.http.delete(`${this.API}/${id}`);
    }
}
// json-server --watch db.json