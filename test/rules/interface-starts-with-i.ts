import assert from 'assert';
import { processStr } from '../utils/parsers';
import { interfaceWith } from '../utils/interface-builder';

const config = {
  rules: { 'interface-starts-with-i': 'error' },
};

describe('Linter - interface-starts-with-i', () => {
  it('should raise error for interface not starting with I', () => {
    const code = interfaceWith('Test', '');
    const report = processStr(code, config);

    assert.equal(report.errorCount, 1);
    assert.ok(report.messages[0].message == `Interface name 'Test' must start with "I"`);
  });

  it('should not raise error for interface starting with I', () => {
    const code = interfaceWith('ITest', '');
    const report = processStr(code, config);

    assert.equal(report.errorCount, 0);
  });
});
