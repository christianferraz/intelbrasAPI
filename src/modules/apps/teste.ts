export const Teste = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {

      console.log('1')
      resolve(1)
    }, 5000)
  })
}
