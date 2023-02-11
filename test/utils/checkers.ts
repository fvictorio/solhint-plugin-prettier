import chalk from 'chalk';
import _ from 'lodash';
import security from 'solhint/lib/rules/security/index';
import naming from 'solhint/lib/rules/naming/index';
import order from 'solhint/lib/rules/order/index';
import bestPractises from 'solhint/lib/rules/best-practises/index';
import deprecations from 'solhint/lib/rules/deprecations/index';
import miscellaneous from 'solhint/lib/rules/miscellaneous/index';
import configObject from 'solhint/lib/config';
import { validSeverityMap } from 'solhint/lib/config/config-validator';
import NamedReturnValuesChecker from '../../rules/named-return-values';
import NonStateVarsLeadingUnderscoreChecker from '../../rules/non-state-vars-leading-underscore';
import StructNameCamelCaseChecker from '../../rules/struct-name-camelcase';

const notifyRuleDeprecated = _.memoize((ruleId: String, deprecationMessage: String) => {
  const message = deprecationMessage
    ? `[solhint] Warning: rule '${ruleId}' is deprecated, ${deprecationMessage}.`
    : `[solhint] Warning: rule '${ruleId}' is deprecated.`;
  console.warn(chalk.yellow(message));
});

const notifyRuleDoesntExist = _.memoize((ruleId: String) => {
  console.warn(chalk.yellow(`[solhint] Warning: Rule '${ruleId}' doesn't exist`));
});

module.exports = function checkers(reporter, configVals, inputSrc, tokens, fileName) {
  const config = configObject.from(configVals);
  const { rules } = config;
  const meta = {
    reporter,
    config,
    inputSrc,
    tokens,
    fileName,
  };
  const plugins = config.plugins || [];

  const allRules = [...coreRules(meta), ...pluginsRules(plugins, meta)];

  const enabledRules = allRules.filter((coreRule) => ruleEnabled(coreRule, rules));

  // show warnings for deprecated rules
  for (const rule of enabledRules) {
    if (rule.meta && rule.meta.deprecated) {
      notifyRuleDeprecated(rule.ruleId, rule.meta.deprecationMessage);
    }
  }

  const configRules = Object.keys(config.rules);
  const allRuleIds = allRules.map((rule) => rule.ruleId);
  for (const rule of configRules) {
    if (!allRuleIds.includes(rule)) {
      notifyRuleDoesntExist(rule);
    }
  }

  return enabledRules;
};

function coreRules(meta) {
  const { reporter, config, inputSrc, tokens } = meta;

  const wonderlandPluginRules = [new NamedReturnValuesChecker(reporter), new NonStateVarsLeadingUnderscoreChecker(reporter), new StructNameCamelCaseChecker(reporter)];

  return [
    ...bestPractises(reporter, config, inputSrc),
    ...deprecations(reporter),
    ...miscellaneous(reporter, config, tokens),
    ...naming(reporter, config),
    ...order(reporter, tokens),
    ...security(reporter, config, inputSrc),
    ...wonderlandPluginRules,
  ];
}

function loadPlugin(pluginName: String, { reporter, config, inputSrc, fileName }) {
  let plugins;
  try {
    plugins = require(`solhint-plugin-${pluginName}`);
  } catch (e) {
    console.error(chalk.red(`[solhint] Error: Could not load solhint-plugin-${pluginName}, make sure it's installed.`));
    process.exit(1);
  }

  if (!Array.isArray(plugins)) {
    console.warn(chalk.yellow(`[solhint] Warning: Plugin solhint-plugin-${pluginName} doesn't export an array of rules. Ignoring it.`));
    return [];
  }

  return plugins
    .map((Plugin) => new Plugin(reporter, config, inputSrc, fileName))
    .map((plugin) => {
      plugin.ruleId = `${pluginName}/${plugin.ruleId}`;
      return plugin;
    });
}

function pluginsRules(configPlugins, meta) {
  const plugins = Array.isArray(configPlugins) ? configPlugins : [configPlugins];

  return _(plugins)
    .map((name: String) => loadPlugin(name, meta))
    .flatten()
    .value();
}

function ruleEnabled(coreRule, rules) {
  let ruleValue: string = '';
  if (rules && !Array.isArray(rules[coreRule.ruleId])) {
    ruleValue = rules[coreRule.ruleId];
  } else if (rules && Array.isArray(rules[coreRule.ruleId])) {
    ruleValue = rules[coreRule.ruleId][0];
  }

  if (rules && rules[coreRule.ruleId] !== undefined && ruleValue && validSeverityMap.includes(ruleValue)) {
    return coreRule;
  }
}
