const clearBasket = (state = [], action) => {
    switch(action.type) {
        case "CLEAR_BASKET": {
            return action.payload
        }
    }
}

export default clearBasket