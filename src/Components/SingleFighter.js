import React from 'react';
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";

class SingleFighter extends React.Component {

    render() {
        let {value, index} = this.props;
        function importAll(r) {
            return r.keys().map(r);
        }

        const images = importAll(require.context('../images', false, /\.(png|jpe?g|svg)$/));


        let styleSwitch = {};

        if (this.props.value.disabled) {
            styleSwitch = {textAlign: "center", filter: "blur(3px)", backgroundColor: "#588BAE"};

        } else {
            styleSwitch = {textAlign: "center"};
        }

        return (
            <Grid key={value.id} item>
                <Card style={{textAlign: "center", width: '100px', height: '100px'}}>
                    <CardActionArea>
                        <img className={"bobeffect"} onClick={(e) => this.props.handleStyle(value.id, index)} style={styleSwitch}
                             src={images[this.props.index]}
                             alt={value.displayNameEn}/>
                    </CardActionArea>
                </Card>

            </Grid>
        );
    }
}

export default (SingleFighter);
