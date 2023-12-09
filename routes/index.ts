import {  Router } from 'express';
import auth from './auth';
import orders from './orders';
import products from './products';

const routes = Router()
routes.use('/api/auth/', auth)
routes.use('/api/orders/', orders)
routes.use('/api/products/', products)
routes.get('/', (req, res) => {
  res.status(200).send({status: true, data: {}, message:"wellcome to vary.one 🚀🚀🛰🛰"});
})

export default routes