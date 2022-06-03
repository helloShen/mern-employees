!/bin/zsh

### git
git init
touch .gitignore
ignoreScript='# vscode\n.vscode/\n# npm\npackage-lock.json\nnode_modules/'
echo $ignoreScript > .gitignore

### project
mkdir dist
# mkdir src
# touch index.html
mkdir __tests__

### npm
#npm init -y

### webpack 
npm install --save-dev webpack webpack-cli style-loader css-loader inline-source-map html-webpack-plugin 

### babel
npm install --save-dev babel-loader @babel/core @babel/preset-env @babel/plugin-transform-runtime @babel/preset-react
npm install --save @babel/runtime

### jest
npm install --save-dev jest

### react
npm install react react-dom
npm install --save-dev react-router-dom

### eslint & airbnb config
npm install --save-dev eslint eslint-plugin-import
npm init @eslint/config

### react-icons
npm install react-icons --save

### mui
npm install @mui/material @emotion/react @emotion/styled
npm install @mui/icons-material

### server
npm install mongodb mongoose express cors dotenv helmet morgan jade express-handlebars
npm install --save-dev nodemon

### typescript
npm install --save-dev typescript
npm install --save-dev @babel/preset-typescript
#Alternative solution is ts-loader if we use tsc instead of babel to compile .ts file to .js
# npm install --save-dev ts-loader
npm install --save @types/node @types/react @types/react-dom @types/jest @types/react-router-dom @types/express @types/cors @types/debug


