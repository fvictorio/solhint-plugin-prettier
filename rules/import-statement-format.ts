import BaseChecker from 'solhint/lib/rules/base-checker';

const ruleId = 'import-statement-format';
const meta = {
  type: 'best-practices',
  docs: {
    description: 'Enforce proper import statement format',
    category: 'Stylistic Issues',
  },
  isDefault: true,
  recommended: true,
  defaultSetup: 'warn',
  schema: [],
};

export class ImportStatementFormatChecker extends BaseChecker implements Rule {
  constructor(reporter: any) {
    super(reporter, ruleId, meta);
  }

  ImportDirective(node: any) {
    if (!node.symbolAliases) {
      const name = node.parent.children[node.parent.children.length - 1].name;
      this.error(node, `Import '${node.path}' in contract ${name} should be declared as import {contract_to_import} from '${node.path}';`);
    }
  }
}
