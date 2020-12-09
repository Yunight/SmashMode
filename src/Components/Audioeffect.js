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

        let soundEffect = "https://benchi-chen.com/wp-content/uploads/2020/12/Random_Selection.mp3";

        return (
            <div style={{display:"none"}}>
                <AudioPlayer
                    autoPlay={true}
                    src={this.props.eventCounter === 3 ? this.state.voices[this.props.selectedDialogue].sound : soundEffect}
                    onPlay={e => console.log("onPlay")}
                    // other props here
                />
            </div>
        );
    }
}

export default (Audioeffect);