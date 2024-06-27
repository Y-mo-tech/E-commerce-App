const Product = require ('./productSchema')

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

async function productAvailability(req, res){
    try{
        console.log("inside product availability fxn")
        const {name, quantity} = req.query

        console.log("name , quantity", name, quantity)
        
        let product = await Product.findOne({name: name})

        if(!product){
            return res.status(400).json({message: "Product not present !!"})
        }
        
        if(product.quantity < quantity){
            return res.status(200).json({message: "Not in stock !!"})
        }

        let updateProduct = await Product.findOneAndUpdate({name: name}, {$inc: {quantity: -quantity}}, {new: true})

        return res.status(200).json({isFound: true})

    } catch(err){
        return res.status(500).json({message: err.message})
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

