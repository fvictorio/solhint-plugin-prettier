[![image](https://img.shields.io/npm/v/solhint-plugin-wonderland.svg?style=flat-square)](https://www.npmjs.org/package/solhint-plugin-wonderland)

# solhint-plugin-wonderland

This [Solhint](https://github.com/protofire/solhint/) plugin provides [Wonderland](https://github.com/defi-wonderland) custom rules.

## Setup

First install the necessary packages:

```
npm install --save-dev solhint solhint-plugin-wonderland
```

Then add a `.solhint.json` configuration file:

```json
{
  "plugins": ["wonderland"]
}
```

## Available rules

### non-state-vars-leading-underscore

This rule will alert everytime a variable defined inside a function does not have a leading underscore.
