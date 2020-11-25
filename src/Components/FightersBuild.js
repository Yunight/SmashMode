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
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import Audioplayer from "./audioplayer";

class FightersBuild extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            setStyle: true,
            fightersList: fighters,
            showModal: false,
            showFirstModal: true,
            selectedFighter: [],
            isLoading: false,
            bestRecord: 0,
            currentRecord: 0,
            switchActive: false,
            charIndex :"",
            autoplay:false,
        }
    }

    getRandomInt = (max) => {
        return Math.floor(Math.random() * Math.floor(max));
    };


    handleRandom = (fighters_list) => {
        this.handleClose();
        let selectedFighter = [];
        this.setState((state, props) => ({
            isLoading: true,
        }));

        if (fighters_list.length > 0) {
            let charIndex = [];
            let randomChar = this.getRandomInt(fighters_list.length);

            let tempFightersList = fighters_list;

            do {
                randomChar = this.getRandomInt(fighters_list.length);
            } while (tempFightersList[randomChar].disabled === true && fighters_list.length > 0);

            tempFightersList[randomChar].disabled = true;
            selectedFighter.push (tempFightersList[randomChar].displayName.fr_FR);
            charIndex.push(randomChar);

            do {
                randomChar = this.getRandomInt(fighters_list.length);
            } while (tempFightersList[randomChar].disabled === true && fighters_list.length > 0);

            tempFightersList[randomChar].disabled = true;
            selectedFighter.push (tempFightersList[randomChar].displayName.fr_FR);
            charIndex.push(randomChar);

            this.setState((state, props) => ({
                fightersList: tempFightersList,
                showModal: true,
                selectedFighter: selectedFighter,
                isLoading: true,
                charIndex : charIndex,
                autoPlay: true,
            }));
        }
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
            charIndex : "",
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


    handleChangeSwitch = (fightersList) => {
        this.handleReset(fightersList);
        this.setState((state, props) => ({
            switchActive: !this.state.switchActive,
            bestRecord: 0,
            selectedFighter: "",
            charIndex : "",
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

        let listAvailable = this.state.fightersList.filter(fighter => fighter.disabled === false);

        this.player = createRef();
        return (

            <Grid container style={{flexGrow: "1", overflowX: "hidden"}} spacing={3}>
                <Grid item xs={12}>
                    <Container xs={12} className={"topContainer"}>
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

                <Dualists
                    listAvailable = {listAvailable}
                    selectedFighter={ this.state.selectedFighter}
                    charIndex={this.state.charIndex}
                    switchActive={this.state.switchActive}
                    handleRandom={this.handleRandom}
                    fightersList={this.state.fightersList}
                />

                <LandingModal
                    showFirstModal={this.state.showFirstModal}
                    handleClose={this.handleClose}
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

                <Audioplayer
                    auto={this.state.autoPlay}
                />

                <Snackbar open={this.state.showModal} autoHideDuration={1500} onClose={this.handleClose}>
                    <Alert onClose={this.handleClose} severity="info">
                        Le combat sera  : {this.state.selectedFighter.length > 1 ? this.state.selectedFighter[0].replace("<br>", "") : null} VS {this.state.selectedFighter.length >1 ? this.state.selectedFighter[1].replace("<br>", "") : null}
                    </Alert>
                </Snackbar>

                <Snackbar open={this.state.showModal} onClose={this.handleClose}>
                    <Alert onClose={this.handleClose} severity="info">
                        Le combat sera  : {this.state.selectedFighter.length > 1 ? this.state.selectedFighter[0].replace("<br>", "") : null} VS {this.state.selectedFighter.length >1 ? this.state.selectedFighter[1].replace("<br>", "") : null}
                    </Alert>
                </Snackbar>


            </Grid>
        );
    }


}

export default (FightersBuild);
