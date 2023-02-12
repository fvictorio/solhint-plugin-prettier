import assert from 'assert';
import { processStr } from '../utils/parsers';
import { contractWith } from 'solhint/test/common/contract-builder';

const config = {
  rules: { 'struct-name-camelcase': 'error' },
};

describe('Linter - struct-name-camelcase', () => {
  it('should raise error for struct name not in camelcase', () => {
    const structName = 'teststruct';
    const code = contractWith(`struct ${structName} {}`);
    const report = processStr(code, config);

    assert.equal(report.errorCount, 1);
    assert.ok(report.messages[0].message == `Struct name '${structName}' must be in CamelCase`);
  });

  it('should raise error for struct name is in snakecase', () => {
    const structName = 'TEST_STRUCT';
    const code = contractWith(`struct ${structName} {}`);
    const report = processStr(code, config);

    assert.equal(report.errorCount, 1);
    assert.ok(report.messages[0].message == `Struct name '${structName}' must be in CamelCase`);
  });

  it('should not raise error for struct name in camelcase', () => {
    const code = contractWith('struct TestStruct {}');
    const report = processStr(code, config);

    assert.equal(report.errorCount, 0);
  });
});
