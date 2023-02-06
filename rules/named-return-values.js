
const BaseChecker = require('../base-checker')

const ruleId = 'named-return-values'
const meta = {
  type: 'best-practises',
  docs: {
    description: 'Enforce naming of all return values in functions',
    category: 'Best Practices'
  },
  isDefault: true,
  recommended: true,
  defaultSetup: 'warn'
}

class NamedReturnValuesChecker extends BaseChecker {
  constructor(reporter) {
    super(reporter, ruleId, meta)
  }

  FunctionDefinition(node) {
    node.returnParameters.forEach((parameter) => {
      if (!parameter.name) {
        this.error(
          node,
          `Return value '${parameter.typeName.name}' in function '${node.name}' must be named`
        );
      }
    });
  }
}

module.exports = NamedReturnValuesChecker
