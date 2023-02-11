const BaseChecker = require('solhint/lib/rules/base-checker');

const ruleId = 'interface-starts-with-i'
const meta = {
  type: 'naming',
  docs: {
    description: 'Enforce that all interface names start with "I"',
    category: 'Style Guide Rules',
  },
  isDefault: true,
  recommended: true,
  defaultSetup: 'warn',
  schema: []
}

class InterfaceStartsWithIChecker extends BaseChecker {
  constructor(reporter) {
    super(reporter, ruleId, meta)
  }

  ContractDefinition(node) {
    if (node.kind !== 'interface') return;
    const interfaceName = node.name;
    
    if (!interfaceName.startsWith('I')) {
      this.error(node, `Interface name '${interfaceName}' must start with "I"`
      );
    }
  }
}

module.exports = InterfaceStartsWithIChecker
