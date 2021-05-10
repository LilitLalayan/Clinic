// shopping item should increment
export const incrementItem = (itemsInBasket) => {
    return {
        type: "INCREMENT_ITEM",
        payload: itemsInBasket
    }
}

// shopping item should decrement by one in basket
export const decrementItem = (itemsInBasket) => {
    return {
        type: "DECREMENT_ITEM",
        payload: itemsInBasket
    }
}


