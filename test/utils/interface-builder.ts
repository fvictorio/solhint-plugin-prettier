const { times } = require('lodash')

export const interfaceWith = (interfaceName: String, code: String): String => {
  return `
      pragma solidity 0.4.4;
        
        
      interface ${interfaceName} {
        ${code}
      }
    `
}
