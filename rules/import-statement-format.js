const BaseChecker = require('solhint/lib/rules/base-checker');

const ruleId = 'import-statement-format';
const meta = {
  type: 'best-practises',
  docs: {
    description: 'Enforce proper import statement format',
    category: 'Stylistic Issues',
  },
  isDefault: true,
  recommended: true,
  defaultSetup: 'warn',
  schema: [],
};

class ImportStatementFormatChecker extends BaseChecker {
  constructor(reporter) {
    super(reporter, ruleId, meta);
  }

  ImportDirective(node) {
    if (!node.symbolAliases) {
      const name = node.parent.children[node.parent.children.length - 1].name;
      this.error(node, `Import '${node.path}' in contract ${name} should be declared as import {contract_to_import} from ${node.path};`);
    }
  }
}

module.exports = ImportStatementFormatChecker;
