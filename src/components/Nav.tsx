import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMusic } from '@fortawesome/free-solid-svg-icons'

interface NavProps {
  libraryStatus: boolean;
  setLibraryStatus: (status: boolean) => void
}

const Nav: React.FC<NavProps> = ({libraryStatus, setLibraryStatus}) => {
  return (
    <nav>
      <h1>Waves</h1>
      <button onClick={() => setLibraryStatus(!libraryStatus)}>
        Library
        <FontAwesomeIcon icon={faMusic} />
      </button>
    </nav>
    )
}

export default Nav;