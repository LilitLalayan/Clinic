const initialState = {
    items: []
}

const shopOperations = (state = initialState, action) => {
    switch (action.type) {
        case "DECREMENT_ITEM": {
            return {
                items: [...items, action.payload]
            }    
        } 
        
        case "INCREMENT_ITEM": {
            const newItems =  state.items.slice(0, -1);
            return {
                items: newItems
            }    
        } 
    }
    
}