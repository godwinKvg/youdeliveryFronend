export class Category {
  constructor(public id: number, 
              public name:string, 
              public hasSubCategory: boolean,
              public parentId: number){ }
}

export class Product {
     id: number;
     name: string;
     images: Array<any>;
     oldPrice: number;
     photo1?:string;
     photo2?:string;
     photo3?:string;
     photo4?:string;     
     newPrice: number;
     discount: number;
     description: string;
     availibilityCount: number;
     color: Array<string>;
     size: Array<string>;
     weight: number;
     categoryId: number
     ratingsCount: number;
     cartCount: number;
     ratingsValue: number;
     idPartner: number;
}
