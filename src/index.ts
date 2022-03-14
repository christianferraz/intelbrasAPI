// import express from 'express'
// import axios from 'axios'
// import mainRoutes from './routes/index'
import { getDados } from './modules/apps/getDados'
import { IPessoas } from './interfaces/IPessoas'
import { importUsers } from './modules/users'
import { importCredentials } from './modules/credentials'
import {writeFileSync} from "fs"

// const app = express()

// app.use(mainRoutes)

// app.listen(3001, () => console.log('rodando'))

const sleep = (waitTimeInMs) => new Promise((resolve, reject) => setTimeout(resolve, waitTimeInMs));

(async function () {
  getDados().then(async (pess: IPessoas[]) => {
    for await (const element of pess) {
      if (Object.values(element).length < 1) return
      if (element.tag_hexa === undefined || element.tag_hexa === null) {
        try {
        writeFileSync("nao_cadastrados.txt", `nao cadastrado falta tag - ${element.nome_completo}\n`, {
          encoding: "utf8",
          flag: "a+",
          mode: 0o666
        })

      } catch (error) {
        console.log('erro na gravacao do arquivo em users ', error)
        process.exit(1)
      }
      }
      let result_pess = await importUsers(element)
      // console.log(result_pess)
      await sleep(1000)
      let result_cred = await importCredentials(element, result_pess)
      // console.log(result_cred)
      // await sleep(3000)
    }
  }

  ).catch(error => {
      console.log(error)
  })

})()
