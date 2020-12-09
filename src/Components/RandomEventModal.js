import React from 'react';
import Grid from "@material-ui/core/Grid";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import objection from "../event/img/objection.png";
import textBox from "../event/img/textbox3.png";
import eventDialogues from "../event/constants/dialogue.json";
import Button from "@material-ui/core/Button";

class RandomEventModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            eventDialogues: eventDialogues,
        }
    }

    render() {

        let eventPlayer = (<span></span>);

        if(this.props.eventPlayer != null){
            eventPlayer = (<span className={"EventPlayer"}>{this.props.players[this.props.eventPlayer].name}</span>)
        }

        return (
            <Dialog onClose={(e) => this.props.handleEventClose(e,"clickaway")} aria-labelledby="customized-dialog-title" open={this.props.showEventModal} fullWidth={true}>
                <DialogTitle id="customized-dialog-title" style={{textAlign:"center"}} onClose={() => this.props.handleEventClose()} >
                    <span className={"smalldevice"} >{this.state.eventDialogues[1].h1}</span>
                </DialogTitle>

                <DialogContent>
                    <Grid container alignItems="flex-end" style={{backgroundImage:`url(${objection})`,backgroundSize: "cover",height:250}}/>
                    <Grid style={{textAlign:"center",paddingTop:20,backgroundImage:`url(${textBox})`,backgroundSize: "contain",backgroundRepeat: "no-repeat"}}>
                        <h3 className={"eventGoal"}> Défi pour "{eventPlayer}" : {this.state.eventDialogues[1].h2}</h3>
                        <h2 className={'eventBonusMalus bonusTxt'} >Victoire : {this.state.eventDialogues[1].bonus}</h2>
                        <h2 className={'eventBonusMalus malusTxt'} >Défaite : {this.state.eventDialogues[1].malus}</h2>
                        <h4 style={{textAlign:"right",paddingTop:20}}> Signé : {this.state.eventDialogues[1].from}</h4>
                    </Grid>
                    <Grid item sm={12} xs={12} className={"textAligncenter"}>

                            <Button onClick={(e) => this.props.handleEventWin(this.props.fightersList)}
                                    variant="contained"
                                    size="large"
                                    color="secondary"
                                    //disabled={!this.state.selectedFighter.length > 0 && !this.state.isLoading}
                                    className={"winBtn basicBtn"}
                            >
                                <h4>P1 WIN</h4>

                            </Button>

                            <Button onClick={(e) => this.props.handleEventLose(this.props.fightersList)}
                                    variant="contained"
                                    size="large"
                                    color="secondary"
                                    className={"loseBtn basicBtn"}
                                    //disabled={!this.state.selectedFighter.length > 0}
                            >
                                <h4>P2 WIN</h4>

                            </Button>

                    </Grid>
                </DialogContent>

            </Dialog>
        );
    }
}

export default (RandomEventModal);