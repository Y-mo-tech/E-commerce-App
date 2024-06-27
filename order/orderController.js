const Order = require('./orderSchema')
const axios = require('axios')

async function addOrder(req, res){
    try{
        console.log("indsie add order fxn++++++++++++++++++++++++")
        const {name, quantity} = req.body;
        console.log(name, quantity)
        const {userId} = req.auth

        console.log("userId-----------", userId)

        if(!name || !quantity){
            return res.status(400).json({message: "Please enter fields properly !!"})
        }
        let method = 'GET'
        let url = 'http://localhost:8001/productAvailability'
        let params = {
            name: name,
            quantity: quantity
        }
        let options = {
            method,
            url,
            params
        }
        let response = await axios(options)

        console.log("response in addorder axios-=--=-=-=-=", response.data)

        if(response?.data?.isFound){
            console.log("response?.data?.isfound", response?.data?.isFound)
            let order = new Order({
                name: name,
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

       let name = findOrder.name

       let method = 'GET'
        let url = 'http://localhost:8001/productAvailability'
        let params = {
            name: name,
            quantity: quantity
        }
        let options = {
            method,
            url,
            params
        }
        let response = await axios(options)

        if(response?.data?.isFound){
            console.log("response?.data?.isfound", response?.data?.isFound)
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