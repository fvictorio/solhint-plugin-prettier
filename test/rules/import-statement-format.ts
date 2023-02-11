import assert from 'assert';
import linter from '../utils/parsers';
const { times } = require('lodash');

const config = {
  rules: { 'import-statement-format': 'error' },
};

describe('Linter - import-statement-format', () => {
  it('should raise error for import statement with no alias', () => {
    const importPath = 'path/test.sol';
    const code = contractWithImports(`import "${importPath}";`);
    const report = linter.processStr(code, config);
    assert.equal(report.errorCount, 1);
    assert.ok(
      report.messages[0].message == `Import '${importPath}' in contract A should be declared as import {contract_to_import} from path/test.sol;`
    );
  });

  it('should not raise error for import statement with alias', () => {
    const code = contractWithImports('import {contract_to_import} from "path/test.sol";');
    const report = linter.processStr(code, config);

    assert.equal(report.errorCount, 0);
  });
});

function contractWithImports(code) {
  return `
      pragma solidity 0.4.4;
      ${code}  
        
      contract A {
      }
    `;
}
