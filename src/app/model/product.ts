import { Resource } from '../../app/services/generic-http.service';

export class Product extends Resource {
    public Name: string ;
    public Description: string ;
    public Price: number;
}
