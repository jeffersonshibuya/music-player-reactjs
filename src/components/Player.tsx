import React, {  ChangeEvent, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft, faAngleRight, faPause, faPlay } from '@fortawesome/free-solid-svg-icons'
import SongProps from '../dto/Song';

interface SongInfoProps {
    currentTime: number,
    duration: number,
    animationPercentage: number;
}

interface Props {
  currentSong: SongProps,
  songs: SongProps[],
  isPlaying: boolean,
  audioRef: React.RefObject<HTMLAudioElement>,
  songInfo: SongInfoProps,
  setSongInfo: (songInfo: SongInfoProps) => void,
  setIsPlaying: (isPlaying:boolean) => void
  setCurrentSong: (song:SongProps) => void
  setSongs: (songs:SongProps[]) => void
}

const Player: React.FC<Props> = ({currentSong, songs, isPlaying, 
  setIsPlaying, setCurrentSong, setSongs, audioRef, songInfo, setSongInfo}) => {
  
  const getTime = (time: number) => {
    return (
      Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
    )
  }

  const activeLibraryHandler = (nexPrev: SongProps) => {
    const newSongs = songs.map((songState: SongProps) => {
      if(songState.id === nexPrev.id) {
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
  }

  //Event handlers
  const playSongHandler = useCallback(() => {
    if(isPlaying) {
      audioRef.current?.pause();
    } else {
      audioRef.current?.play();
    }
    setIsPlaying(!isPlaying);
  }, [audioRef, isPlaying, setIsPlaying]);

  const dragHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    if(audioRef.current)
      audioRef.current.currentTime = Number(e.target.value);
    setSongInfo({...songInfo, currentTime: Number(e.target.value)})
  }, [audioRef, setSongInfo, songInfo])

  const skipTrackerHandler = async (direction: string) => {
    let currentIndex = songs.findIndex((song: SongProps) => song.id === currentSong.id)
    console.log(currentIndex, songs.length)
    if(direction === 'skip-forward') {
      await setCurrentSong(songs[(currentIndex + 1) % songs.length])
      activeLibraryHandler(songs[(currentIndex + 1) % songs.length])
    } 
    if(direction === 'skip-back') {
      if((currentIndex - 1) % songs.length === -1) {
        await setCurrentSong(songs[songs.length - 1])
        activeLibraryHandler(songs[songs.length - 1])
        if(isPlaying) audioRef.current?.play();
        return;
      } 
      await setCurrentSong(songs[(currentIndex - 1) % songs.length])
    }
    if(isPlaying) audioRef.current?.play();
  }

  //Add the styles
  const trackAnim = {
    transform: `translateX(${songInfo.animationPercentage}%)`
  }

  return (
    <div className="player">
      <div className="time-control">
        <p>{songInfo.duration ? getTime(songInfo.currentTime) : '0:00'}</p>
        <div style={{background: `linear-gradient(to right, ${currentSong.color[0]}, ${currentSong.color[1]})`}} className="track">
          <input 
            type="range" 
            min={0} 
            max={songInfo.duration || 0} 
            value={songInfo.currentTime}
            onChange={dragHandler}
          />
          <div style={trackAnim} className="animate-track"></div>
        </div>
        <p>{getTime(songInfo.duration)}</p>
      </div>
      <div className="play-control">
        <FontAwesomeIcon 
          className="play" 
          icon={faAngleLeft} 
          size="2x" 
          onClick={() => skipTrackerHandler('skip-back')}
        />
        <FontAwesomeIcon 
          onClick={playSongHandler} 
          className="play" 
          icon={isPlaying ? faPause : faPlay} size="2x" />
        <FontAwesomeIcon 
          className="play" 
          icon={faAngleRight} 
          size="2x" 
          onClick={() => skipTrackerHandler('skip-forward')}
        />
      </div>
      
    </div>
  )
}

export default Player