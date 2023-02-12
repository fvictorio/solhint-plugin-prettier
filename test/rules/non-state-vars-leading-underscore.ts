import assert from 'assert';
import { processStr } from '../utils/parsers';
import { contractWith } from 'solhint/test/common/contract-builder';

const config = {
  rules: { 'non-state-vars-leading-underscore': 'error' },
};

describe('non-state-vars-leading-underscore', () => {
  it('should raise an error if a block variable does not start with an underscore', () => {
    const code = contractWith('function foo() public { uint myVar; }');
    const report = processStr(code, config);
    assert.equal(report.errorCount, 1);
    assert.ok(report.messages[0].message == `'myVar' should start with _`);
  });

  it('should not raise an error if a block variable starts with an underscore', () => {
    const code = contractWith('function foo() public { uint _myVar; }');
    const report = processStr(code, config);

    assert.equal(report.errorCount, 0);
  });
});
