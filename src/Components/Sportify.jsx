import React, { useEffect, useState } from "react";
import axios from "axios";

const Sportify = () => {
  const endPoint = "https://accounts.spotify.com/api/token";
  const clientId = "e90334af58fc4a1babcf623968a10ac3";
  const clientSecret = "0449b3a0919944ffa18f5fb6f1d48b4e";
  const playlistId = "37i9dQZF1DWYkaDif7Ztbp"; // Replace with the actual playlist ID

  const [playlistInfo, setPlaylistInfo] = useState(null);
  const [currentAudio, setCurrentAudio] = useState(new Audio()); // Initialize with an empty Audio object

  const getToken = () => {
    const headers = {
      "Content-Type": "application/x-www-form-urlencoded",
    };
    const data = new URLSearchParams();
    data.append("client_id", clientId);
    data.append("client_secret", clientSecret);
    data.append("grant_type", "client_credentials");

    // Send POST request to get access token
    axios
      .post(endPoint, data, { headers })
      .then((response) => {
        const accessToken = response.data.access_token;

        // Set the headers for the playlist request
        const playlistHeaders = {
          Authorization: `Bearer ${accessToken}`,
        };

        // Send GET request to get playlist information
        axios
          .get(`https://api.spotify.com/v1/playlists/${playlistId}`, {
            headers: playlistHeaders,
          })
          .then((playlistResponse) => {
            // Handle the playlist response
            setPlaylistInfo(playlistResponse.data);
            console.log(playlistResponse.data);
          })
          .catch((playlistError) => {
            // Handle playlist errors
            console.error("Error fetching playlist:", playlistError);
          });
      })
      .catch((error) => {
        // Handle errors
        console.error("Error fetching token:", error);
      });
  };

  useEffect(() => {
    getToken();
  }, []);

  const playAudio = (previewUrl) => {
    currentAudio.pause();
    currentAudio.src = previewUrl;
    currentAudio.play();
  };

  return (
    <main>
      <div className="text-5xl font-bold text-yellow-400">
      <h1>Sportify</h1>
      </div>

      {playlistInfo && (
        <div className="text-white">
          <h2>Playlist Information:</h2>
          <p>Title: {playlistInfo.name}</p>
          <p>Owner: {playlistInfo.owner.display_name}</p>
          <p>Total Tracks: {playlistInfo.tracks.total}</p>

          <h3>Tracks:</h3>
        <section className="p-3 overflow-y-auto cursor-pointer">
          {playlistInfo.tracks.items.map((track, i) => (
            <div key={i} className="rounded-sm border-x-0  border-t-2 p-2 my-2"  onClick={() => playAudio(track.track.preview_url)}>
              <p>Title: {track.track.name}</p>
              <p>Artist(s): {track.track.artists.map(artist => artist.name).join(', ')}</p>
             
            </div>
          ))}
        </section>

            <div className="bg-white fixed bottom-0 w-">
          <audio controls ref={(audio) => { setCurrentAudio(audio); }} loop></audio>
            </div>
          
        </div>
      )}


      
    </main>
  );
};

export default Sportify;
