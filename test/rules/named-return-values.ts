import assert from 'assert';
import linter from '../utils/parsers';
const contractWith = require('solhint/test/common/contract-builder').contractWith;

const config = {
  rules: { 'named-return-values': 'error' },
};

describe('Linter - named-return-values', () => {
  it('should raise error for unnamed return values', () => {
    const code = contractWith('function test() returns (uint) {}');
    const report = linter.processStr(code, config);

    assert.equal(report.errorCount, 1);
    assert.ok(report.messages[0].message == `Return value 'uint' in function 'test' must be named`);
  });

  it('should raise error for unnamed return values in multiple return values', () => {
    const code = contractWith('function test() returns (uint, int) {}');
    const report = linter.processStr(code, config);
    assert.equal(report.errorCount, 2);
    assert.ok(report.messages[0].message == `Return value 'uint' in function 'test' must be named`);
    assert.ok(report.messages[1].message == `Return value 'int' in function 'test' must be named`);
  });

  it('should raise error for unnamed return value and named return value', () => {
    const code = contractWith('function test() returns (uint, uint _test) {}');
    const report = linter.processStr(code, config);

    assert.equal(report.errorCount, 1);
    assert.ok(report.messages[0].message == `Return value 'uint' in function 'test' must be named`);
  });

  it('should not raise error for named return values', () => {
    const code = contractWith('function test() returns (uint a) {}');
    const report = linter.processStr(code, config);

    assert.equal(report.errorCount, 0);
  });

  it('should not raise error for multiple named return values', () => {
    const code = contractWith('function test() returns (uint a, uint b) {}');
    const report = linter.processStr(code, config);

    assert.equal(report.errorCount, 0);
  });

  it('should not raise error for no return values', () => {
    const code = contractWith('function test() {}');
    const report = linter.processStr(code, config);

    assert.equal(report.errorCount, 0);
  });
});
