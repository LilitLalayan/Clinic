import React from 'react'
import Grid from "@material-ui/core/Grid"
import CategoryItem from "./CategoryItem"

function CategoryPatients() {


    const categoryItems = new Array(2).fill(0,0,2).map(category => {
        return <CategoryItem/>
    }
    )
    return (
        <Grid container>
            {categoryItems}
        </Grid>
        
    )
    

}

export default CategoryPatients