export const changeCategory = (categories) => {
    return {type: "CHANGE_CATEGORY",
            payload: categories}
}

export const hasShoppingItems = () => {
    return {
        type: "HAS_SHOPPING_ITEMS"
    }
}