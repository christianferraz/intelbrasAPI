import axios from "axios"
import { IPessoas } from "../../interfaces/IPessoas"
import getToken from "../auth"
import {writeFileSync} from "fs"

export const importCredentials = (row: IPessoas, result) => {
  return new Promise(async (resolve, reject) => {

    let token = (await getToken()).data
    let data_tag = JSON.stringify({
            nivel:{
              id:"N",
              descricao: "credentials.level.normal"
            },
            tipo:{
              id:"TG",
              descricao: "credentials.types.card"
            },
            tag: {
              codigo_hexa: row.tag_hexa,
              codigo_decimal: parseInt(row.tag_hexa, 16).toString(),
              tamanho: {
                id: "26",
                descricao: "26 bits"
              }
            },
            pessoa:{
              id: result.data.data.pessoa.id
            },
            coacao:false,
            admin:false
      })
    try {
      let res = await axios.post(process.env.URL + '/v1/credencial',
          data_tag,
      {
          headers: {
              'Content-Type': 'application/json',
              'Authorization':'JWT ' + token.token
          }
        })
        resolve(result)
      if (res.data.message.includes('Objeto criado com sucesso')) {
        try {
          writeFileSync("credenciais.txt", `${res.data.data.pessoa.nome_completo} - ${res.data.data.tag.codigo_hexa}\n`, {encoding: "utf8", flag: "a+", mode: 0o666})
        } catch (error) {
          console.log('erro na gravacao do arquivo em credenciais ', error)
          process.exit(1)
        }
      }
    } catch (error) {
      console.log('erro')
      writeFileSync("erros.txt", `Erro no arquivo CadCredenciais\n\n${error}\n\n\n${row}\n`, {encoding: "utf8", flag: "a+", mode: 0o666})
      process.exit(1)
    }
  })
}
