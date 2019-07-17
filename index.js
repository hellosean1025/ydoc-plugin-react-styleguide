const styleguidist = require ('react-styleguidist');
const path = require ('path');
const indexFile = 'index.html';
const fs = require('fs')

function runBuild (inst) {
  return new Promise ((resolve, reject) => {
    inst.build ((err, config) => {
      if (err) {
        console.log (err);
        reject (err);
      } else {
        console.log ('Style guide published to', config.styleguideDir);
        resolve (true);
      }
    });
  });
}

module.exports = {
  init: async function () {
    const dist = this.config.dist;
    const root = process.cwd ();
    const componentsPath = path.resolve (dist, 'react-components');

    const config = this.options;
    config.webpackConfig.context = root;
    config.styleguideDir = componentsPath
    try{
      fs.mkdirSync(componentsPath);
    }catch(err){ }

    if (process.env.NODE_ENV === 'production') {
      const inst = styleguidist (config);
      await runBuild (inst);
      let content = fs.readFileSync (
        path.resolve (componentsPath, indexFile),
        'utf8'
      );

      let htmlPath = path.resolve (componentsPath +'/ydoc-replace.html');
      fs.writeFileSync (
        htmlPath,
        content
      );

      let iframe = `<iframe src='ydoc-replace.html' style="border:none" width="100%" height="100%"></iframe>`
      fs.writeFileSync (
        path.resolve (componentsPath, indexFile),
        iframe
      );
    } else {
      fs.writeFileSync (
        path.resolve (componentsPath, indexFile),
        `<iframe src="${'http://localhost:6060/'}" style="border:none" width="100%" height="100%" ></iframe>`
      );
    }
  }
};
