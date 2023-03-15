const RE_HTML_ERROR = /<[\s\S]*?>/; 
const { Uploads } = require('./uploadImage')

const authCustomer = async (req, res, next) => {
    var { nama, contact, email, alamat, diskon, type_diskon, ktp } = req.body;

    if( nama.match(RE_HTML_ERROR) || contact.match(RE_HTML_ERROR) || alamat.match(RE_HTML_ERROR) ){
        return res.status(400).send({
            message: 'Dont write HTML Tag on Field'
        });
    };

    ktp = req.protocol + '://' + req.get('host') + '/' + await Uploads(ktp, 'images');

    data_customer = { nama, contact, email, alamat, ktp, diskon, type_diskon };

    next();
}

const authItems = async (req, res, next) => {
    var { nama_item, unit, stok, harga_satuan, barang } = req.body;

    if( nama_item.match(RE_HTML_ERROR) || unit.match(RE_HTML_ERROR) ){
        return res.status(400).send({
            message: 'Dont write HTML Tag on Field'
        });
    };

    barang = req.protocol + '://' + req.get('host') + '/' + await Uploads(barang, 'images');

    data_items = { nama_item, unit, stok, harga_satuan, barang }

    next();
}

module.exports = { authCustomer, authItems };