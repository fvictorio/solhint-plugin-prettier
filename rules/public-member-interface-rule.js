module.exports = {
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

  create: function (context) {
    let interfaces = [];

    return {
      ContractStatement(node) {
        if (node.contractKind === 'interface') {
          interfaces.push(node);
        }
      },

      'ContractStatement:exit'(node) {
        if (node.contractKind === 'contract') {
          const contractPublicMembers = node.subNodes.filter((member) => member.visibility === 'public');

          contractPublicMembers.forEach((publicMember) => {
            let isInInterface = false;
            interfaces.forEach((contractInterface) => {
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
