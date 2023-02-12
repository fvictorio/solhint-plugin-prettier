export const PublicMemberInterfaceRule = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Enforce that all public members should be in the interface',
      category: 'Best Practices',
      recommended: true,
    },
    fixable: 'code',
    schema: [],
  },

  create: function (context: any): any {
    let interfaces: any[] = [];

    return {
      ContractStatement(node: any) {
        if (node.contractKind === 'interface') {
          interfaces.push(node);
        }
      },

      'ContractStatement:exit'(node: any) {
        if (node.contractKind === 'contract') {
          const contractPublicMembers = node.subNodes.filter((member: any) => member.visibility === 'public');

          contractPublicMembers.forEach((publicMember: any) => {
            let isInInterface = false;
            interfaces.forEach((contractInterface: any) => {
              if (contractInterface.subNodes.includes(publicMember)) {
                isInInterface = true;
              }
            });

            if (!isInInterface) {
              context.report({
                node: publicMember,
                message: 'All public members should be in the interface',
              });
            }
          });
        }
      },
    };
  },
};
