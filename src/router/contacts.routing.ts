/**
 * Reqiured External Modules and Interfaces
 */
import express, { Response, Request } from "express";
import { BaseContact, ContactModel } from "../model/contacts";
import { ExpressValidator, validationResult, body, check, param } from "express-validator";



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
            const items : BaseContact[] = await ContactModel.find();
            res.status(200).json(items);
      } catch(e : any) {
            res.status(404).send(e.message);
      }
})

// Get items/:id
itemsRouter.get('/:id',  

async(req : Request, res : Response)=>{
      const id = req.params.id;

      try {
            const item : BaseContact | null = await ContactModel.findById(id);
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
itemsRouter.post('/', 
[
      body('name').custom(async (value)=>{
            const duplikat : Object | null = await ContactModel.findOne({name : value})
            if(duplikat) throw new Error("Nama sudah digunakan");
            return true;
      }),
      check("email", "Email tidak valid!").isEmail(),
      check('phone', "Phone tidak valid!").isMobilePhone('id-ID')
],
async(req: Request, res: Response) => {
      try{  
            const errors : any = validationResult(req)
            if(!errors.isEmpty()){
                  return res.status(400).json(errors.array())
            } else {
                  const item : BaseContact = req.body;
                  const newItem = await ContactModel.create(item);
                  res.status(201).json({
                        message : "Success",
                        newItem,
                        status : 201
                  });
            }
      } catch (e : any) {
            res.status(500).send(e.message);
      }
})


// Put items/:id
itemsRouter.put('/:id', 

[
      body('name').custom(async (value, {req})=>{
            const id = req.params?.id;
            const duplikat : BaseContact | null = await ContactModel.findOne({name : value});
            const oldNameCheck : BaseContact | null = await ContactModel.findById(id)

            
            type ObjectKey = keyof typeof oldNameCheck;
            const name : String | null = 'name' as ObjectKey;

            if (duplikat && (!oldNameCheck || value !== oldNameCheck[name])) throw new Error("Nama sudah digunakan");
            return true;
      }), 
      check("email", "Email tidak valid!").isEmail(),
      check('phone', "Phone tidak valid!").isMobilePhone('id-ID')
],

async(req : Request, res : Response) => {

      try{
            const id  = req.params.id;
            const errors : any = validationResult(req);

            if (!errors.isEmpty()){
                  return res.status(400).json(errors.array())
            } else {
                  const itemUpdate : BaseContact = req.body;
                  const exitingItem : BaseContact | null = await ContactModel.findById(id);
                  if(exitingItem) {
                        const updatedItem = await ContactModel.findByIdAndUpdate(
                              { _id: id },
                              {
                                    $set: {
                                    name: req.body.name,
                                    email: req.body.email,
                                    phone: req.body.phone,
                                    },
                              })
                        return res.status(200).json({
                              message : "success", 
                              itemUpdate
                        })
                  }
                  const newItem : BaseContact = await ContactModel.create(itemUpdate);
                  res.status(201).send(newItem);
            }


      } catch (e : any) {
            res.status(500).send(e.message)
      }
})


// Delete items/:id
itemsRouter.delete('/:id', async(req : Request, res : Response) => {
      const id  = req.params.id;
      const item : BaseContact | null = await ContactModel.findById(id);
      console.log(item);

      try {
            await ContactModel.deleteOne({ _id: id });
            res.status(200).send(`deleted successfully`);
      } catch (e : any) {
            res.status(500).send(e.message);
      }
})