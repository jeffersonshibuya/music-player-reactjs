import React, { useCallback, useRef, useState } from 'react';

import Player from './components/Player';
import Song from './components/Song';
import Library from './components/Library';

import './styles/app.scss'

import data from './songs'
import SongProps from './dto/Song'
import Nav from './components/Nav';

function App() {
  const [songs, setSongs] = useState<SongProps[]>(data());
  const [currentSong, setCurrentSong] = useState<SongProps>(songs[0])
  const [isPlaying, setIsPlaying] = useState(false);
  const [libraryStatus, setLibraryStatus] = useState(false)
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
    animationPercentage: 0
  })
  
  const audioRef = useRef<HTMLAudioElement>(null);

  const timeUpdateHandler = useCallback((e: any) => {
    const current = e.target.currentTime;
    const duration = e.target.duration;
    
    //Calculate Percentage
    const roundedCurrent = Math.round(current)
    const roundedDuration = Math.round(duration)
    const animationPercentage = Math.round((roundedCurrent / roundedDuration) * 100)
    
    setSongInfo({
      ...songInfo,
      currentTime: current,
      duration,
      animationPercentage
    })
  }, [songInfo])

  const songEndHandler = async () => {
    let currentIndex = songs.findIndex((song: SongProps) => song.id === currentSong.id)
    await setCurrentSong(songs[(currentIndex + 1) % songs.length])
    if(isPlaying) audioRef.current && audioRef.current?.play()
  }

  return (
    <div className={`App ${libraryStatus ? 'library-active' : ''}`}>
      <Nav 
        libraryStatus={libraryStatus} 
        setLibraryStatus={setLibraryStatus}
      />
      <Song  currentSong={currentSong} isPlaying={isPlaying}/>
      <Player 
        currentSong={currentSong}
        songs={songs}
        isPlaying={isPlaying} 
        songInfo={songInfo}
        audioRef={audioRef}
        setSongInfo={setSongInfo}
        setIsPlaying ={setIsPlaying}
        setCurrentSong={setCurrentSong}
        setSongs={setSongs}
      />
      <Library 
        songs={songs}
        libraryStatus={libraryStatus}
        setCurrentSong={setCurrentSong}
        audioRef={audioRef}
        isPlaying={isPlaying}
        setSongs={setSongs}
      />
      <audio
        ref={audioRef} 
        src={currentSong.audio}
        onTimeUpdate={timeUpdateHandler}
        onLoadedMetadata={timeUpdateHandler}
        onEnded={songEndHandler}
      >
       </audio>
    </div>
  );
}

export default App;
