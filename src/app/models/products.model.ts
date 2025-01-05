export interface ProductsModel {
    id : number;
    title : string;
    image : string;
    price : number;
    category : string;
    stock? : number;
    qty : number;
    description : string;
}
