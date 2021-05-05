import React from 'react'
import Grid from "@material-ui/core/Grid"
import CategoryItem from "./CategoryItem"
import {useState, useEffect} from "react"


function CategoryDental(index) {
    
    // initialize category doctors Category
  

    // store category Items
    const categoryItems = categoryData.map(categoryTitle => {
        return <CategoryItem categoryTitle={categoryTitle}/>
    }
    )
    return (
        <Grid container>
            // show category items
            {categoryItems}
        </Grid>
        
    )

}

export default CategoryDental;