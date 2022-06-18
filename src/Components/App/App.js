//import logo from './logo.svg';
import React from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
// import Track from '../Track/Track'
import Playlist from '../Playlist/Playlist';

import Spotify from '../../util/Spotify';

class App extends React.Component {

//updateTitle

  constructor(props) {
    super(props);
    this.state = {
      searchResults: [], //before it was hard coded array, meaning the array was just filled w/ smth like a placeholder
      playlistName: 'My Playlist', //{playlistName: 'playlistName'}
      playlistTracks: []
    };

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  addTrack(track) {
    let tracks = this.state.playlistTracks;
    if (tracks.find(savedTrack => savedTrack.id === track.id)) {
      return;
    }

    tracks.push(track);
    this.setState({ playlistTracks: tracks })
  }

  removeTrack(track) {
    let tracks = this.state.playlistTracks;
    tracks = tracks.filter(currentTrack => currentTrack.id !== track.id);

    this.setState({ playlistTracks: tracks });
  }

  updatePlaylistName(name) {
    this.setState({ playlistName: name });
  }

  savePlaylist() {
    //alert('this method is linked to the button correctly! :)')
    const trackUris = this.state.playlistTracks.map(track => track.uri);
    //step 95 down
    Spotify.savePlayList(this.state.playlistName, trackUris).then(() => {
      this.setState({ 
        playlistName: 'New Playlist',
        playlistTracks: []
       })
    })
  }

  search(term) {
    Spotify.search(term).then(searchResults => {       //step 88
      this.setState({ searchResults: searchResults })  //step 88
    });
  }

  render() {
    return(
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
          <div className="App">
            <SearchBar onSearch={this.search} />
            <div className="App-playlist">
              <SearchResults 
              searchResults={this.state.searchResults} 
              onAdd={this.addTrack}
              />
              <Playlist 
              playlistName={this.state.playlistName} 
              playlistTracks={this.state.playlistTracks}
              onRemove={this.removeTrack} //astea de ce nu au nevoie de .state ??
              onNameChange={this.updatePlaylistName} 
              onSave={this.savePlaylist}/>
            </div>
          </div>
        </div>
    )
  }
}

export default;
