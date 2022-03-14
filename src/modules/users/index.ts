import axios, { AxiosResponse } from "axios"
import * as fs from "fs"
import { IPessoas } from "../../interfaces/IPessoas"
import getToken from "../auth"

export const importUsers = async (row: IPessoas) => {
  let token = (await getToken()).data
  let ret: AxiosResponse
  let data_user = JSON.stringify({
    pessoa: {
      nome_completo: row.nome_completo,
      cpf: row.cpf,
      rg: row.rg,
      telefone_celular: row.telefone_celular,
      email: row.email,
      veiculo: {
        placa: row.placa,
        marca: {
          id: row.marca,
          descricao: row.marca
        },
        cor: row.cor,
        modelo: row.modelo
      },
      grupo: { id: 1 }
    },
    departamento: { id: row.departamento_id },
    matricula: row.matricula,
    tipo_usuario: {
      id: "N"
    },
    estado: true,
    data_contratacao: 1574786135771,
    data_demissao: 4099394136292,
    observacoes: row.observacoes?.length > 0 ? row.observacoes : '',
    local_especifico: row.local_especifico?.substring(0, 25),
    campos_personalizados: {}
  })
  try {
    let result = await axios.post(process.env.URL + '/v1/usuario/',
    data_user,
    {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'JWT ' + token.token
      }
    })
    if (result.data.message.includes('Objeto criado com sucesso')) {
      try {
        fs.writeFileSync("cadastrados.txt", `cadastrado - ${row.nome_completo}\n`, {
          encoding: "utf8",
          flag: "a+",
          mode: 0o666
        })

      } catch (error) {
        console.log('erro na gravacao do arquivo em users ', error)
        process.exit(1)
      }
      return result
    } else {
      try {
        fs.writeFileSync("nao_cadastrados.txt", `nao cadastrado - ${ret.data.data.pessoa.nome_completo}\n`, {
          encoding: "utf8",
          flag: "a+",
          mode: 0o666
        })

      } catch (error) {
        console.log('erro na gravacao do arquivo em users ', error)
        process.exit(1)
      }
    }
  } catch (error) {
    console.log('erro no usuario')
    fs.writeFileSync("erros.txt", `Erro no arquivo cadUser\n\n${error}\n\n\n${row}\n`, { encoding: "utf8", flag: "a+", mode: 0o666 })
    process.exit(1)
  }
}
