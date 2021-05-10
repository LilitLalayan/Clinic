import React from 'react'
import Grid from "@material-ui/core/Grid"
import Container from "@material-ui/core/Container"
import Typography from "@material-ui/core/Typography"
import Link from "@material-ui/core/Link"

import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

function ShopCard() {
    return (
        <Conatiner fixed>
            <Grid container>
                <Grid item xs={6}>
                    <Typography variant="h6"> Your Basket</Typography>
                </Grid>

                <Grid item xs={6}>
                    <Typography variant="h6"> Clear Basket</Typography>
                </Grid>
            </Grid>

            <Grid container>
               
                <Grid item xs={3}>
                <Link onClick>
                    <RemoveIcon/>
                    </Link>
                </Grid>

                <Grid item xs={2}>
                    <Typography variant="h6"> Clear Basket</Typography>
                </Grid>

                <Grid item xs={3}>
                <Link onClick>
                    <AddIcon/>
                    </Link>
                </Grid>

                <Grid item xs={3}>
                <Link onClick>
                    <AddIcon/>
                    </Link>
                </Grid>
                <Grid item xs={5}>
                    <Typography variant="h6"> Price</Typography>
                </Grid>
            </Grid>
        </Conatiner>
    )
}

export default ShopCard
