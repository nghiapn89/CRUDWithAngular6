import { Injectable } from '@angular/core';

@Injectable()
export class AppGlobals {
    readonly apiUrl: string = 'http://localhost:4500/';
    public isLoadingData: Boolean = false;
}
