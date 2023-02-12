import BaseChecker from 'solhint/lib/rules/base-checker';

const ruleId = 'named-return-values';
const meta = {
  type: 'best-practises',
  docs: {
    description: 'Enforce naming of all return values in functions',
    category: 'Best Practices',
  },
  isDefault: true,
  recommended: true,
  defaultSetup: 'warn',
};

export class NamedReturnValuesChecker extends BaseChecker implements Rule {
  constructor(reporter: any) {
    super(reporter, ruleId, meta);
  }

  FunctionDefinition(node: any) {
    node.returnParameters.forEach((parameter: any) => {
      if (!parameter.name) {
        this.error(node, `Return value '${parameter.typeName.name}' in function '${node.name}' must be named`);
      }
    });
  }
}
