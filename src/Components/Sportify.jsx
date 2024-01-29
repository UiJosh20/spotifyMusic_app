import React, { useEffect, useState } from "react";
import axios from "axios";
import "./spotify.css";
const Sportify = () => {
  const endPoint = "https://accounts.spotify.com/api/token";
  const clientId = "e90334af58fc4a1babcf623968a10ac3";
  const clientSecret = "0449b3a0919944ffa18f5fb6f1d48b4e";
  const playlistId = "37i9dQZF1EIVYZ5o7aZ0c1"; 


  const [playlistInfo, setPlaylistInfo] = useState(null);
  const [currentAudio, setCurrentAudio] = useState(new Audio()); // Initialize with an empty Audio object
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(null);
  const [darkMode, setDarkMode] = useState(false); // State variable for dark mode

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

  const playAudio = (previewUrl, index) => {
    currentAudio.pause();
    currentAudio.src = previewUrl;
    currentAudio.play();
    setIsPlaying(true);
    setCurrentSongIndex(index);
  };
  currentAudio.addEventListener("pause", () => {
    setIsPlaying(false);
  });

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <main className={darkMode ? "dark-mode" : ""}>
      <button onClick={toggleDarkMode} >
        {darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
      </button>
      <div className="flex justify-between align-middle px-5">
        <div className="currentplaying">
          <svg
            height="50px"
            width="50px"
            viewBox="0 0 64 64"
            xmlns="http://www.w3.org/2000/svg"
            className="spotify"
          >
            <radialGradient
              gradientUnits="userSpaceOnUse"
              gradientTransform="translate(0 -534)"
              r="43.888"
              cy="572.064"
              cx="33.34"
              id="ipdIa4~cOclR8yt_ClW93a"
            >
            </radialGradient>
            <path
              d="M51.03,37.34c0.16,0.98,1.08,1.66,2.08,1.66h5.39c2.63,0,4.75,2.28,4.48,4.96	C62.74,46.3,60.64,48,58.29,48H49c-1.22,0-2.18,1.08-1.97,2.34c0.16,0.98,1.08,1.66,2.08,1.66h8.39c1.24,0,2.37,0.5,3.18,1.32	C61.5,54.13,62,55.26,62,56.5c0,2.49-2.01,4.5-4.5,4.5h-49c-1.52,0-2.9-0.62-3.89-1.61C3.62,58.4,3,57.02,3,55.5	C3,52.46,5.46,50,8.5,50H14c1.22,0,2.18-1.08,1.97-2.34C15.81,46.68,14.89,44,13.89,44H5.5c-2.63,0-4.75-2.28-4.48-4.96	C1.26,36.7,3.36,35,5.71,35H8c1.71,0,3.09-1.43,3-3.16C10.91,30.22,9.45,29,7.83,29H4.5c-2.63,0-4.75-2.28-4.48-4.96	C0.26,21.7,2.37,20,4.71,20H20c0.83,0,1.58-0.34,2.12-0.88C22.66,18.58,23,17.83,23,17c0-1.66-1.34-3-3-3h-1.18	c-0.62-0.09-1.43,0-2.32,0h-9c-1.52,0-2.9-0.62-3.89-1.61S2,10.02,2,8.5C2,5.46,4.46,3,7.5,3h49c3.21,0,5.8,2.79,5.47,6.06	C61.68,11.92,60.11,14,57.24,14H52c-2.76,0-5,2.24-5,5c0,1.38,0.56,2.63,1.46,3.54C49.37,23.44,50.62,24,52,24h6.5	c3.21,0,5.8,2.79,5.47,6.06C63.68,32.92,61.11,35,58.24,35H53C51.78,35,50.82,36.08,51.03,37.34z"
              fill="url(#ipdIa4~cOclR8yt_ClW93a)"
            ></path>
            <linearGradient
              gradientUnits="userSpaceOnUse"
              gradientTransform="translate(0 -534)"
              y2="590.253"
              y1="530.096"
              x2="32"
              x1="32"
              id="ipdIa4~cOclR8yt_ClW93b"
            >
              <stop stopColor="#CD3232" offset="0"></stop>{" "}
              <stop stopColor="#CD3232" offset=".219"></stop>{" "}
              <stop stopColor="#CD3232" offset=".644"></stop>{" "}
              <stop stopColor="#CD3232" offset="1"></stop>{" "}
            </linearGradient>
            <path
              d="M57,32c0,12.837-9.663,23.404-22.115,24.837C33.942,56.942,32.971,57,32,57	c-1.644,0-3.25-0.163-4.808-0.471C15.683,54.298,7,44.163,7,32C7,18.192,18.192,7,32,7S57,18.192,57,32z"
              fill="url(#ipdIa4~cOclR8yt_ClW93b)"
            ></path>
            <path
              d="M41.683,44.394c-0.365,0-0.731-0.181-1.096-0.365c-3.471-2.009-7.674-3.105-12.24-3.105	c-2.559,0-5.116,0.364-7.491,0.912c-0.365,0-0.914,0.183-1.096,0.183c-0.914,0-1.461-0.732-1.461-1.462	c0-0.913,0.547-1.463,1.279-1.643c2.923-0.732,5.846-1.096,8.951-1.096c5.116,0,9.866,1.276,13.885,3.655	c0.548,0.364,0.914,0.73,0.914,1.642C43.145,43.847,42.414,44.394,41.683,44.394z M44.241,38.181c-0.547,0-0.912-0.18-1.279-0.364	c-3.835-2.375-9.135-3.839-15.163-3.839c-2.924,0-5.664,0.366-7.674,0.916c-0.549,0.18-0.731,0.18-1.096,0.18	c-1.096,0-1.827-0.912-1.827-1.826c0-1.096,0.549-1.645,1.461-2.009c2.74-0.73,5.481-1.279,9.317-1.279	c6.213,0,12.241,1.463,16.991,4.384c0.73,0.364,1.096,1.096,1.096,1.826C46.069,37.269,45.337,38.181,44.241,38.181z M47.165,30.876	c-0.548,0-0.731-0.182-1.279-0.364c-4.385-2.559-10.961-4.021-17.356-4.021c-3.289,0-6.577,0.366-9.5,1.096	c-0.366,0-0.731,0.182-1.279,0.182c-1.279,0.183-2.193-0.912-2.193-2.192c0-1.279,0.731-2.009,1.644-2.192	c3.471-1.096,7.125-1.462,11.327-1.462c6.943,0,14.25,1.462,19.731,4.567c0.73,0.366,1.278,1.096,1.278,2.193	C49.357,29.961,48.442,30.876,47.165,30.876z"
              fill="#fff"
            ></path>
          </svg>
          <p className="heading">Currently Playing</p>
        </div>
      </div>

      {playlistInfo && (
        <div>
          {/* <h2>Playlist Information:</h2>
          <p>Title: {playlistInfo.name}</p>
          <p>Owner: {playlistInfo.owner.display_name}</p>
          <p>Total Tracks: {playlistInfo.tracks.total}</p> */}

          <div className="main mb-30">
            {playlistInfo.tracks.items.map((track, i) => (
              <div
                className={`loader ${
                  isPlaying && currentAudio.src === track.track.preview_url
                    ? "loading"
                    : ""
                } text-sm `}
                key={i}
                onClick={() => playAudio(track.track.preview_url, i)}
              >
                <div className="song">
                  <p class="name">{track.track.name}</p>
                  <p class="artist">
                    Artist(s):{" "}
                    {track.track.artists
                      .map((artist) => artist.name)
                      .join(", ")}
                  </p>
                </div>
                <div class="albumcover"></div>
                {isPlaying && currentAudio.src === track.track.preview_url && (
                  <div class="loading">
                    <div class="load"></div>
                    <div class="load"></div>
                    <div class="load"></div>
                    <div class="load"></div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="bg-white fixed bottom-0 w-full flex p-4">
            <audio
              controls
              ref={(audio) => {
                setCurrentAudio(audio);
              }}
              loop
              className="audio-player"
            ></audio>
            <div class="loading1 w-40 flex justify-center">
              <div class="load1"></div>
              <div class="load1"></div>
              <div class="load1"></div>
              <div class="load1"></div>
              <div class="load1"></div>
              <div class="load1"></div>
              <div class="load1"></div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default Sportify;
