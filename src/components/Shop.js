import { useState, useEffect } from "react";
import { API_KEY, API_URL } from "../config";
import Loading from "./Loading";
import GoodList from "./GoodList";
import Card from "./Card"
import BasketList from "./BasketList";
import { toast } from "react-toastify"

export default function Shop() {
    const [goods, setGoods] = useState([])
    const [loading, setLoading] = useState(true);
    const [order, setOrder] = useState([]);
    const [isBasketShow, setBasketShow] = useState(false);

    const addToBasket = (item) => {
        const itemIndex = order.findIndex(orderItem => orderItem.id === item.id)

        if(itemIndex < 0) {
            const newItem = {
                ...item,
                quantity: 1
            }
            setOrder([...order, newItem])
        } else {
            const newOreder = order.map((orderItem, index) => {
                if (index === itemIndex) {
                    return {
                        ...orderItem,
                        quantity: orderItem.quantity + 1
                    }
                }else {
                    return item
                }
            })
            setOrder(newOreder)
        }

        toast.success('Added to backet successfully!')
    }

    const handleBasketShow = () => {
        setBasketShow(!isBasketShow);
    }

    const removeBasket = (itemId) => {
        const newOrder = order.filter(item => item.id !==itemId)
        setOrder(newOrder);
        toast.error('Deleted to backet successfully!')
    }

    const incrementQuantity = (itemId) => {
        const newOrder = order.map(el => {
            if(el.id === itemId) {
                const newQuantity = el.quantity + 1
                return {
                    ...el,
                    quantity: newQuantity
                }
            }else {
                return el
            }
        })

        setOrder(newOrder)
    }

    const decrementQuantity = (itemId) => {
        const newOrder = order.map(el => {
            if(el.id === itemId) {
                const newQuantity = el.quantity - 1
                return {
                    ...el,
                    quantity: newQuantity >= 0 ? newQuantity : 0
                }
            }else {
                return el
            }
        })

        setOrder(newOrder)
       
    }

    useEffect(() => {
        fetch(API_URL, {
            headers: {
                Authorization: API_KEY,
            },
        })
            .then((response) => response.json())
            .then((data) => {
                data.featured && setGoods(data.featured)
                setLoading(false)
            })
    }, [])

    return (
        <div className="container content">
            <Card quantity={order.length} handleBasketShow={handleBasketShow} />
            {loading ? <Loading /> : <GoodList goods={goods} addToBasket={addToBasket}/>}
            {isBasketShow && <BasketList 
                order={order} 
                handleBasketShow={handleBasketShow} 
                removeBasket={removeBasket}  
                incrementQuantity={incrementQuantity}          
                decrementQuantity={decrementQuantity}
            />}
        </div>
    )
}