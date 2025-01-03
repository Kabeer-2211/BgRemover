const fs = require('fs');
const { removeBg: removeBgService } = require('../services/RemoveBg.service');

async function removeBg(req, res) {
    try {
        const images = [];
        for (const file of req.files) {
            const buffer = await removeBgService(file.path);
            fs.unlinkSync(file.path);
            const filename = file.filename.split('.')[0];
            fs.writeFileSync(`./public/TEMP/${filename}.png`, buffer, 'base64');
            images.push(`${process.env.BASE_URL}/TEMP/${filename}.png`);
        };
        res.json({ success: true, message: 'Background removed successfully', data: images });
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: 'Something went wrong while removing background' });
    }
}

module.exports = { removeBg };