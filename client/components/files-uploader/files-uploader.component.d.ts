import { OnInit } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';
import { DomSanitizer } from '@angular/platform-browser';
import { File } from './file';
export declare class FilesUploaderComponent implements OnInit {
    private http;
    private domSanitizer;
    list: File[];
    endpoint: string;
    readonly: boolean;
    private uploader;
    private uuid;
    protected options: RequestOptions;
    constructor(http: Http, domSanitizer: DomSanitizer);
    ngOnInit(): void;
    deleteFile(event: any, file: File): void;
    private photoURL;
}
