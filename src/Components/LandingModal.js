import React from 'react';
import Grid from "@material-ui/core/Grid";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import vs from "../otherPictures/VERSUS.png";

class LandingModal extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            p1_name :"",
            p2_name :"",
        }
    }

    playersToUpdate = (e, player) => {

        let playerName = e.target.value;
        if(e.target.value !== null){

            if(player === "p1"){
                this.setState((state, props) => ({
                    p1_name :playerName,
                }));
            }else if(player === "p2"){
                this.setState((state, props) => ({
                    p2_name :playerName,
                }));
            }
        }
    }

    render() {

        return (
            <Dialog onClose={(e) => this.props.handleEventClose(e,"clickaway")} aria-labelledby="customized-dialog-title" open={this.props.showFirstModal} fullWidth={true}>
                <DialogTitle id="customized-dialog-title" style={{textAlign:"center"}} onClose={(e) => this.props.handleEventClose(e,"2")} >
                    <span style={{fontSize:40,fontFamily:"SSFIV"}}>Smash Down Dual !</span>
                </DialogTitle>

                <DialogContent >
                    <Grid container alignItems="flex-end"  >

                        <Grid item xs={4} >
                            <TextField inputProps={{ maxLength: 12 }} id="p1" label="Player 1" required value={this.state.p1_name} onChange={(e) =>this.playersToUpdate(e,"p1")}/>
                        </Grid>
                        <Grid item xs={4} style={{textAlign:"center"}}>
                            <img  style={{height:100,backgroundSize: 'contains',backgroundRepeat:"no-repeat"}}
                                  src={vs} alt={"CHARACTER"}/>
                        </Grid>
                        <Grid item xs={4}>
                            <TextField inputProps={{ maxLength: 12 }} id="p2" label="Player 2" required value={this.state.p2_name} onChange={(e) =>this.playersToUpdate(e,"p2")}/>
                        </Grid>

                    </Grid>

                </DialogContent>

                <Button  color="primary" style={{textAlign:"center"}} disabled={this.state.p1_name === "" || this.state.p2_name === ""}>
                    <h1 style={{fontSize:30,fontFamily:"SSFIV",letterSpacing:5,}} onClick={(e) => this.props.playersToUpdate(this.state.p1_name,this.state.p2_name)}>START</h1>
                </Button>

            </Dialog>
        );
    }
}

export default (LandingModal);