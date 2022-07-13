import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Center from './components/Center'
import Header from './components/Header'
import Slideshow from './components/Slideshow'

export default function Home() {
  return (
    <div>
      <Head>
        <title>MISTRI 1.0</title>
      </Head>
      
      {/* <Header /> */}

      <main className=" bg-homebg">
        <div>
        <Center/>
        </div>   
        <Slideshow/>
      </main>
      
    </div>
    
  )
}