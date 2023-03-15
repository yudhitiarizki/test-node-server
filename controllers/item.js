const { Items } = require('../models');
const { Uploads } = require('../middlewares/uploadImage');

const createItems = async (req, res) => {
    try {
        const { nama_item, unit, stok, harga_satuan, barang } = data_items;

        await Items.create({
            nama_item, unit, stok, harga_satuan, barang
        })

        return res.status(200).json({
            message: 'Items has been created!'
        })

    } catch (error) {
        console.log(`${req.method} ${req.originalUrl} : ${error.message}`);
        return res.status(400).json({
            message: 'Failed to create Items',
        });
    }
}

const getItems = async (req, res) => {
    try {
        const item = await Items.findAll();

        return res.status(200).json({
            data: item
        })
    } catch (error) {
        console.log(`${req.method} ${req.originalUrl} : ${error.message}`);
        return res.status(400).json({
            message: 'Failed to retrive item',
        });
    }
}

const deleteItems = async (req, res) => {
    try {
        const { itemId } = req.params;

        const deleteCount = await Items.destroy({
            where: { itemId }
        });

        if (deleteCount < 1){
            return res.status(401).json({
                message: 'The Item was not properly deleted.',
              });
        }

        return res.status(200).json({
            message: 'Item has been deleted'
        })
    } catch (error) {
        console.log(`${req.method} ${req.originalUrl} : ${error.message}`);
        return res.status(400).json({
            message: 'Failed to delete Item',
        });
    }
}

const getItemById = async (req, res) => {
    try {
        const { itemId } = req.params;

        const item = await Items.findOne({
            where: { itemId }
        });

        return res.status(200).json({
            data: item
        })
    } catch (error) {
        console.log(`${req.method} ${req.originalUrl} : ${error.message}`);
        return res.status(400).json({
            message: 'Failed to retrive item',
        });
    }
}

const updateItems = async (req, res) => {
    try {
        const { nama_item, unit, stok, harga_satuan, barang } = req.body;
        const { itemId } = req.params;
    
        const item = await Items.findOne({
          where: { itemId }
        });
    
        if (!item) {
          return res.status(404).json({
            message: 'Item not found'
          });
        }
  
        var countUpdate = 0

  
        if(barang.update){
          const image = req.protocol + '://' + req.get('host') + '/' + await Uploads(barang.image, 'images');
          
          countUpdate = await Items.update(
            { nama_item, unit, stok, harga_satuan, barang: image },
            { where: { itemId } });
        } else {
            countUpdate = await Items.update(
                { nama_item, unit, stok, harga_satuan },
                { where: { itemId } });
        }
  
        if (countUpdate < 1){
          return res.status(401).json({
              message: 'Item not update'
          });
      };
    
        return res.status(200).json({
          message: 'Item has been updated!'
        });
      } catch (error) {
        console.log(`${req.method} ${req.originalUrl} : ${error.message}`);
        return res.status(400).json({
          message: 'Failed to update Item',
        });
      }
}

module.exports = { createItems, getItems, deleteItems, getItemById, updateItems }