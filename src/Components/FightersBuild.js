import React from 'react';
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
import useSound from "use-sound";
import win from "../audios/win.mp3"


class FightersBuild extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            setStyle: true,
            fightersList: fighters,
            showModal: false,
            selectedFighter: "",
            isLoading: false,
            bestRecord: 0,
            currentRecord: 0,
            switchActive: false,
        }
    }

    getRandomInt = (max) => {
        return Math.floor(Math.random() * Math.floor(max));
    };


    handleRandom = (fighters_list) => {

        this.handleClose();
        let selectedFighter = "";
        this.setState((state, props) => ({
            isLoading: true,
        }));

        if (fighters_list.length > 0) {
            let randomChar = this.getRandomInt(fighters_list.length);
            let tempFightersList = fighters_list;

            do {
                randomChar = this.getRandomInt(fighters_list.length);
            } while (tempFightersList[randomChar].disabled === true && fighters_list.length > 0);

            tempFightersList[randomChar].disabled = true;
            selectedFighter = tempFightersList[randomChar].displayName.fr_FR;
            this.setState((state, props) => ({
                fightersList: tempFightersList,
                showModal: true,
                selectedFighter: selectedFighter,
                isLoading: true,
            }));
        }
    };

    handleReset = (fighters_list) => {

        let tempFightersList = fighters_list;
        tempFightersList.map(fighter => {
            if (fighter.id === "f079") {
                return fighter;
            } else {
                return fighter.disabled = false;
            }

        });
        this.setState((state, props) => ({
            fightersList: tempFightersList,
            selectedFighter: "",
            currentRecord: 0,
        }));
    };

    handleWin = () => {

        this.handleClose();
        this.setState((state, props) => ({
            currentRecord: this.state.currentRecord + 1,
            selectedFighter: "",
        }));


        if (this.state.currentRecord >= this.state.bestRecord) {
            this.setState((state, props) => ({
                bestRecord: this.state.currentRecord + 1,
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
                showModal: true,
                selectedFighter: selectedFighter,
            }));
        }
    };

    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        this.setState((state, props) => ({
            showModal: false,
            isLoading: false,
        }));
    };


    handleChangeSwitch = (fightersList) => {
        this.handleReset(fightersList);
        this.setState((state, props) => ({
            switchActive: !this.state.switchActive,
            bestRecord: 0,
            selectedFighter: ""
        }));


    };

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

        let audio = new Audio("./audios/win.mp3");

        const start = () => {
            audio.play()
        };

        let listAvailable = this.state.fightersList.filter(fighter => fighter.disabled === false);

        return (

            <Grid container style={{flexGrow: "1", overflowX: "hidden"}} spacing={3}>
                <Grid item xs={12}>
                    <Container xs={12} className={"topContainer"}>


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
                    </Container>

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
                </Grid>
                <Container style={{textAlign: "center", padding: "10px"}}>
                    {this.state.switchActive &&
                    <Button onClick={(e) => this.handleWin(this.state.fightersList)} variant="contained" size="large"
                            color="secondary"
                            disabled={!this.state.selectedFighter.length > 0 && !this.state.isLoading}
                            className={"winBtn basicBtn"}
                    >
                        GAGNÉ
                    </Button>
                    }

                    {this.state.switchActive &&
                    <Button onClick={(e) => this.handleLose(this.state.fightersList)} variant="contained" size="large"
                            color="secondary"
                            className={"loseBtn basicBtn"}
                            disabled={!this.state.selectedFighter.length > 0}
                    >
                        PERDU
                    </Button>
                    }

                    <Button onClick={(e) => this.handleReset(this.state.fightersList)} variant="contained" size="large"
                            color="secondary"
                            className={"resetBtn basicBtn"}
                    >
                        RESET
                    </Button>
                </Container>

                <Container style={{textAlign: "center"}}>

                    <Button onClick={(e) => this.handleRandom(this.state.fightersList)} variant="contained" size="large"
                            color="primary"
                            disabled={listAvailable.length === 0 || (this.state.switchActive && this.state.selectedFighter.length > 0)}
                            style={{height: "120px", width: "350px"}}>
                        {listAvailable.length === 0 ? <h2 className={"bigTitle"}>VIDE</h2> :
                            <h1 className={"bigTitle"}>RANDOM</h1>}
                            {this.BoopButton}
                    </Button>


                </Container>
                <Container style={{textAlign: 'center'}}>
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
                </Container>


                <Snackbar open={this.state.showModal} autoHideDuration={1500} onClose={this.handleClose}>
                    <Alert onClose={this.handleClose} severity="info">
                        Ce combattant a été sélectionné : {this.state.selectedFighter.replace("<br>", "")}
                    </Alert>
                </Snackbar>

            </Grid>
        );
    }


}

export default (FightersBuild);
