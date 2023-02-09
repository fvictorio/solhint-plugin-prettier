import fs from 'fs';
import * as parser from '@solidity-parser/parser';
import glob from 'glob';
import ignore from 'ignore';
import astParents from 'ast-parents';
import { applyExtends } from 'solhint/lib/config/config-file';
import Reporter from 'solhint/lib/reporter';
import TreeListener from 'solhint/lib/tree-listener';
import checkers from './checkers';

function parseInput(inputStr) {
  try {
    // first we try to parse the string as we normally do
    return parser.parse(inputStr, { loc: true, range: true });
  } catch (e) {
    // using 'loc' may throw when inputStr is empty or only has comments
    return parser.parse(inputStr, {});
  }
}

function processStr(inputStr, config = {}, fileName = '') {
  config = applyExtends(config);

  let ast;
  try {
    ast = parseInput(inputStr);
  } catch (e) {
    if (e instanceof parser.ParserError) {
      const reporter = new Reporter([], config);
      for (const error of e.errors) {
        reporter.addReport(error.line, error.column, Reporter.SEVERITY.ERROR, `Parse error: ${error.message}`);
      }
      return reporter;
    } else {
      throw e;
    }
  }

  const tokens = parser.tokenize(inputStr, { loc: true });
  const reporter = new Reporter(tokens, config);
  const listener = new TreeListener(checkers(reporter, config, inputStr, tokens, fileName));

  astParents(ast);
  parser.visit(ast, listener);

  return reporter;
}

function processFile(file, config) {
  const report = processStr(fs.readFileSync(file).toString(), config, file);
  report.file = file;

  return report;
}

function processPath(path, config) {
  const ignoreFilter = ignore().add(config.excludedFiles);

  const allFiles = glob.sync(path, {});
  const files = ignoreFilter.filter(allFiles);

  return files.map((curFile) => processFile(curFile, config));
}

module.exports = { processPath, processFile, processStr };
