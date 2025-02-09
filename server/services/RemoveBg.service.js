const { removeBackground } = require('@imgly/background-removal-node');
const path = require('path');

const removeBg = async (imageSource) => {
    try {
        const blob = await removeBackground(`file://${path.resolve(imageSource)}`);
        const buffer = await Buffer.from(await blob.arrayBuffer());
        return buffer;
    } catch (err) {
        console.log(err);
        return null;
    }
}

module.exports = { removeBg };
