const Order = require('../db/orderSchema')
const axios = require('axios')

async function addOrder(req, res){
    try{
        console.log("indsie add order fxn++++++++++++++++++++++++")
        const {product_id, quantity} = req.body;
        // console.log(product_id, quantity)
        const {userId} = req.auth

        console.log("userId-----------", userId)

        if(!product_id || !quantity){
            return res.status(400).json({message: "Please enter fields properly !!"})
        }

        let url = 'http://product-service:8001/productAvailability'
        let params = {
            product_id: product_id,
            quantity: quantity
        }

        let response = await axios.post(url, params)

        console.log("response in addorder axios-=--=-=-=-=", response.data)

        if(response.status == 200){

            let order = new Order({
                product_id: product_id,
                quantity: quantity,
                userId: userId
            })

            await order.save()

            return res.status(200).json({message: "Order saved successfully !!", order})
        } else{
            return res.status(400).json({message : response.data.message})
        }
    } catch(err) {
        return res.status(500).json({message : err.message})
    }
}

async function updateOrder(req, res){
    try{
       const {orderId, quantity} = req.body;
     
       if(!orderId || !quantity){
        return res.status(400).json({message: "Please enter fields properly !!!"})
       }

       let findOrder = await Order.findById(orderId)

       if(!findOrder){
        return res.status(400).json({message: "Order not found !!!"})
       } 

       let product_id = findOrder.product_id

        let url = 'http://product-service:8001/productAvailability'
        let params = {
            product_id: product_id,
            quantity: quantity
        }
        
        let response = await axios.post(url, params)

        if(response?.status == 200){
            let orderUpdate = await Order.findByIdAndUpdate(orderId, {$inc: {quantity: quantity}}, {new: true})

            return res.status(200).json({message: "Order updated successfully !!", orderUpdate})
        } else{
            return res.status(400).json({message : response.data.message})
        }        
    } catch(err){
        return res.status(500).json({message: err.message})
    }
}

async function getOrder(req, res){
    try{
       const {orderId} = req.body

       if(!orderId){
        return res.status(400).json({message: "OrderId not present !!!"})
       }

       let order = await Order.findById(orderId)

       return res.status(200).json({message: "Order found !!", order})
    } catch(err){
        return res.status(500).json({message: err.message})
    }
}

async function listOrders(req, res){
    try{
        const {userId} = req.body

        if(!userId){
            return res.status(400).json({message: "UserId not found !!!"})
        }

        let orders = await Order.find({userId: userId})

        return res.status(200).json({message: "Orders found !!!", orders})

    } catch(err){
        return res.status(500).json({message: err.message})
    }
}

async function deleteOrder(req, res){
    try{
        const {orderId} = req.body

        if(!orderId){
            return res.status(400).json({message: "OrderId not present !!!"})
           }
    
           let order = await Order.findByIdAndDelete(orderId)
    
           return res.status(200).json({message: "Order deleted !!", order})
    } catch(err){
        return res.status(500).json({message: err.message})
    }
}

module.exports = {
    addOrder,
    updateOrder,
    getOrder,
    listOrders,
    deleteOrder
}
