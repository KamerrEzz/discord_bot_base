import 'module-alias/register'
import { addAliases } from 'module-alias'

addAliases({
  '@Utils': __dirname + '/utils',
  '@Config': __dirname + '/config',
  '@Client': __dirname + '/client',
  '@Types': __dirname + '/types',
  '@Services': __dirname + '/services',
  '@Module': __dirname + '/module',
})
