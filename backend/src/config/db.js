import {Pool} from 'pg'
import dotenv from 'dotenv'

dotenv.config();

const pgClient = new Pool({
    connectionString : process.env.DATABASE_URL
})
pgClient.connect()
.then(()=>console.log('connected to db'))
.catch(err =>console.log('db connection error',err))

export default pgClient