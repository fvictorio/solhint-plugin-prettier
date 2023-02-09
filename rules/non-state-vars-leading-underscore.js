const BaseChecker = require('solhint/lib/rules/base-checker');
const naming = require('solhint/lib/common/identifier-naming');

const DEFAULT_SEVERITY = 'warn';

const ruleId = 'non-state-vars-leading-underscore';
const meta = {
  type: 'naming',
  docs: {
    description: 'Non state variable names must start with a single underscore.',
    category: 'Style Guide Rules',
  },
  isDefault: true,
  recommended: true,
  defaultSetup: [DEFAULT_SEVERITY],
};

class NonStateVarsLeadingUnderscoreChecker extends BaseChecker {
  constructor(reporter) {
    super(reporter, ruleId, meta);
  }

  StateVariableDeclaration() {
    this.inStateVariableDeclaration = true;
  }

  'StateVariableDeclaration:exit'() {
    this.inStateVariableDeclaration = false;
  }

  StructDefinition(node) {
    this.inStructDefinition = true;
  }

  'StructDefinition:exit'() {
    this.inStructDefinition = false;
  }

  VariableDeclaration(node) {
    if (!this.inStateVariableDeclaration) {
      const shouldHaveLeadingUnderscore = !this.inStructDefinition;
      this.validateName(node, shouldHaveLeadingUnderscore);
    }
  }

  validateName(node, shouldHaveLeadingUnderscore) {
    if (node.name === null) {
      return;
    }

    if (naming.hasLeadingUnderscore(node.name) !== shouldHaveLeadingUnderscore) {
      this._error(node, node.name, shouldHaveLeadingUnderscore);
    }
  }

  _error(node, name, shouldHaveLeadingUnderscore) {
    this.error(node, `'${name}' ${shouldHaveLeadingUnderscore ? 'should' : 'should not'} start with _`);
  }
}

module.exports = NonStateVarsLeadingUnderscoreChecker;
