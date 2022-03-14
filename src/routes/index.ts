import { Request, Response, Router } from 'express'
import { importUsers } from '../modules/users'

const router = Router()

router.get('/createUsers', importUsers)
router.get('/',(request: Request, response: Response)=> { return response.send('<h1>UTILIZE OS COMANDOS APIs</h1>')})

export default router