import React from 'react';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

class Audioplayer extends React.Component {

    render() {

        return (
            <AudioPlayer
                autoPlay={this.props.auto}
                src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
                onPlay={e => console.log("onPlay")}
                // other props here
            />
        );
    }
}

export default (Audioplayer);