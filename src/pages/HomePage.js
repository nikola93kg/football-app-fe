import React, { useEffect, useState } from 'react'
import "../styles/HomePage.css"
import { useDispatch, useSelector } from 'react-redux'
import { playMusic, pauseMusic } from "../redux/actions/musicActions"
import pes6 from "../assets/mainMenu.mp3"
import Loading from '../components/Loading'

function HomePage() {

  // razmisli o tome da ova tema (pesma) ide kroz celu app?

  const dispatch = useDispatch();
  const isPlaying = useSelector(state => state.music.playing);
  const [audio] = useState(new Audio(pes6));

  useEffect(() => {
    const playAudio = async () => {
      try {
        if (isPlaying) {
          await audio.play();
        } else {
          audio.pause();
        }
      } catch (error) {
        console.error("Error playing audio:", error);
      }
    }

    playAudio();
  }, [isPlaying, audio])

  useEffect(() => {
    dispatch(playMusic());

    return () => {
      audio.pause();
      audio.currentTime = 0;
      dispatch(pauseMusic());
    }
  }, [dispatch, audio]);

  return (
    <div className='homepage-container'>
      {/* <Loading /> */}
    </div>
  )
}

export default HomePage