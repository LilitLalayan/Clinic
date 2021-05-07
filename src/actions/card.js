//card actions

export const addItemToCard = (itemData) => ({
    type: "ADD_ITEM",
    payload: itemData
})

export const incrementItem = (itemId) => ({
    type: "INCREMENT_ITEM",
    payload: itemId
})

export const decrementItem = (itemId) => ({
    type: "DECREMENT_ITEM",
    payload: itemId
})

export const removeItem = (itemId) => ({
    type: "REMOVE_ITEM",
    payload: itemId
})