import { Request, Response } from "express" 
import listProduct from "./listProduct"
import createProduct from "./createProduct"

export default {
    listProduct: async (req: Request, res: Response) => await listProduct(req, res),
    createProduct: async (req: Request, res: Response) => await createProduct(req, res),
}