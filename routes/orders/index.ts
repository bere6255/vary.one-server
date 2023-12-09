import {  Router } from 'express';
import orderRout from '../../controllers/order'

const auth = Router()
auth.get('/list', orderRout.listOrders)
auth.post('/create', orderRout.createOrders)

export default auth