import React from 'react';
import LibrarySong from './LibrarySong';

import SongProps from '../dto/Song';

interface SongsProps {
  songs: SongProps[],
  isPlaying: boolean;
  libraryStatus: boolean;
  audioRef: React.RefObject<HTMLAudioElement>,
  setCurrentSong: (song:SongProps) => void
  setSongs: (songs:SongProps[]) => void
}

const Library: React.FC<SongsProps> = ({
  songs, 
  setCurrentSong, 
  setSongs, 
  audioRef, 
  isPlaying,
  libraryStatus
}) => {
  return (
    <div className={`library ${libraryStatus ? 'active-library' : ''}`}>
      <h2>Library</h2>
      <div className="library-songs">
        {songs.map((song: SongProps) => 
          <LibrarySong 
            song={song}
            songs={songs}
            isPlaying={isPlaying}
            key={song.id}
            audioRef={audioRef}
            setCurrentSong={setCurrentSong} 
            setSongs={setSongs}
          />
        )}
      </div>
    </div>
  )
}

export default Library;