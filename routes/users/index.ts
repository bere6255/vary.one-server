import {  Router } from 'express';
import usersRout from '../../controllers/users'

const users = Router()
users.get('/test', usersRout.test)

export default users