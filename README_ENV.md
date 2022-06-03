## webpack
Two core dependencies to add:
1. `webpack`: which include all core webpack functionality.
2. `webpack-cli`: enable running webpack from the command line.

Since we also use the following tools. So just install them.
1. `style-loader`
2. `css-loader`
3. `inline-source-map`
4. `html-webpack-plugin`

`style-loader` and `css-loader` import `.css` stylesheets for us. `inline-source-map` is for debugging. `htmal-webpack-plugin` can automaticlly generate `index.html` file for each build.

Here's the official doc: [Webpack Guides](https://webpack.js.org/guides/).


## jest
Simply install `jest` module into dev-dependencies.

### Handling Static Assets
In the unit test we want our app to be isolated from assets such as `.css` stylesheets or images. To mock them out we create 2 mock files under `__mocks__` direction:
1. `styleMock.js`
2. `fileMock.js` 

To tell Node which mock file to use for different types of assets, we add `moduleNameMapper` configuration in `package.json`.

For more information, check this doc: [Using Jest with Webpack](https://jestjs.io/docs/webpack)


## babel
Development Dependencies:
1. `@babel/core`
2. `@babel/preset-env`
3. `@babel/plugin-transform-runtime`

Runtime Dependency:
1. `@babel/runtime`

Babel configuration is extracted from `webpack.config.js` into `babel.config.json`, since Webpack is not the only module who needs babel. **Jest needs babel too!**

We use `@babel/preset-env` as our preset. It requires the folowing 2 packages:
1. `@babel/core`
2. `@babel/preset-env`

Babel injects helpers into each file. Thus functions like `_classCallCheck` repeat in every file.
```js
class Circle {}
```

turns into:
```js
function _classCallCheck(instance, Constructor) {
  //...
}

var Circle = function Circle() {
  _classCallCheck(this, Circle);
};
```

So we need `@babel/runtime` to avoid the duplication (by referencing these functions to runtime library).
```js
var _classCallCheck = require("@babel/runtime/helpers/classCallCheck");

var Circle = function Circle() {
  _classCallCheck(this, Circle);
};
```

This is where `@babel/plugin-transform-runtime` comes in. It does these transformations for us.

For more details, check this doc: [Doc babel-runtime](https://babeljs.io/docs/en/babel-runtime).

##### Note: The default setting of `fullySepecified` is `true`, which force us to add `.js` extention when import like this: `import foo from 'foo.js'`. We simply turn it off.
```javascript
  resolve: {
    fullySpecified: false
  },
```

### babel for webpack
We need `babel-loader` to call babel to transpile code for us. The configuration file `babel.config.json` remains the same.

For more information check this doc: [Webpack: babel-loader](https://webpack.js.org/loaders/babel-loader/)

## eslint
First, of course we need to add `eslint` dependency. Then simply run the following command line to set up a `.eslintrc` configuration file.
```sh
npm init @eslint/config
```

Here is an official doc: [Getting Started with ESLint](https://eslint.org/docs/user-guide/getting-started).

### eslint-config-airbnb
Run the following command, 
```sh
npx install-peerdeps --dev eslint-config-airbnb
```

We will see it requires two dependencies:
1. `eslint`
2. `eslint-plugin-import`

But if we choose `airbnb` option, `npm init @eslint/config` will automatically install the above packages for us. We don't need to do anything.

The official doc is here: [eslint-config-airbnb package](https://www.npmjs.com/package/eslint-config-airbnb).

## react

### babel for react
React needs babel to transform JSX. The actual plugin which dose this job is: `@babel/plugin-transform-react-jsx`. But since we have `@babel/preset-react` which always includes `@babel/plugin-transform-react-jsx` (and some other useful plugins). We go for `@babel/preset-react`.

Currently, the old transform {"runtime": "classic"} is the default option. To enable the new transform, we can pass {"runtime": "automatic"} as an option to `@babel/preset-react`.
```json
{
  "presets": [
    ["@babel/preset-react", {
      "runtime": "automatic"
    }]
  ]
}
```

### eslint for react
After choosing `react` in `@eslint/config` process, another three dependencies need to be added,
1. eslint-plugin-react@version
2. eslint-plugin-jsx-a11y@version
3. eslint-plugin-react-hooks@version

But they will all be installed automatically. 


## typescript
First of all, need to install typescript compiler(cli `tsc`): `typescript` package.

### using babel to compile typescript
We use the hybrid approach, using Babel’s `preset-typescript` to generate your JS files, and then using TypeScript to do type checking and .d.ts file generation.

We need to install `@babel/preset-typescript`, and add it to `babel.config.json`.
```json
{
  "presets": [
    ["@babel/preset-typescript"]
  ],
}
```

Now we can compile `.ts` file into `.js` file with command:
```shell
webpack
```

and check the type and generate `.d.ts` declaration file with command:
```shell
tsc
```

At last we create two alias `build` and `check` for `webpack` and `tsc` in `package.json`,
```json
"scripts": {
  "build": "webpack",
  "check": "tsc"
}
```

For more details, please check the official doc: 
1. [Using Babel with TypeScript](https://www.typescriptlang.org/docs/handbook/babel-with-typescript.html)
2. [@babel/preset-typescript](https://babeljs.io/docs/en/babel-preset-typescript)

Another alternative solution is to install the loader: `ts-loader`. Here is the doc: [Typescript in webpack](https://webpack.js.org/guides/typescript/).

### configuration
`tsconfig.json` is the configuration file. Since we only use `tsc` to do type checking, make sure the following flags are enabled in `tsconfig.json`:
```json
"compilerOptions": {
  // Ensure that .d.ts files are created by tsc, but not .js files
  "declaration": true,
  "emitDeclarationOnly": true,
  // Ensure that Babel can safely transpile files in the TypeScript project
  "isolatedModules": true
}
```

Note: `React` is not the default export of `react` package. To allow importing react module as we used to,
```
import React from 'react'
```

we need to set `allowSyntheticDefaultImports` option to `true`. 
```json
  "compilerOptions": {
    // Allow importing non default export as default
    "allowSyntheticDefaultImports": true,
  }
  ```

This doc explains why: [Module has no default export](https://github.com/DefinitelyTyped/DefinitelyTyped/issues/33097)

### eslint with typescript
For better experience, always choose `google` eslint standard instead of `airbnb`. 