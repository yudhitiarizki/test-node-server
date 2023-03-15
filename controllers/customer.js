const { Customers } = require('../models');
const { Uploads } = require('../middlewares/uploadImage');

const createCustomers = async (req, res) => {
    try {
        const { nama, contact, email, alamat, ktp, diskon, type_diskon } = data_customer;

        await Customers.create({
            nama, contact, email, alamat, ktp, diskon, type_diskon
        })

        return res.status(200).json({
            message: 'Customers has been created!'
        })

    } catch (error) {
        console.log(`${req.method} ${req.originalUrl} : ${error.message}`);
        return res.status(400).json({
            message: 'Failed to create customers',
        });
    }
}

const getCustomer = async (req, res) => {
    try {
        const customer = await Customers.findAll();

        return res.status(200).json({
            data: customer
        })
    } catch (error) {
        console.log(`${req.method} ${req.originalUrl} : ${error.message}`);
        return res.status(400).json({
            message: 'Failed to retrive customer',
        });
    }
}

const deleteCustomer = async (req, res) => {
    try {
        const { customerId } = req.params;

        const deleteCount = await Customers.destroy({
            where: { customerId }
        });

        if (deleteCount < 1){
            return res.status(401).json({
                message: 'The Customer was not properly deleted.',
              });
        }

        return res.status(200).json({
            message: 'Customer has been deleted'
        })
    } catch (error) {
        console.log(`${req.method} ${req.originalUrl} : ${error.message}`);
        return res.status(400).json({
            message: 'Failed to delete customer',
        });
    }
}

const getCustomerbById = async (req, res) => {
    try {
        const { customerId } = req.params;

        const customer = await Customers.findOne({
            where: { customerId }
        });

        return res.status(200).json({
            data: customer
        })
    } catch (error) {
        console.log(`${req.method} ${req.originalUrl} : ${error.message}`);
        return res.status(400).json({
            message: 'Failed to retrive customer',
        });
    }
}

const updateCustomer = async (req, res) => {
    try {
      const { nama, contact, email, alamat, diskon, type_diskon, ktp } = req.body;
      const { customerId } = req.params;
  
      const customer = await Customers.findOne({
        where: { customerId }
      });
  
      if (!customer) {
        return res.status(404).json({
          message: 'Customer not found'
        });
      }

      var countUpdate = 0

      if(ktp.update){
        const image = req.protocol + '://' + req.get('host') + '/' + await Uploads(ktp.image, 'images');
        
        countUpdate = await Customers.update(
                { nama, contact, email, alamat, diskon, ktp: image },
                { where: { customerId }}
            );
      } else {
        countUpdate = await Customers.update(
            { nama, contact, email, alamat, diskon },
            { where: { customerId }}
        );
      }

      if (countUpdate < 1){
        return res.status(401).json({
            message: 'Customer not update'
        });
    };
  
      return res.status(200).json({
        message: 'Customer has been updated!'
      });
    } catch (error) {
      console.log(`${req.method} ${req.originalUrl} : ${error.message}`);
      return res.status(400).json({
        message: 'Failed to update customer',
      });
    }
};

  

module.exports = { createCustomers, getCustomer, deleteCustomer, getCustomerbById, updateCustomer };