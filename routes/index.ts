import {  Router } from 'express';
import webhooks from './auth';
import wallet from './users';

const routes = Router()
routes.use('/api/wallet/', wallet)
routes.use('/webhooks/', webhooks)
routes.get('/', (req, res) => {
  res.status(200).send({status: true, data: {}, message:"wellcome to vary.one 🚀🚀🛰🛰"});
})

export default routes