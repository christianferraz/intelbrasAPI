import * as csv from 'fast-csv'
import * as fs from "fs"
import path from "path"

export const getDados = async () => {
    return new Promise((resolve, reject) => {
        const users = []
        fs.createReadStream(path.resolve('./src/csv', 'users_ex.csv')).pipe(
            csv.parse({ headers: true, delimiter: ';', encoding: 'utf8', quote: '"' }))
            .on('error', error => reject(error))
            .on('data', async row => {
                users.push(row)
            })
            .on('end', () => {
                resolve(users)
            })
    })
}
