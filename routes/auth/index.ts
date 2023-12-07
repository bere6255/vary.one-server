import {  Router } from 'express';
import authRout from '../../controllers/auth'

const auth = Router()
auth.get('/test', authRout.test)

export default auth