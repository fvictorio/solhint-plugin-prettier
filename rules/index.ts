import { ContractDataOrderChecker } from './contract-data-order';
import { EnumNameCamelCaseChecker } from './enum-name-camelcase';
import { ImmutableNameSnakeCaseChecker } from './immutable-name-snakecase';
import { ImportStatementFormatChecker } from './import-statement-format';
import { InterfaceMemberOrderChecker } from './interface-member-order';
import { InterfaceStartsWithIChecker } from './interface-starts-with-i';
import { NamedReturnValuesChecker } from './named-return-values';
import { NonStateVarsLeadingUnderscoreChecker } from './non-state-vars-leading-underscore';
// import { PublicMemberInterfaceRule } from './public-member-interface-rule';
import { StructNameCamelCaseChecker } from './struct-name-camelcase';

const rules: typeof Rule[] = [
  ContractDataOrderChecker,
  EnumNameCamelCaseChecker,
  ImmutableNameSnakeCaseChecker,
  ImportStatementFormatChecker,
  InterfaceMemberOrderChecker,
  InterfaceStartsWithIChecker,
  NamedReturnValuesChecker,
  NonStateVarsLeadingUnderscoreChecker,
  // PublicMemberInterfaceRule,
  StructNameCamelCaseChecker,
];

export default rules;
