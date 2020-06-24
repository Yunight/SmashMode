import React from 'react';
import fighters from "../fighter_data/fighters";
import Grid from "@material-ui/core/Grid";
import SingleFighter from "./SingleFighter";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";


class FightersBuild extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            setStyle: true,
            fightersList: fighters,
            showModal: false,
            selectedFighter: ""
        }
    }

    getRandomInt = (max) => {
        return Math.floor(Math.random() * Math.floor(max));
    };


    handleRandom = (fighters_list) => {
        let selectedFighter = "";

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
                selectedFighter: selectedFighter
            }));
        }
    };

    handleReset = (fighters_list) => {

        let tempFightersList = fighters_list;
        tempFightersList.map(fighter => {
            return fighter.disabled = false;
        });

        this.setState((state, props) => ({
            fightersList: tempFightersList,
        }));
    };

    handleStyle = (id, index) => {
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
    };

    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        this.setState((state, props) => ({
            showModal: false,
        }));
    };


    render() {

        let listAvailable = this.state.fightersList.filter(fighter => fighter.disabled === false);

        return (

            <Grid container style={{flexGrow: "1"}} spacing={2}>
                <Grid item xs={12}>
                    <h2 style={{textAlign: "center"}}>
                        Online Smash DOWN by @<a href="https://twitter.com/NightOfLunaTV"> NightOfLunaTV</a>
                    </h2>
                    <Grid container justify="center" spacing={2}>
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
                <Container style={{textAlign: "center"}}>
                    <Button onClick={(e) => this.handleRandom(this.state.fightersList)} variant="outlined" size="large"
                            color="primary"
                            disabled={listAvailable.length === 0}
                            style={{height: "150px", width: "350px", fontSize: "70px"}}>
                        RANDOM
                    </Button>
                    <Button onClick={(e) => this.handleReset(this.state.fightersList)} variant="outlined" size="large"
                            color="secondary"
                            style={{height: "50", width: "100px", fontSize: "20px", margin: "100px"}}>
                        RESET
                    </Button>
                    <Container style={{textAlign: "center"}}>
                        Restants : {listAvailable.length}
                    </Container>
                </Container>
                <Snackbar open={this.state.showModal} autoHideDuration={2000} onClose={this.handleClose}>
                    <Alert onClose={this.handleClose} severity="info">
                        Ce combattant a été sélectionné : {this.state.selectedFighter.replace("<br>", "")}
                    </Alert>
                </Snackbar>

            </Grid>
        );
    }


}

export default (FightersBuild);
