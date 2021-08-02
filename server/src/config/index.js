const fs = require('fs')
const path = require('path')

// Try to load RSA KeyPair
let _PRIVATE_KEY = false
let _PUBLIC_KEY = false

try {
  _PRIVATE_KEY = fs.readFileSync(path.resolve(process.env.JWT_PRIVATE_KEY_PATH || './.keys/private.pem'))
  _PUBLIC_KEY = fs.readFileSync(path.resolve(process.env.JWT_PUBLIC_KEY_PATH || './.keys/public.pem'))
} catch (e) {
  console.warn(e)
  return
}

module.exports = {
  jwt: {
    private_key: _PRIVATE_KEY,
    public_key: _PUBLIC_KEY,
    passphrase: process.env.JWT_PASSPHRASE
  },
  app: {
    title: 'Al Torchio Antico',
    port: process.env.APP_PORT || 3000
  },
  db: {
    database_name: process.env.DB_NAME,
    database_user: process.env.DB_USER,
    database_password: process.env.DB_PASSWORD,
    database_options: {
      dialect: process.env.DB_DIALECT,
      host: process.env.DB_HOST,
      port: process.env.DB_PORT
    } 
  }
}