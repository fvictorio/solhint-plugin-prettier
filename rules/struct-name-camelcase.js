const BaseChecker = require('solhint/lib/rules/base-checker');
const naming = require('solhint/lib/common/identifier-naming');

const ruleId = 'struct-name-camelcase'
const meta = {
  type: 'naming',

  docs: {
    description: 'Struct name must be in CamelCase.',
    category: 'Style Guide Rules',
  },

  isDefault: true,
  recommended: true,
  defaultSetup: 'warn',
  schema: null,
}

class StructNameCamelCaseChecker extends BaseChecker {
  constructor(reporter) {
    super(reporter, ruleId, meta)
  }

  StructDefinition(node) {
    if (naming.isNotCamelCase(node.name)) {
      this.error(node, `Struct name '${node.name}' must be in CamelCase`)
    }
  }
}

module.exports = StructNameCamelCaseChecker
