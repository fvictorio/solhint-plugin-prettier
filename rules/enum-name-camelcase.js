const BaseChecker = require('solhint/lib/rules/base-checker');
const naming = require('solhint/lib/common/identifier-naming');

const ruleId = 'enum-name-camelcase'
const meta = {
  type: 'naming',
  docs: {
    description: 'Enum name must be in CamelCase.',
    category: 'Style Guide Rules',
  },
  isDefault: true,
  recommended: true,
  defaultSetup: 'warn',
  schema: [],
}

class EnumNameCamelCaseChecker extends BaseChecker {
  constructor(reporter) {
    super(reporter, ruleId, meta)
  }

  EnumDefinition(node) {
    if (naming.isNotCamelCase(node.name)) {
      this.error(node, `Enum name '${node.name}' must be in CamelCase`)
    }
  }
}

module.exports = EnumNameCamelCaseChecker
