import React from 'react';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import voices from "../event/constants/medias.json";

class Audioeffect extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            voices: voices,
        }
    }

    render() {
        return (
            <div style={{display:"none"}}>
                <AudioPlayer
                    autoPlay={true}
                    src={this.state.voices[0].url}
                    onPlay={e => console.log("onPlay")}
                    // other props here
                />
            </div>
        );
    }
}

export default (Audioeffect);