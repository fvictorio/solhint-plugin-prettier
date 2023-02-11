const BaseChecker = require('solhint/lib/rules/base-checker');

const ruleId = 'interface-member-order'
const meta = {
  type: 'Best Practices',
  docs: {
    description: 'Enforce the specified ordering of members in interfaces',
    category: 'Best Practices',
  },
  isDefault: true,
  recommended: true,
  defaultSetup: 'warn',
  schema: []
}

class InterfaceMemberOrderChecker extends BaseChecker {
  constructor(reporter) {
    super(reporter, ruleId, meta)
  }

  ContractDefinition(node) {
    if (node.kind !== 'interface') return;
    const interfaceMembers = node.subNodes;
    const unOrderedMembers = [];
    const events = [];
    const errors = [];
    const structs = [];
    const functions = [];
    
    interfaceMembers.forEach(member => {
      switch (member.type) {
        case 'EventDefinition':
          unOrderedMembers.push(member);
          events.push(member);
          break;
        case 'CustomErrorDefinition':
          unOrderedMembers.push(member);
          errors.push(member);
          break;
        case 'StructDefinition':
          unOrderedMembers.push(member);
          structs.push(member);
          break;
        case 'FunctionDefinition':
          unOrderedMembers.push(member);
          functions.push(member);
          break;
        default:
          break;
      }
    });
    
    const orderedMembers = [...events, ...errors, ...structs, ...functions];
    
    const misorderedMember = unOrderedMembers.find((unOrderedMember, index) => {
      return unOrderedMember !== orderedMembers[index];
    });
    if (misorderedMember) {
      this.error(
        node,
        `The order of members in the interface ${node.name} interfaces should be: Events, Errors, Structs, Functions`
      );
    }
  }
}

module.exports = InterfaceMemberOrderChecker
