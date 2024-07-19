import React from 'react'
import { Carousel, Categories, NewArrivals, RandomProducts, SearchBar, SpecificProduct } from '../components'


const Home = () => {
  return (
    <>
    <Carousel />
    <SearchBar />
    <Categories />
    <RandomProducts />
    <NewArrivals />
    <SpecificProduct />
    </>
  )
}

export default Home