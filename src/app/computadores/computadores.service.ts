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

    create(computador) {
        return this.http.post(this.API, computador).pipe();
    }
}


