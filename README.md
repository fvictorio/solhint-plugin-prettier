# solhint-plugin-prettier

This [Solhint](https://github.com/protofire/solhint/) plugin lets you check that
your solidity files are correctly formatted according to the [solidity plugin
for Prettier](https://github.com/prettier-solidity/prettier-plugin-solidity).
Each difference with how prettier would format it is reported as an individual
issue.

## Setup

First install the necessary packages:

```
npm install --save-dev solhint solhint-plugin-prettier prettier prettier-plugin-solidity
```

Then add a `.solhint.json` configuration file:

```json
{
  "plugins": ["prettier"],
  "rules": {
    "prettier/prettier": "error"
  }
}
```

This rule will emit an error for each difference between your code and how prettier-solidity would format it. You can also set it to `warning` instead of `error` if you prefer that.
