import React from 'react';
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

class WinnerModal extends React.Component {


    render() {

        let playersWins = [this.props.players[0].wins,this.props.players[1].wins]
        let playersScores = [this.props.players[0].score,this.props.players[1].score]

        let WinnerWithWins = "";
        let WinsIndex = null;
        let WinnerWithScores = "";
        let ScoreIndex = null;

        if(this.props.players[0].wins === this.props.players[1].wins){
            WinnerWithWins = "Egalité"
            console.log("Current Winner wins status is " + WinnerWithWins);
        }else{
            WinsIndex = playersWins.indexOf(Math.max(...playersWins));
            console.log("Current Winner wins index is " + WinsIndex);
        }

        if(this.props.players[0].score === this.props.players[1].score){
            WinnerWithScores = "Egalité"
            console.log("Current Winner score status is " + WinnerWithScores);
        }else{
            ScoreIndex = playersScores.indexOf(Math.max(...playersScores));
            console.log("Current Winner score index is " + ScoreIndex);
        }

        return (
            <Dialog onClose={(e) => this.props.handleEventClose(e,"isWinner")}  aria-labelledby="customized-dialog-title" open={this.props.showWinningModal}  fullWidth={true} maxWidth="md" >
                <DialogTitle id="customized-dialog-title" style={{textAlign:"center"}} onClose={(e) => this.props.handleEventClose(e,"2")}  >
                    <span style={{fontSize:40,fontFamily:"SSFIV"}}>Smash Down Winner !</span>
                </DialogTitle>

                <DialogContent className={"winningModal"}>

                 {ScoreIndex  !== WinsIndex &&
                    <div style={{fontSize:30,color:"black",textAlign:"left",paddingLeft:10}} className={"winningTop winningstyle"}>Gagnant en Victoires : {WinnerWithWins !== "Egalité" && WinsIndex !== null ? this.props.players[WinsIndex].name : ""} {WinnerWithWins === "Egalité" ? "Egalité !" : ""}</div>

                 }
                 {ScoreIndex  !== WinsIndex &&
                    <div style={{fontSize:30,color:"black",textAlign:"left",paddingLeft:10}} className={"winningstyle"}>Gagnant en Scores : {WinnerWithScores !== "Egalité" && ScoreIndex !== null ? this.props.players[ScoreIndex].name : ""} {WinnerWithScores === "Egalité" ? "Egalité !" : ""}</div>
                 }

                {ScoreIndex  === WinsIndex  && ScoreIndex !==null  && WinsIndex !== null && WinnerWithWins !== "Egalité" && WinnerWithScores !== "Egalité"?
                    <div style={{fontSize:30,color:"black",textAlign:"center"}} className={"winningTop winningstyle"}>Victoire totale de :  <span style={{color:"greenyellow"}}>{this.props.players[ScoreIndex].name } </span></div> : null
                }

                </DialogContent>
            </Dialog>

        );
    }
}

export default (WinnerModal);