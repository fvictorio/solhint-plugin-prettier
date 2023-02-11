const BaseChecker = require('solhint/lib/rules/base-checker');

const ruleId = 'contract-data-order'
const meta = {
  type: 'Best Practices',

  docs: {
    description: 'Enforce the specified ordering of data in contracts',
        category: 'Best Practices',
  },

  isDefault: true,
  recommended: true,
  defaultSetup: 'warn',
  schema: []
}

class ContractDataOrderChecker extends BaseChecker {
  constructor(reporter) {
    super(reporter, ruleId, meta)
  }

  ContractDefinition(node) {
    if (node.kind !== 'contract') return;

    const contractMembers = node.subNodes;
    const unOrderedMembers = [];
    const constants = [];
    const immutableVariables = [];
    const stateVariables = [];
    
    contractMembers.forEach(member => {

      if (member.type === 'StateVariableDeclaration') {
        unOrderedMembers.push(member);
        member.variables.forEach((variable) => {
          if (variable.isDeclaredConst) {
            constants.push(member);
          } else if (variable.isImmutable) {
            immutableVariables.push(member);
          } else {
            stateVariables.push(member);
          }
      });
      }
    });
    
    const orderedMembers = [...constants, ...immutableVariables, ...stateVariables];
    const misorderedMember = unOrderedMembers.find((unOrderedMember, index) => {
        return unOrderedMember !== orderedMembers[index];
    });
    if (misorderedMember) {
        this.error(
          node,
          `The order of data in contract ${node.name} should be: Constants, Immutable variables, State Variables`
        );
    }
  }
}

module.exports = ContractDataOrderChecker
