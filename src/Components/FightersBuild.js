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
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import bgimg from "../otherPictures/character_bg.png" ;
import random from "../otherPictures/random.png"

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
        }
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

        function importAll(r) {
            return r.keys().map(r);
        }

        const images_large = importAll(require.context('../img_larges', false, /\.(png|jpe?g|svg)$/));

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

                <Container>
                    <Grid container spacing={3} style={{textAlign: "center"}}
                          direction="row"
                          justify="space-between"
                          alignItems="center">
                        <Grid item xs={3} >
                            <Card className={{maxWidth: 100}} style={{backgroundImage:`url(${bgimg})`,backgroundSize: 'cover',}}>
                                <CardActionArea>
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="h2">
                                             {this.state.selectedFighter.length > 1 ? this.state.selectedFighter[0].replace("<br>", "") : "PRESS RANDOM !"}
                                        </Typography>
                                    </CardContent>
                                    <img  style={{height:250,backgroundSize: 'contains',backgroundRepeat:"no-repeat"}}
                                          src={this.state.charIndex !== "" ? images_large[this.state.charIndex[0]] : random} alt={"CHARACTER"}/>

                                </CardActionArea>

                            </Card>
                        </Grid>

                        <Grid item xs={6}>
                            <Button onClick={(e) => this.handleRandom(this.state.fightersList)} variant="contained" size="large"
                                    color="primary"
                                    disabled={listAvailable.length === 0 || (this.state.switchActive && this.state.selectedFighter.length > 0)}
                                    >
                                    {listAvailable.length === 0 ? <h2 className={"bigTitle"}>VIDE</h2> :
                                    <h1 className={"bigTitle"}>RANDOM</h1>}
                                    {this.BoopButton}
                            </Button>

                         </Grid>
                        <Grid item xs={3} >
                            <Card className={{maxWidth: 100}} style={{backgroundImage:`url(${bgimg})`,backgroundSize: 'cover',}}>
                                <CardActionArea>
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            {this.state.selectedFighter.length > 1 ? this.state.selectedFighter[1].replace("<br>", "") : "PRESS RANDOM !"}
                                        </Typography>
                                    </CardContent>
                                    <img  style={{height:250,backgroundSize: 'contains',backgroundRepeat:"no-repeat"}}
                                          src={this.state.charIndex !== "" ? images_large[this.state.charIndex[1]] : random} alt={"CHARACTER"}/>

                                </CardActionArea>

                            </Card>
                        </Grid>
                    </Grid>
                </Container>
                <Container style={{textAlign: "center", padding: "10px"}}>

                </Container>
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

                <Snackbar open={this.state.showFirstModal} onClose={this.handleClose}>
                    <Alert onClose={this.handleClose} severity="info">
                        Le combat sera  : {this.state.selectedFighter.length > 1 ? this.state.selectedFighter[0].replace("<br>", "") : null} VS {this.state.selectedFighter.length >1 ? this.state.selectedFighter[1].replace("<br>", "") : null}
                    </Alert>
                </Snackbar>

            </Grid>
        );
    }


}

export default (FightersBuild);
