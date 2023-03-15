const { Sales, SalesItems, Items, Customers } = require('../models');

const createSales = async (req, res) => {
    try {
        const { customerId, items } = req.body;

        const code_transaksi = "TRS-" + Date.now();

        let total_harga = 0;
        let total_diskon = 0;

        for (const item of items) {
            const it = await Items.findOne({ where: { itemId: item.itemId }});
            if (item.qty > it.stok) {
                return res.status(400).json({
                    message: `Item ${it.nama_item} is out of stock!`,
                });
            }
            const harga = it.harga_satuan * item.qty;
            total_harga = total_harga + harga;

            await Items.update({ stok: it.stok - item.qty }, { where: { itemId: item.itemId }});
        }

        await Customers.findOne({ where: {customerId} }).then(response => {
            if (response.type_diskon === "persentase"){
                total_diskon = total_harga * (response.diskon / 100);
            } else {
                total_diskon = response.diskon
            }
        });

        const total_bayar = total_harga - total_diskon;

        const tanggal = new Date();

        const tanggal_transaksi = tanggal.getFullYear() + '-' + 
                            ('0' + (tanggal.getMonth() + 1)).slice(-2) + '-' + 
                            ('0' + tanggal.getDate()).slice(-2);

        const sales = await Sales.create({
            code_transaksi, tanggal_transaksi, customerId, total_diskon, total_bayar, total_harga
        })

        items.forEach(async item => {
            await SalesItems.create({itemId: item.itemId, qty: item.qty, salesId: sales.salesId})
        });

        const data = await Sales.findOne({ 
            where: { salesId: sales.salesId },
            include: {
                model: SalesItems,
                attributes: ['itemId', 'qty'],
                include: {
                    model: Items,
                    attributes: ['nama_item', 'barang']
                }
            }})

        return res.status(200).json({
            message: 'Sales has been created!',
            data
        })

    } catch (error) {
        console.log(`${req.method} ${req.originalUrl} : ${error.message}`);
        return res.status(400).json({
            message: 'Failed to create Sales',
        });
    }
}


const getSales = async (req, res) => {
    try {
        const data = await Sales.findAll({
            include: [{
                model: SalesItems,
                attributes: ['itemId', 'qty'],
                include: {
                    model: Items,
                    attributes: ['nama_item', 'barang']
                }
            }, {
                model: Customers
            }]})

        return res.status(200).json({
            data
        })

    } catch (error) {
        console.log(`${req.method} ${req.originalUrl} : ${error.message}`);
        return res.status(400).json({
            message: 'Failed to retrive Sales',
        });
    }
}

const deleteSales = async (req, res) => {
    try {
        const { salesId } = req.params;

        const deleteCount = await Sales.destroy({
            where: { salesId }
        });

        if (deleteCount < 1){
            return res.status(401).json({
                message: 'The Sales was not properly deleted.',
              });
        }

        return res.status(200).json({
            message: 'Sales has been deleted'
        })
    } catch (error) {
        console.log(`${req.method} ${req.originalUrl} : ${error.message}`);
        return res.status(400).json({
            message: 'Failed to delete sales',
        });
    }
}

const getSalesById = async (req, res) => {
    try {
        const { salesId } = req.params;

        const data = await Sales.findOne({ 
            where: { salesId },
            include: [{
                model: SalesItems,
                attributes: ['itemId', 'qty'],
                include: {
                    model: Items
                }
            }, {
                model: Customers
            }]})

        return res.status(200).json({
            data
        })
    } catch (error) {
        console.log(`${req.method} ${req.originalUrl} : ${error.message}`);
        return res.status(400).json({
            message: 'Failed to retrive item',
        });
    }
}

module.exports = { createSales, getSales, deleteSales, getSalesById }