// importamos um módulo interno do node.js
const util = require('util')

const obterEnderecoAsync = util.promisify(obterEndereco)

function obterUsuario() {

  // sucesso - resolve
  // problema - reject
  return new Promise(function resolvePromise(resolve, reject) {
    setTimeout(function() {
      // return reject(new Error('Deu ruim mesmo'))
      return resolve({
        id: 1,
        nome: 'Inacio',
        dataNascimento: new Date()
      })
    }, 1000)
  })
}

function obterTelefone(idUsuario) {
  return new Promise(function resolverPromise(resolve, reject) {
    setTimeout(() => {
      return resolve({
        numero: '112322323'
      })
    }, 2000)
  })
}

function obterEndereco(idUsuario, callback) {

  setTimeout(() => {
    return callback(null, {
      rua: 'rua das laranjeiras'
    })
  }, 2000)
}

// 1o passo - adicionar a palavra async -> automaticamente ela retornará uma Promise
main()
async function main() {

  try {
    console.time('tempo-execucao')

    const usuario = await obterUsuario()
    // const telefone = await obterTelefone(usuario.id)
    // const endereco = await obterEnderecoAsync(usuario.id)
    const resultado = await Promise.all([obterTelefone(usuario.id), obterEnderecoAsync(usuario.id)])
    const telefone = resultado[0]
    const endereco = resultado[1]

    console.log(`
      Nome: ${usuario.nome}
      Telefone: ${telefone.numero}
      Endereço: ${endereco.rua}
    `)

    console.timeEnd('tempo-execucao')
  } catch (error) {
    console.log('deu erro aqui', error)
  }
}