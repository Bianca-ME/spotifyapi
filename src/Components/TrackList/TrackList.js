import React from 'react';
import './TrackList.css';
import Track from '../Track/Track';


class TrackList extends React.Component{
    render() {
        return (
            <div className="TrackList">
                {
                    this.props.tracks.map(track => { 
                        return <Track 
                        track={track} 
                        key={track.id} 
                        onAdd={this.props.onAdd} //ramane cu semnul intrebarii de ce e undefined. dar la tip in walkthrough nu apare onAdd deloc
                        onRemove={this.props.onRemove}
                        isRemoval={this.props.isRemoval}/>
                        }
                    )
                }
                
            </div>
            
        )
    }
}

export default TrackList;