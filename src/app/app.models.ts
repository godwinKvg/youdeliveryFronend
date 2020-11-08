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
     commandeProduits: CommandeProduit[];
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

export class CommandeProduit{
     id?:any;
     commande: Commande;
     product : Product;
     qte: number
}

export class Commande{
     id?: any;
     numero?: number;
     modePaiement: string;
     montant: number;
     modeLivraison: string;
     commandeProduits: CommandeProduit[];
     user: User;
     createDateTime?: any;
     updateDateTime?:any

}

export class User{

     id?: any;
     fullname : string;
     username : string;
     phoneNumber: string;
     ville? : string;
     adresse? : string;
     password : string;
     roles? : Role[];
     commandes : Commande[];
     colis: Colis[]

}

export class Role{
     id?:any;
     name: any;
}

export class Colis{
     id?:any;
     typeColis: string;
     numero: string;
     villeDepart: string;
     villeDestination: string;
     poids: string;
     adressDepart : string;
     nomDestinataire: string;
     adressDestinataire: string;
     modePaiement: string;
     telephoneDestinataire: string;
     user: User;
     createDateTime?: any;
     updateDateTime?:any

}
