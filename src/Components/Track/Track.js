import React from 'react';
import './Track.css';


class Track extends React.Component{
  constructor(props) {
    super(props);
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    //cand scriu bind zice cannot read undefined
  }

  renderAction() {
    if (this.props.isRemoval) {
      return <button className='Track-action' onClick={this.removeTrack}>-</button>
    } else {
      return <button className='Track-action' onClick={this.addTrack}>+</button> //47
    }
  }
  
  addTrack() {
    this.props.onAdd(this.props.track); //passing track to onAdd.in other words: add this.props.track to the playlist. check if .. it has an id. if it doesn't, it will be pushed in the... // after writing this, when u remove a song, it is filtered out

   
  }

  removeTrack() {
    this.props.onRemove(this.props.track);
  }

  render() {
    return(
      <div className="Track">
        <div className="Track-information">
          <h3>{this.props.track.name}</h3>
          <p>{this.props.track.artist} | {this.props.track.album}</p>
        </div>
        {this.renderAction()}
      </div>
    )
  }
}

export default Track;
