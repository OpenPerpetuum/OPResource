const mkdirp = require('mkdirp');
const fs = require('fs');
const path = require('path');
console.log(__dirname);
const startZoneId = 100;
const endZoneId = 141;
const layerTypes = ['altitude', 'blocks', 'control', 'plants'];
const gitignore = '*\n!.gitignore';
for (const layerType of layerTypes) {
    for (let i = startZoneId; i < endZoneId; i++) {
        const zoneId = `${i}`.padStart(4, '0');
        const folder = path.join(__dirname, `lang0000`, `layers`, `${zoneId}`, `${layerType}${zoneId}`).toString();
        mkdirp.sync(folder);
        fs.writeFileSync(path.join(folder, '.gitignore'), gitignore);
    }
}
