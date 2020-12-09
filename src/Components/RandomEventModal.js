import React from 'react';
import Grid from "@material-ui/core/Grid";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import objection from "../event/img/objection.png";
import textBox from "../event/img/textbox3.png";
import eventDialogues from "../event/constants/dialogue.json";
import Button from "@material-ui/core/Button";
import {Image} from "@material-ui/icons";

class RandomEventModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            eventDialogues: eventDialogues,
        }
    }

    render() {

        function importAll(r) {
            return r.keys().map(r);
        }

        const event_pic = importAll(require.context('../event/event_pics', false, /\.(png|jpe?g|svg)$/));

        let eventPlayer = (<span></span>);

        if(this.props.eventPlayer != null){
            eventPlayer = (<span className={"EventPlayer"}>{this.props.players[this.props.eventPlayer].name}</span>)
        }

        return (
            <Dialog onClose={(e) => this.props.handleEventClose(e,"clickaway")} aria-labelledby="customized-dialog-title" open={this.props.showEventModal} fullWidth={true}>
                <DialogTitle id="customized-dialog-title" style={{textAlign:"center"}} onClose={() => this.props.handleEventClose()} >
                    <span className={"smalldevice"} >{this.state.eventDialogues[this.props.selectedDialogue].h1 }</span>
                </DialogTitle>

                <DialogContent>
                    <Grid container alignItems="flex-end" style={{backgroundImage:`url(${event_pic[this.props.selectedDialogue].default})`,backgroundPosition:"center", backgroundSize: "contain",height:250,backgroundRepeat:"no-repeat"}}/>

                    {this.state.eventDialogues[this.props.selectedDialogue].affecting === "both" &&
                        <Grid style={{textAlign:"center",paddingTop:20,backgroundImage:`url(${textBox})`,backgroundSize: "cover",backgroundRepeat: "no-repeat",minHeight:145}}>
                            <h3 className={"eventGoal"}> Défi pour <span className={"EventPlayer"}>tous</span> : {this.state.eventDialogues[this.props.selectedDialogue].h2}</h3>
                            <h2 className={'eventBonusMalus bonusTxt'} >Victoire : {this.state.eventDialogues[this.props.selectedDialogue].bonus}</h2>
                            {/*<h2 className={'eventBonusMalus malusTxt'} >Défaite : {this.state.eventDialogues[this.props.selectedDialogue].malus}</h2>*/}
                            <h4 style={{textAlign:"right",paddingTop:0,paddingRight:30}}>{this.state.eventDialogues[this.props.selectedDialogue].from}</h4>
                        </Grid>
                    }

                    {this.state.eventDialogues[this.props.selectedDialogue].affecting === "both" &&
                    <Grid item sm={12} xs={12} className={"textAligncenter"}>

                        <Button onClick={(e) => this.props.handleEventWin(this.props.eventPlayer,"p1")}
                                variant="contained"
                                size="large"
                                color="secondary"
                            //disabled={!this.state.selectedFighter.length > 0 && !this.state.isLoading}
                                className={"winBtn basicBtn"}
                        >
                            <h4>P1 WIN</h4>

                        </Button>

                        <Button onClick={(e) => this.props.handleEventWin(this.props.eventPlayer,"p2")}
                                variant="contained"
                                size="large"
                                color="secondary"
                                className={"loseBtn basicBtn"}
                            //disabled={!this.state.selectedFighter.length > 0}
                        >
                            <h4>P2 WIN</h4>

                        </Button>

                    </Grid>
                    }

                    {this.state.eventDialogues[this.props.selectedDialogue].affecting === "winner" &&

                        <Grid>
                            <Grid style={{textAlign:"center",paddingTop:20,backgroundImage:`url(${textBox})`,backgroundSize: "cover",backgroundRepeat: "no-repeat",minHeight:145}}>
                                <h3 className={"eventGoal"}> Défi pour "{eventPlayer}" : {this.state.eventDialogues[this.props.selectedDialogue].h2}</h3>
                                <h2 className={'eventBonusMalus bonusTxt'} >Victoire : {this.state.eventDialogues[this.props.selectedDialogue].bonus}</h2>
                                {/*<h2 className={'eventBonusMalus malusTxt'} >Défaite : {this.state.eventDialogues[this.props.selectedDialogue].malus}</h2>*/}
                                <h4 style={{textAlign:"right",paddingTop:0,paddingRight:30}}>{this.state.eventDialogues[this.props.selectedDialogue].from}</h4>
                            </Grid>

                        </Grid>
                    }

                    {this.state.eventDialogues[this.props.selectedDialogue].affecting === "winner" &&
                        <Grid item sm={12} xs={12} className={"textAligncenter"}>

                                <Button onClick={(e) => this.props.handleEventWin(this.props.eventPlayer,"p1")}
                                        variant="contained"
                                        size="large"
                                        color="secondary"
                                        //disabled={!this.state.selectedFighter.length > 0 && !this.state.isLoading}
                                        className={"winBtn basicBtn"}
                                >
                                    <h4>RÉUSSI</h4>

                                </Button>

                                <Button onClick={(e) => this.props.handleEventWin(this.props.eventPlayer,"p2")}
                                        variant="contained"
                                        size="large"
                                        color="secondary"
                                        className={"loseBtn basicBtn"}
                                        //disabled={!this.state.selectedFighter.length > 0}
                                >
                                    <h4>RATÉ</h4>

                                </Button>

                        </Grid>
                    }
                </DialogContent>

            </Dialog>
        );
    }
}

export default (RandomEventModal);