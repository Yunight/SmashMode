import React from 'react';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import voices from "../event/constants/dialogue.json";

class Audioeffect extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            voices: voices,
        }
    }
    render() {
        return (this.props.selectedDialogue > -1 ?
            <div style={{display:"none"}}>
                <AudioPlayer
                    autoPlay={true}
                    src={this.state.voices[this.props.selectedDialogue].sound }
                    onPlay={e => console.log("Event sound" + this.props.eventCounter + " " + this.props.selectedDialogue)}
                    // other props here
                />
            </div>: null
        );
    }
}

export default (Audioeffect);