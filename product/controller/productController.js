const Product = require ('../db/productSchema')

const DB_Concurrency_Error = 'Concurrency_DB_Error'

async function addProducts(req, res){
    try{
        console.log("inside add product fxn-------")
       const {name, price, category, quantity} = req.body
       if(!name || !price || !category || !quantity || quantity == 0){
        return res.status(400).json({message : "Provide all fields properly !!!"})
       }
       const productExist = await Product.findOne({name: name})

       if(productExist){
          return res.status(400).json({message: "Product already exists !!!"})
       }

       const product = new Product({
        name: name,
        price: price,
        category: category,
        quantity: quantity
       })

       await product.save()

       return res.status(200).json({message: "Products added successfully !!!"})


    } catch(err){
       return res.status(500).json({message: err.message})
    }
}

async function updateProduct(req, res){
    try{
        const {productId, quantity} = req.body
        console.log(productId, quantity)

        if(!productId || !quantity){
            return res.status(400).json({message : "Fields not recieved !!!"})
        }

        const updateQuantity = await Product.findByIdAndUpdate(productId, {$inc: {quantity: quantity}}, {new: true})
        console.log(updateQuantity)

        return res.status(200).json({message: "Product updated successfully", updateQuantity})

    } catch(err){
        return res.status(500).json({message: err.message})
    }
}

async function getProductDetails(req, res){
    try{
       const {productId} = req.body
       //console.log("productId", productId)
       if(!productId){
        return res.status(400).json({message: "ProductId not found !!!"})
       }

       const product = await Product.findById(productId)
      
       return res.status(200).send(product)
    } catch(err){
        res.status(200).json({message: err.message})
    }
}

async function listProducts(req, res){
    try{
        const {category} = req.body;

        if(!category){
            return res.status(400).json({message: "Please enter category !!!"})
        }

        const products = await Product.find({category: category})

        if(!products){
            return res.status(200).json({message: "No products found !!!"})
        }

        return res.status(200).send(products)
    } catch(err){
        return res.status(500).json({message: err.message})
    }
}

async function deleteProduct(req, res){
    try{
        const {productId} = req.body
        
        if(!productId){
            return res.status(400).json({message: "Product id not found !!!"})
        }

        let deleteProduct = await Product.findOneAndDelete(productId)

        console.log("deleteProduct", deleteProduct)

        if(!deleteProduct){
            return res.status(400).json({message: "Product does not exist !!!"})
        }

        return res.status(200).json({message: "Product deleted !!!", deleteProduct})
    } catch(err){
        return res.status(500).json({message: err.message})
    }
}

const updateProductQuantityWithRetry = async (productId, quantity, retries = 3) => {
    for (let i = 0; i < retries; i++) {
        try {
            await updateProductQuantity(productId, quantity);
            return;
        } catch (err) {
            if (i === retries - 1) {
                throw err;
            }
            console.log('Retrying update...');
        }
    }
};

async function productAvailability(req, res){

    const {product_id, quantity} = req.body
    const retries = 3

    for (let i = 0; i < retries; i++) {
        try {
            await updateProductQuantity(product_id, quantity);
            return res.status(200).json({success: true, message: 'Product quantity placed!'});
        } catch (err) {

            if (err.message != DB_Concurrency_Error){
                return res.status(400).json({message: err.message})
            }

            if (i === retries - 1) {
                return res.status(400).json({message: 'Order can not be placed, Please try again later.'})
            }

            console.log('Retrying update...');
        }
    }



}

const updateProductQuantity = async (product_id, quantity)=>{
    try{
        console.log("inside updateProductQuantity fxn")

        let product = await Product.findOne({_id: product_id})

        if(!product){
            throw new Error("Product not present !!")
            // return res.status(400).json({message: "Product not present !!"})
        }

        if(product.quantity < quantity){
            throw new Error("Not in stock !!")
            // return res.status(200).json({message: "Not in stock !!"})
        }

        let result = await Product.updateOne(
            {_id: product._id,
                version: product.version
            },
            {
                $set: {
                    quantity: product.quantity - quantity
                },
                $inc:{
                    version:1
                }
            },
            {new: true}
        )

        if (result.nModified === 0) {
            throw new Error(DB_Concurrency_Error);
        }

        return {message: 'Order Placed'}

    } catch(err){
        throw err
        // return res.status(500).json({message: err.message})
    }
}

module.exports = {
    addProducts,
    updateProduct,
    getProductDetails,
    listProducts,
    deleteProduct,
    productAvailability
}

