/**
 * Data Model Interface
 */
import { BaseItem, Item } from "./interface";
import { Items } from "./items.interface";


/**
 * In-Memory Store
 */

let items : Items ={
      1 : {
            id : 1,
            name : "Burger", 
            price : 1000,
            description : "Hot Burger",
            category : "Burger",
            image : "https://cdn.auth0.com/blog/whatabyte/burger-sm.png"
      },
      2: {  
            id: 2,
            name: "Pizza",
            price: 299,
            description: "Cheesy",
            category: "Pizza",
            image: "https://cdn.auth0.com/blog/whatabyte/pizza-sm.png"
      },
      3: {
            id: 3,
            name: "Tea",
            price: 199,
            description: "Informative",
            category: "Tea",
            image: "https://cdn.auth0.com/blog/whatabyte/tea-sm.png"
      }
}


/**
 * Service Methods
 */

export const findAll = async() : Promise<Item[]> => Object.values(items);

export const find = async(id : number) : Promise<Item> => items[id];

export const create = async(newItem : BaseItem) : Promise<Item> => {
      const id = new Date().valueOf();

      items[id] = {
            id,
            ...newItem
      }

      return items[id]
}

export const update = async(id : number, itemUpdate : BaseItem) : Promise<Item | null> => {
      const item = await find(id);

      // cek ketersediaan data
      if(!item) {
            return null;
      }


      // update data
      items[id] = {
            id, 
            ...itemUpdate,
      }
      
      return items[id];
}


export const remove  = async(id: number) : Promise<null | void> => {
      const item = await find(id);

      if (!item) {
            return null;
      }

      delete items[id];
} 


