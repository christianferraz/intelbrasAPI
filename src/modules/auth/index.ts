import axios from "axios"

const getToken = async () => (await axios.post(process.env.URL + '/v1/auth/',
        {
            "username": process.env.USERNAME,
            "password": process.env.PASSWORD
        },
        {
            headers: { 'Content-Type': 'application/json' }
        }
    ))
export default getToken
