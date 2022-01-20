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

const usuarioPromise = obterUsuario()
// manipular o sucesso .then
// manipular erros .catch
usuarioPromise
  .then(function(usuario) {
    return obterTelefone(usuario.id).then(function resolverTelefone(result) {
      return {
        usuario: {id: usuario.id, nome: usuario.nome},
        telefone: result
      }
    })
  })
  .then(function(resultado) {
    const endereco = obterEnderecoAsync(resultado.usuario.id)
    return endereco.then(function resolverEndereco(result) {
      return {
        usuario: resultado.usuario,
        telefone: resultado.telefone,
        endereco: result
      }
    })
  })
  .then(function(resultado) {
    console.log('resultado', resultado)
  }).catch(function(error) {
    console.log('Deu erro', error)
  })


// obterUsuario(function resolverUsuario(error, usuario) {
//   if (error) {
//     console.log('Erro no usuario', error)
//     return
//   }
//   obterTelefone(usuario.id, function resolverTelefone(error2, telefone) {
//     if (error2) {
//       console.log('Erro no telefone', error2)
//       return
//     }

//     console.log(`
//       Nome: ${usuario.nome}
//       Telefone: ${telefone.numero}
//     `)
//   })
// })