/**
 * Reqiured External Modules and Interfaces
 */
import express, { Response, Request } from "express";
import { BaseItem, Item } from "./interface";
import * as ItemService from "./items.service";



/**
 * Router Definition
 */

export const itemsRouter = express.Router();


/**
 * Controller Definitions
 */


// Get items
itemsRouter.get('/', async(req : Request, res : Response)=>{
      try {
            const items : Item[] = await ItemService.findAll();

            res.status(200).json(items);
      } catch(e : any) {
            res.status(404).send(e.message);
      }
})

// Get items/:id
itemsRouter.get('/:id/', async(req : Request, res : Response)=>{
      const id = parseInt(req.params.id);

      try {
            const item : Item = await ItemService.find(id);
            if (item) {
                  return res.status(200).json(item);
            } else {
                  return res.status(404).send("Not Found");
            }
      } catch (e : any) {
            res.status(500).send(e.message);
      }
})

// Post items
itemsRouter.post('/', async(req: Request, res: Response) => {
      try{
            const item : BaseItem = req.body;
            const newItem = await ItemService.create(item);
            res.status(201).json(newItem);
      } catch (e : any) {
            res.status(500).send(e.message);
      }
})


// Put items/:id
itemsRouter.put('/:id', async(req : Request, res : Response) => {
      const id = parseInt(req.params.id);
      
      try{
            const itemUpdate : Item = req.body;
      
            const exitingItem : Item = await ItemService.find(id)

            if(exitingItem) {
                  const updatedItem = await ItemService.update(id, itemUpdate)
                  return res.status(200).json(itemUpdate)
            }

            const newItem : Item = await ItemService.create(itemUpdate);
            res.status(201).send(newItem);

      } catch (e : any) {
            res.status(500).send(e.message)
      }
})


// Delete items/:id
itemsRouter.delete('/:id', async(req : Request, res : Response) => {
      const id : number = parseInt(req.params.id, 10);
      const item : Item = await ItemService.find(id);

      try {
            await ItemService.remove(id);
            res.status(204).send(`deleted successfully`);
      } catch (e : any) {
            res.status(500).send(e.message);
      }
})