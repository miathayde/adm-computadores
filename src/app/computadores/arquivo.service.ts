import { HttpClient, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class ArquivoService {

    constructor(private http: HttpClient) {}

    upload(file: Set<File>, url: string) {
    
        const formData = new FormData();
        file.forEach(file => formData.append('file', file, file.name));

        const request = new HttpRequest('POST', url, formData);
        return this.http.request(request);
    }
}
// na pasta server, rodar: npm run start