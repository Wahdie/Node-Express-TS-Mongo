export interface BaseItem {
      name: string;
      price: number;
      description: string;
      category: string;
      image: string;
}

export interface Item extends BaseItem {
      id : number;
}