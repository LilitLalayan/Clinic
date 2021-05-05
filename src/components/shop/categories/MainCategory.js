import React from 'react'
import Grid from "@material-ui/core/Grid"
import CategoryItem from "./CategoryItem"
import { makeStyles } from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography"

const useStyles = makeStyles((theme) => ({
    container: {
        marginTop: "30px"
    },

    typography: {
        marginTop: "60px"
    },

    root: {
      flexGrow: 1,
    },
    paper: {
      height: 140,
      width: 100,
    },
    control: {
      padding: theme.spacing(2),
    },
  }));

function MainCategory() {
    const [spacing, setSpacing] = React.useState(5);
  const classes = useStyles();
    // get categegory titles
    const categoryTitles = ["For Patients", "For Dental"]

    // get category items
    const categoryItems = categoryTitles.map((title,index) => {
        return <CategoryItem title={title}index={index + 1}/>
    }
    )
    return (
        <div className="categories">
            <Typography className={classes.typography} variant="h6" align="center">Choose Category</Typography>
        <Grid container justify="center" spacing={spacing} className={classes.container}>
            {categoryItems}
        </Grid>
        </div>
        
        
    )
    

}

export default MainCategory