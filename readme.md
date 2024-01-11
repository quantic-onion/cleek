# HOW TO PUBLISH A NEW VERSION

En la carpeta /package correr estos comandos:
```bash
npm version patch
npm run build
npm publish
```

- **patch** aumenta la versión del paquete en el package.json
- **build** compila
- **publish** sube el paquete a npm

# HOW TO USE SANDBOX
cd package
yarn link
cd ../sbox
yarn
yarn link cleek
yarn run dev