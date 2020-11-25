import React from 'react';
import Grid from "@material-ui/core/Grid";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import vs from "../otherPictures/VERSUS.png";

class LandingModal extends React.Component {

    render() {


        return (
            <Dialog onClose={() => this.props.handleClose()} aria-labelledby="customized-dialog-title" open={this.props.showFirstModal} fullWidth={true}>
                <DialogTitle id="customized-dialog-title" style={{textAlign:"center"}} onClose={() => this.props.handleClose()} >
                    Smash Down Duelists !
                </DialogTitle>

                <DialogContent >
                    <Grid container alignItems="flex-end"  >

                        <Grid item xs={4} >
                            <TextField id="p1" label="Player 1" />
                        </Grid>
                        <Grid item xs={4} style={{textAlign:"center"}}>
                            <img  style={{height:100,backgroundSize: 'contains',backgroundRepeat:"no-repeat"}}
                                  src={vs} alt={"CHARACTER"}/>
                        </Grid>
                        <Grid item xs={4}>
                            <TextField id="p2" label="Player 2" />
                        </Grid>

                    </Grid>

                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClose={() => this.props.handleClose()} color="primary" style={{textAlign:"center"}}>
                        FIGHT !
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

export default (LandingModal);