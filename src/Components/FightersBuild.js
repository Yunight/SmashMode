import React, {createRef} from 'react';
import fighters from "../fighter_data/fighters";
import Grid from "@material-ui/core/Grid";
import SingleFighter from "./SingleFighter";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import Avatar from "@material-ui/core/Avatar";
import me from '../otherPictures/me.jpg'
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import withStyles from "@material-ui/core/styles/withStyles";
import green from "@material-ui/core/colors/green";
import LandingModal from "./LandingModal";
import Dualists from "./Dualists";
import 'react-h5-audio-player/lib/styles.css';
import Audioeffect from "./Audioeffect";
import RandomEventModal from "./RandomEventModal";
import TextField from "@material-ui/core/TextField";
import FR from '../otherPictures/FR.png';
import UK from '../otherPictures/UK.png';
import JP from '../otherPictures/JP.png';
import eventDialogues from "../event/constants/dialogue.json";

class FightersBuild extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedLanguage:"fr_FR",
            eventDialogues : eventDialogues,
            selectedDialogue : 0,
            eventCounter : 0,
            setStyle: true,
            fightersList: fighters,
            showModal: false,
            showFirstModal: false,
            showEventModal: false,
            selectedFighter: [],
            isLoading: false,
            bestRecord: 0,
            currentRecord: 0,
            switchActive: false,
            charIndex :"",
            autoplay: false,
            eventPlayer : null,
            isFighting : false,
            players:[{
                        id:"p1",
                        name:"Joueur 1",
                        wins:null,
                        score:null
                     },
                    {
                        id:"p2",
                        name:"Joueur 2",
                        wins:null,
                        score:null,
                    }],


        }
    }

    getRandomInt = (max) => {
        return Math.floor(Math.random() * Math.floor(max));
    };

    stopPlay = () => {
        this.setState((state, props) => ({
            autoPlay: false,
        }));
    }

    randomEvent = () => {

       // if(Math.floor(Math.random() * Math.floor(2)) == 1){
            this.setState((state, props) => ({
                showEventModal: true,
                isLoading: true,
            }));
        //}

    }

    playersToUpdate = (player1, player2) => {
        let p1 = this.state.players[0];
        let p2 = this.state.players[1];

        p1.name = player1;
        p2.name = player2;
        this.setState((state, props) => ({
            players: [
                p1,
            p2
            ]
        }));

        this.handleClose();

    }

    handleRandom = (fighters_list) => {
        let selectedFighter = [];
        this.setState((state, props) => ({
            isLoading: true,
        }));

        let eventPlayer = Math.floor(Math.random() * Math.floor(2));

        let listAvailableEvent = this.state.eventDialogues;
        let anyDialogAvailable = false;

        listAvailableEvent.map(event => {
            if(event.disabled === false){
                anyDialogAvailable = true;
            }else{
                this.setState((state, props) => ({
                    selectedDialogue : 0,

                }));
            }
        })

        if(listAvailableEvent.length > 0 && anyDialogAvailable && this.state.eventCounter === 3){

            let randomEvent = this.getRandomInt(listAvailableEvent.length);

            do {
                randomEvent = this.getRandomInt(listAvailableEvent.length);
            } while (listAvailableEvent[randomEvent].disabled === true && listAvailableEvent.length > 0);
            listAvailableEvent[randomEvent].disabled = true;

            this.setState((state, props) => ({
                eventDialogues :listAvailableEvent,
                selectedDialogue : randomEvent,
                autoPlay: true,
                eventCounter:0,
            }));
        }else{
            let eventCounterNb = this.state.eventCounter;
            this.setState((state, props) => ({
                eventCounter : eventCounterNb+1
            }));
        }

        if (fighters_list.length > 0) {
            let charIndex = [];
            let randomChar = this.getRandomInt(fighters_list.length);

            let tempFightersList = fighters_list;

            do {
                randomChar = this.getRandomInt(fighters_list.length);
            } while (tempFightersList[randomChar].disabled === true && fighters_list.length > 0);

            tempFightersList[randomChar].disabled = true;
            switch (this.state.selectedLanguage) {
                case "fr_FR":
                    selectedFighter.push (tempFightersList[randomChar].displayName.fr_FR);
                    break;
                case "ja_JP":
                    selectedFighter.push (tempFightersList[randomChar].displayName.ja_JP);
                    break;
                case "en_GB":
                    selectedFighter.push (tempFightersList[randomChar].displayName.en_GB);
                    break;
                default :
                    selectedFighter.push (tempFightersList[randomChar].displayName.fr_FR);
                    break;
            }

            charIndex.push(randomChar);

            do {
                randomChar = this.getRandomInt(fighters_list.length);
            } while (tempFightersList[randomChar].disabled === true && fighters_list.length > 0);

            tempFightersList[randomChar].disabled = true;
            switch (this.state.selectedLanguage) {
                case "fr_FR":
                    selectedFighter.push (tempFightersList[randomChar].displayName.fr_FR);
                    break;
                case "ja_JP":
                    selectedFighter.push (tempFightersList[randomChar].displayName.ja_JP);
                    break;
                case "en_GB":
                    selectedFighter.push (tempFightersList[randomChar].displayName.en_GB);
                    break;
                default :
                    selectedFighter.push (tempFightersList[randomChar].displayName.fr_FR);
                    break;
            }
            charIndex.push(randomChar);

            this.setState((state, props) => ({

                fightersList: tempFightersList,
                showModal: true,
                selectedFighter: selectedFighter,
                isLoading: true,
                charIndex : charIndex,
                eventPlayer : eventPlayer,
                autoPlay: true,
                isFighting : true,
            }));

        }
        if(anyDialogAvailable && this.state.eventCounter === 3){
            this.randomEvent();
        }

        setTimeout(this.stopPlay,3000)


    };

    handleReset = (fighters_list) => {
        this.handleClose();
        let tempFightersList = fighters_list;
        tempFightersList.map(fighter => {
                return fighter.disabled = false;
        });

        this.setState((state, props) => ({
            fightersList: tempFightersList,
            selectedFighter: "",
            currentRecord: 0,
            showFirstModal:true,
            charIndex : "",
            autoplay: false,
            eventPlayer : null,
            isFighting : false,
            players:[{
                id:"p1",
                name:"Joueur 1",
                wins:null,
                score:null
            },
                {
                    id:"p2",
                    name:"Joueur 2",
                    wins:null,
                    score:null,
                }]
        }));
    };

    handleWin = (winner) => {

        let p1 = this.state.players[0];
        let p2 = this.state.players[1];

        //this.handleClose();
        if(winner === "p1"){
            p1.wins = p1.wins+1;
            p1.score = p1.score+1;
            this.setState((state, props) => ({
                isFighting:false,
                players:[
                    p1,
                    p2
                ]
            }));
        }else if(winner === "p2"){
            p2.wins = p2.wins+1;
            p2.score = p2.score+1;
            this.setState((state, props) => ({
                isFighting:false,
                players:[
                    p1,
                    p2
                ]
            }));
        }
    };

    handleLose = () => {
        this.handleClose();
        this.setState((state, props) => ({
            currentRecord: 0,
            selectedFighter: "",
        }));
    };

    handleStyle = (id, index) => {
        /*no need at the moment disabled
        if (!this.state.switchActive) {
            let tempFightersList = this.state.fightersList;
            let selectedFighter = "";

            tempFightersList.map((fighter, index) => {
                if (fighter.id === id) {
                    fighter.disabled = !fighter.disabled;
                    selectedFighter = fighter.displayName.fr_FR;
                }
                return fighter;
            });

            this.setState((state, props) => ({
                fightersList: tempFightersList,
            }));
        }*/
    };

    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        this.setState((state, props) => ({
            showModal: false,
            showFirstModal : false,
            isLoading: false,
        }));
    };


    handleEventWin = (eventPlayer,winner) => {

        let p1 = this.state.players[0];
        let p2 = this.state.players[1];

        //this.handleClose();
        if(winner === "p1"){
            p1.wins = p1.wins+1;
            p1.score = p1.score+1;
            this.setState((state, props) => ({
                isFighting:false,
                players:[
                    p1,
                    p2
                ]
            }));
        }else if(winner === "p2"){
            p2.wins = p2.wins+1;
            p2.score = p2.score+1;
            this.setState((state, props) => ({
                isFighting:false,
                players:[
                    p1,
                    p2
                ]
            }));
        }

        this.setState((state, props) => ({
            showEventModal:false
        }));

    };

    handleEventClose = (event, reason) => {

        if (reason === 'clickaway') {
            return;
        }

        this.setState((state, props) => ({
            showEventModal:false,
            showFirstModal:false,
        }));
    };



    handleChangeSwitch = (fightersList) => {
        this.handleReset(fightersList);
        this.setState((state, props) => ({
            switchActive: !this.state.switchActive,
            bestRecord: 0,
            selectedFighter: "",
            charIndex : "",
        }));


    };

    handleFlagChange =( flag) => {
        switch (flag) {
            case "ja_JP" :
                document.getElementById("ja_JP").className = "activeFlag"

                document.getElementById("fr_FR").className = "unactiveFlag"
                document.getElementById("en_GB").className = "unactiveFlag"
                break;
            case "fr_FR":
                document.getElementById("fr_FR").className = "activeFlag"

                document.getElementById("ja_JP").className = "unactiveFlag"
                document.getElementById("en_GB").className = "unactiveFlag"
                break;
            case "en_GB":
                document.getElementById("en_GB").className = "activeFlag"

                document.getElementById("fr_FR").className = "unactiveFlag"
                document.getElementById("ja_JP").className = "unactiveFlag"
                break;
            default :
                document.getElementById("fr_FR").className = "activeFlag"

                document.getElementById("ja_JP").className = "unactiveFlag"
                document.getElementById("en_GB").className = "unactiveFlag"
        }
        this.setState((state, props) => ({
            selectedLanguage: flag,
        }));
    }

    render() {
        const PurpleSwitch = withStyles({
            switchBase: {
                color: green[300],
                '&$checked': {
                    color: green[500],
                },
                '&$checked + $track': {
                    backgroundColor: green[500],
                },
            },
            checked: {},
            track: {},
        })(Switch);

        let listAvailable = this.state.fightersList.filter(fighter => fighter.disabled === false);

        this.player = createRef();

        return (
            <Grid  style={{flexGrow: "1", overflow: "hidden"}}  >
                <Grid item xs={12} className={"topContainer"}>

                    <div className={"flagPosition"}>
                        <img
                             onClick={(e) => this.handleFlagChange("fr_FR")}
                             id={'fr_FR'}
                             className={"activeFlag"}
                             src={FR}
                             alt={"France"}/>
                        <img
                             onClick={(e) => this.handleFlagChange("en_GB")}
                             id={'en_GB'}
                             className={"unactiveFlag"}
                             src={UK}
                             alt={"France"}/>
                        <img
                            onClick={(e) => this.handleFlagChange("ja_JP")}
                            id={'ja_JP'}
                            className={"unactiveFlag"}
                            src={JP}
                            alt={"Japan"}/>
                    </div>

                        {this.state.switchActive &&

                        <Button onClick={(e) => this.handleWin(this.state.fightersList)} variant="contained" size="large"
                                color="secondary"
                                disabled={!this.state.selectedFighter.length > 0 && !this.state.isLoading}
                                className={"winBtn basicBtn"}>
                            GAGNÉ
                        </Button>
                        }

                        {this.state.switchActive &&
                        <Button onClick={(e) => this.handleLose(this.state.fightersList)} variant="contained" size="large"
                                color="secondary"
                                className={"loseBtn basicBtn"}
                                disabled={!this.state.selectedFighter.length > 0}>
                            PERDU
                        </Button>
                        }

                        <TextField
                            style={{margin:2,backgroundColor: "rgba(63, 70, 191, .3)",width:150}}
                            id="p1name"
                            label="Player 1"
                            //defaultValue="Player 2 Name"
                            value={this.state.players[0].name ? this.state.players[0].name : "Player 1 Name"}
                            InputProps={{
                                readOnly: true,
                            }}
                            variant="filled"
                        />

                        <TextField
                            style={{margin:2,backgroundColor: "rgba(240, 52, 52, .6)",width:150}}
                            id="p2name"
                            label="Player 2"
                            //defaultValue="Player 2 Name"
                            value={this.state.players[1].name ? this.state.players[1].name : "Player 2 Name"}
                            InputProps={{
                                readOnly: true,
                            }}
                            variant="filled"
                        />

                        <Button onClick={(e) => this.handleReset(this.state.fightersList)} variant="contained" size="large"
                                color="secondary"
                                className={"resetBtn basicBtn"}>
                            RESET
                        </Button>

                        <Button color="primary" variant="contained" target="_blank" className={"customTitle"}
                                href="https://twitter.com/NightOfLunaTV">
                            Online Smash DOWN by <Avatar alt="Benchi CHEN" src={me} className={"iconsize"}/>@NightOfLunaTV
                        </Button>

                        {this.state.switchActive &&
                        <Button color="primary" variant="contained" className={"floatTitleLeftBest"}>
                            Meilleur score : {this.state.bestRecord}
                        </Button>
                        }
                        {this.state.switchActive &&
                        <Button color="primary" variant="contained" className={"floatTitleLeft"}>
                            Score actuel : {this.state.currentRecord}
                        </Button>
                        }

                        <Button color="primary" variant="contained" className={"floatTitleRight"}>
                            Combattants Restants : {listAvailable.length}
                        </Button>




                {this.state.autoPlay &&
                    <Audioeffect
                        selectedDialogue={this.state.selectedDialogue}
                        eventCounter={this.state.eventCounter}
                    />
                }

                </Grid>
                    <Grid container justify="center" spacing={1}>
                        {this.state.fightersList.map((value, index) => (
                            <SingleFighter
                                key={value.id}
                                value={value}
                                index={index}
                                handleStyle={this.handleStyle}
                            />
                        ))}
                    </Grid>


                <Dualists
                    listAvailable = {listAvailable}
                    selectedFighter={ this.state.selectedFighter}
                    players={this.state.players}
                    charIndex={this.state.charIndex}
                    switchActive={this.state.switchActive}
                    handleRandom={this.handleRandom}
                    handleWin={this.handleWin}
                    showEventModal={this.state.showEventModal}
                    fightersList={this.state.fightersList}
                    isLoading={this.state.isLoading}
                    isFighting={this.state.isFighting}
                />

                <LandingModal
                    showFirstModal={this.state.showFirstModal}
                    handleEventClose={this.handleEventClose}
                    playersToUpdate={this.playersToUpdate}
                    players={this.state.players}
                />

                <RandomEventModal
                    selectedDialogue={this.state.selectedDialogue}
                    eventPlayer={this.state.eventPlayer}
                    showEventModal={this.state.showEventModal}
                    handleEventClose={this.handleEventClose}
                    players={this.state.players}
                    fightersList={this.state.fightersList}
                    handleEventWin={this.handleEventWin}
                    handleEventLose={this.handleEventLose}
                    isloading={this.state.isLoading}
                />



                {false && <Container style={{textAlign: 'center'}}>
                    <FormControlLabel className={"toggleSolo"}
                                      control={
                                          <PurpleSwitch
                                              checked={this.state.switchActive}
                                              onChange={(e) => this.handleChangeSwitch(this.state.fightersList)}
                                              name="checkedB"
                                              color="primary"
                                          />
                                      }
                                      label="SOLO CHALLENGE"
                    />
                </Container>}



                <Snackbar open={this.state.showModal} autoHideDuration={1500} onClose={this.handleClose}>
                    <Alert onClose={this.handleClose} severity="info">
                        Le combat sera  : {this.state.selectedFighter.length > 1 ? this.state.selectedFighter[0].replace("<br>", "") : null} VS {this.state.selectedFighter.length >1 ? this.state.selectedFighter[1].replace("<br>", "") : null}
                    </Alert>
                </Snackbar>



            </Grid>
        );
    }


}

export default (FightersBuild);
