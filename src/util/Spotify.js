const clientId = '3070a1cb946944f2a95848eacb0eaa87'; //step 82
const redirectUri = 'http://localhost:3000/callback/'; //step 82
let accessToken;

const Spotify = {
    getAccessToken() {
        if (accessToken) {
            return accessToken;
        }

        //check for access token match
        const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/); //regex //step 79
        const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/); //step 79

        if (accessTokenMatch && expiresInMatch) {  //step 80
            accessToken = accessTokenMatch[1];
            const expiresIn = Number(expiresInMatch[1]);
            //Clear the parameters from the URL, so the app doesn’t try grabbing the access token after it has expired
            window.setTimeout(() => accessToken = '', expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');
            return accessToken;
        } else { //step 83
            const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
            window.location = accessUrl;
        }
    }, 

    search(term) { //step 85, 86
        const accessToken = Spotify.getAccessToken();
        return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`,
        { headers: {
            Authorization: `Bearer ${accessToken}` 
            }
        }).then(response => {
            return response.json();
        }).then(jsonResponse => {
            if (!jsonResponse.tracks) {
                return [];
            }
            return jsonResponse.tracks.items.map(track => ({
                id: track.id,
                name: track.name,
                artist: track.artists[0].name,
                album: track.album.name,
                uri: track.uri
            }));
        });
    }, 

    savePlayList(name, trackUris) {       //step 89, 90
        if (!name || !trackUris.length) { //gresit? !!
            return;
        }

        const accessToken = Spotify.getAccessToken();                //step 91
        const headers = { Authorization: `Bearer ${accessToken}` };  //step 91
        let userId;                                                  //step 91

        return fetch('https://api.spotify.com/v1/me', { headers: headers }    //step 92
        ).then(response => response.json()
        ).then(jsonResponse => {
            userId = jsonResponse.id;
            //step 93 down
            return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`,
            {
                headers: headers,
                method: 'POST',
                body: JSON.stringify({ name: name })
            }).then(response => response.json()
            ).then(jsonResponse => {
                const playlistId = jsonResponse.id;
                //step 94 down
                return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`, 
                {
                    headers: headers,
                    method: 'POST',
                    body: JSON.stringify({ uris: trackUris })
                });
            })

        })
    }
}

export default Spotify;