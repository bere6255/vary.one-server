import { Request, Response } from "express" 
import listOrders from "./listOrders"
import createOrders from "./createOrders"

export default {
    listOrders: async (req: Request, res: Response) => await listOrders(req, res),
    createOrders: async (req: Request, res: Response) => await createOrders(req, res),
}