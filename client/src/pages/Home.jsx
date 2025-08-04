import Hero from '../components/Hero'
import PopularVacancies from '../components/PopularVacancies'
import Work from '../components/Work'
import Categories from '../components/Categories'
import Jobs from '../components/Jobs'
import { useEffect } from 'react'
import { useContext } from 'react'
import { AppContext } from '../context/AppContext'

const Home = () => {
  const {setQuery} = useContext(AppContext);
  useEffect(()=>{
    setQuery('');
  },[])
  return (
    <div>
      <Hero/>
      <PopularVacancies/>
      <Work/>
      <Categories/>
      <Jobs/>
    </div>
  )
}

export default Home
