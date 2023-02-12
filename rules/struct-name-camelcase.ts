import BaseChecker from 'solhint/lib/rules/base-checker';
import * as naming from 'solhint/lib/common/identifier-naming';

const ruleId = 'struct-name-camelcase';
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
};

export class StructNameCamelCaseChecker extends BaseChecker implements Rule {
  constructor(reporter: any) {
    super(reporter, ruleId, meta);
  }

  StructDefinition(node: any) {
    if (naming.isNotCamelCase(node.name)) {
      this.error(node, `Struct name '${node.name}' must be in CamelCase`);
    }
  }
}
