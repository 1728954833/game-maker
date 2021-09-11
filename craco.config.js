const path = require('path');
const CracoLessPlugin = require('craco-less');

const pathResolve = pathUrl => path.join(__dirname, pathUrl)

module.exports = {
    babel: {
        plugins: [[
            "@babel/plugin-proposal-decorators",
            {
                legacy: true
            }
        ]]
    },
    webpack: {
        alias: {
            'style': pathResolve('src/style')
        }
    },
    plugins: [
        {
            plugin: CracoLessPlugin,
            options: {
                lessLoaderOptions: {
                    lessOptions: {
                        modifyVars: { '@primary-color': '#1DA57A' },
                        javascriptEnabled: true,
                    },
                },
            },
        },
    ],
};