import {  Router } from 'express';
import productsRout from '../../controllers/products'

const auth = Router()
auth.get('/list', productsRout.listProduct)
auth.post('/create', productsRout.createProduct)

export default auth