import BaseChecker from 'solhint/lib/rules/base-checker';

const ruleId = 'contract-data-order';
const meta = {
  type: 'Best Practices',
  docs: {
    description: 'Enforce the specified ordering of data in contracts',
    category: 'Best Practices',
  },
  isDefault: true,
  recommended: true,
  defaultSetup: 'warn',
  schema: [],
};

export class ContractDataOrderChecker extends BaseChecker implements Rule {
  constructor(reporter: any) {
    super(reporter, ruleId, meta);
  }

  ContractDefinition(node: any) {
    if (node.kind !== 'contract') return;

    const contractMembers = node.subNodes;
    const unOrderedMembers: any[] = [];
    const constants: any[] = [];
    const immutableVariables: any[] = [];
    const stateVariables: any[] = [];

    contractMembers.forEach((member: any) => {
      if (member.type === 'StateVariableDeclaration') {
        unOrderedMembers.push(member);
        member.variables.forEach((variable: any) => {
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
      this.error(node, `The order of data in contract ${node.name} should be: Constants, Immutable variables, State Variables`);
    }
  }
}
