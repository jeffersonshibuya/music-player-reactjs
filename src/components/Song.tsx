import React from 'react';
import SongProps from '../dto/Song';

interface Props {
    currentSong: SongProps;
    isPlaying: boolean;
}


const Song: React.FC<Props> = ({currentSong, isPlaying}) => {
  return (
    <div className="song-container">
      <img className={`${isPlaying ? 'rotateImage' : ''}`} src={currentSong.cover} alt={currentSong.name}/>
      <h2>{currentSong.name}</h2>
      <h3>{currentSong.artist}</h3>
    </div>
  )
}

export default Song