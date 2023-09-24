import React from 'react'
import { Snackbar } from '@mui/material'
import MuiAlert from '@mui/material/Alert';
import { Grid } from '@mui/material';
interface notificationProps{
    open: boolean,
    message: string,
    type: string
}

const Notification = (props:notificationProps) => {

    return (
        <Snackbar open={props.open} autoHideDuration={5000}  >
            <MuiAlert elevation={6}  variant="filled" severity={props.type === "success" ? "success" : "error"} sx={{ width: '100%' }}>
                <Grid dir="rtl">
                    {props.message}
                </Grid>
            </MuiAlert>
        </Snackbar>)
}

export default Notification