import BaseChecker from 'solhint/lib/rules/base-checker';
import naming from 'solhint/lib/common/identifier-naming';

const ruleId = 'immutable-name-snakecase';
const meta = {
  type: 'naming',
  docs: {
    description: 'Immutable name must be in capitalized SNAKE_CASE.',
    category: 'Style Guide Rules',
  },
  isDefault: true,
  recommended: true,
  defaultSetup: 'warn',
  schema: null,
};

export class ImmutableNameSnakeCaseChecker extends BaseChecker implements Rule {
  constructor(reporter: any) {
    super(reporter, ruleId, meta);
  }

  VariableDeclaration(node: any) {
    if (node.isImmutable) {
      this.validateImmutableName(node);
    }
  }

  validateImmutableName(variable: any) {
    if (naming.isNotUpperSnakeCase(variable.name)) {
      this.error(variable, `Immutable '${variable.name}' must be in capitalized SNAKE_CASE`);
    }
  }
}
