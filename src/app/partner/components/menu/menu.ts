import { Menu } from './menu.model'; 

export const menuItems = [ 
    new Menu (10, 'Dashboard', '/partner', null, 'dashboard', null, false, 0),
    new Menu (20, 'Mes Menus', null, null, 'grid_on', null, true, 0),  
    new Menu (21, 'Categories', '/partner/products/categories', null, 'category', null, false, 20), 
    new Menu (22, 'Liste menu', '/partner/products/product-list', null, 'list', null, false, 20), 
    new Menu (23, 'Detail Produit', '/partner/products/product-detail', null, 'remove_red_eye', null, false, 20),  
    new Menu (24, 'Ajouter nouveau menu', '/partner/products/add-product', null, 'add_circle_outline', null, false, 20), 
    new Menu (30, 'Ventes', null, null, 'monetization_on', null, true, 0),  
    new Menu (32, 'Transactions', '/partner/sales/transactions', null, 'local_atm', null, false, 30),  
    new Menu (120, 'Notes', '/partner/reviews', null, 'insert_comment', null, false, 0), 
]