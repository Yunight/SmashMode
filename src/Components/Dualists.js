import React from 'react';
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import bgimg1 from "../otherPictures/character_bg_1.png";
import bgimg2 from "../otherPictures/character_bg_2.png";
import btnbg from "../otherPictures/btn_bg.png";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import random from "../otherPictures/random.png";
import TextField from "@material-ui/core/TextField";

class Dualists extends React.Component {

    render() {

        function importAll(r) {
            return r.keys().map(r);
        }

        const images_large = importAll(require.context('../img_larges', false, /\.(png|jpe?g|svg)$/));

        return (
            <Container>
                <Grid container spacing={3} style={{textAlign: "center"}}
                      direction="row"
                      justify="space-between"
                      alignItems="center">
                    <Grid item sm={3} xs={12} >
                        <Card  style={{backgroundImage:`url(${bgimg1})`,backgroundSize: 'cover',}}>
                            <CardActionArea>
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2" style={{color:"white",fontFamily:"Anton",fontSize:29}}>
                                        {this.props.selectedFighter.length > 1 ? this.props.selectedFighter[0].replace("<br>", "") : "PRESS RANDOM !"}
                                    </Typography>
                                </CardContent>
                                <img  style={{height:250,backgroundSize: 'contains',backgroundRepeat:"no-repeat"}}
                                      src={this.props.charIndex !== "" ? images_large[this.props.charIndex[0]] : random} alt={"CHARACTER"}/>

                            </CardActionArea>
                        </Card>
                    </Grid>
                    <Grid item sm={1} xs={12} style={{backgroundColor:"white",borderRadius:5,padding:10}}>
                        <TextField style={{paddingBottom:10}} id="p1wins" label="Wins" variant="outlined"
                                   value={this.props.players[0].wins ? this.props.players[0].wins : ""} disabled={true} />
                        <TextField id="p1score" label="Score" variant="outlined"
                                   value={this.props.players[0].score ? this.props.players[0].score : ""} disabled={true}/>
                    </Grid>

                    {this.props.isFighting === false &&
                        <Grid item sm={4} xs={12}>
                            <Button onClick={(e) => this.props.handleRandom(this.props.fightersList)} variant="contained" size="large"
                                    color="primary"
                                    aria-readonly={this.props.isLoading}
                                    style={{backgroundImage:`url(${btnbg})`,backgroundSize: 'cover'}}
                                    disabled={this.props.listAvailable.length === 0 || (this.props.switchActive && this.props.selectedFighter.length > 0) || this.props.isLoading}>
                                        {this.props.listAvailable.length === 0 ? <h2 className={"bigTitle"}>VIDE</h2> :
                                            <h1 className={"bigTitle"}>RANDOM</h1>}
                                        {this.BoopButton}
                            </Button>
                        </Grid>
                    }

                    {this.props.isFighting === true &&
                        <Grid item sm={4} xs={12} >
                            <Button className={"btnfullWidth p1bg" }
                                    variant="outlined"
                                    onClick={(e) => this.props.handleRandom(this.props.fightersList)} variant="contained" size="large"
                                    color="primary"
                                    aria-readonly={this.props.isLoading}
                                    disabled={this.props.listAvailable.length === 0 || (this.props.switchActive && this.props.selectedFighter.length > 0) || this.props.isLoading}>
                                    <h2>P1 WIN</h2>
                            </Button>

                            <Button className={"btnfullWidth p2bg"}
                                    variant="outlined"
                                    onClick={(e) => this.props.handleRandom(this.props.fightersList)} variant="contained" size="large"
                                    color="secondary"
                                    aria-readonly={this.props.isLoading}
                                    disabled={this.props.listAvailable.length === 0 || (this.props.switchActive && this.props.selectedFighter.length > 0) || this.props.isLoading}>
                                    <h2 >P2 WIN</h2>
                            </Button>
                        </Grid>
                    }


                    <Grid item sm={1} xs={12} style={{backgroundColor:"white",borderRadius:5,padding:10}}>
                        <TextField style={{paddingBottom:10}} id="p2wins" label="Wins" variant="outlined"
                                   value={this.props.players[1].p2_wins ? this.props.players[1].p2_wins : ""} disabled={true} />
                        <TextField id="p2score" label="Score" variant="outlined"
                                   value={this.props.players[1].p2_score ? this.props.players[1].p2_score : ""} disabled={true}/>
                    </Grid>
                    <Grid item sm={3} xs={12} >
                        <Card style={{backgroundImage:`url(${bgimg2})`,backgroundSize: 'cover',}}>
                            <CardActionArea>
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2" style={{color:"white",fontFamily:"Anton",fontSize:29}}>
                                        {this.props.selectedFighter.length > 1 ? this.props.selectedFighter[1].replace("<br>", "") : "PRESS RANDOM !"}
                                    </Typography>
                                </CardContent>
                                <img  style={{height:250,backgroundSize: 'contains',backgroundRepeat:"no-repeat"} }
                                      src={this.props.charIndex !== "" ? images_large[this.props.charIndex[1]] : random} alt={"CHARACTER"}/>

                            </CardActionArea>

                        </Card>
                    </Grid>
                </Grid>
            </Container>
        );
    }
}

export default (Dualists);