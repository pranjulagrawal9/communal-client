import React from 'react'
import { useSelector } from 'react-redux';
import Suggestion from '../suggestion/Suggestion';
import './Suggested.scss'

function Suggested() {
    const myProfile = useSelector((state) => state.appConfigSlice.myProfile);

  return (
    <div className='suggested-container'>  
        <div className="suggested-box">
            <h3>Suggested</h3>
            {myProfile?.suggestions.map((suggestion) => {
                return (
                    <Suggestion
                    key={suggestion._id}
                    name={suggestion.name}
                    avatarImg={suggestion?.userImg?.url}
                    userId={suggestion._id}
                    />
                );
                })}
        </div>
    </div>
  )
}

export default Suggested