
import React, { useCallback } from 'react';
import SongProps from '../dto/Song';

interface Props {
    song: SongProps;
    songs: SongProps[];
    isPlaying: boolean;
    audioRef: React.RefObject<HTMLAudioElement>,
    setCurrentSong: (song: SongProps) => void;
    setSongs: (songs:SongProps[]) => void
}

const LibrarySong: React.FC<Props> = ({song, setCurrentSong, setSongs, audioRef, isPlaying, songs}) => {
  const songSelectHandler = async () => {
    await setCurrentSong(song)
    // Add Active State
    const newSongs = songs.map((songState: SongProps) => {
      if(songState.id === song.id) {
        return {
          ...songState,
          active: true
        }
      } else {
        return {
          ...songState,
          active: false
        }
      }
    })
    setSongs(newSongs);

    // Check if the song is playing
    if(isPlaying) audioRef.current?.play();
  }

  return (
    <div onClick={songSelectHandler} className={`library-song ${song.active ? 'selected' : ''}`}>
      <img src={song.cover} alt={song.name}/>
      <div className="song-description">
        <h3>{song.name}</h3>
        <h4>{song.artist}</h4>
      </div>
    </div>
  )
}

export default LibrarySong