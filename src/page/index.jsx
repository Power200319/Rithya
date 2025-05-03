import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import AboutSection from '../components/AboutSection'
import ProgramsSection from "../components/ProgramsSection"
import ScheduleSection from '../components/ScheduleSection'
import GallerySection from '../components/GallerySection'
import TestimonialsSection from '../components/TestimonialsSection'
import VideoGallery from '../components/VideoGallery'
import ContactSection from '../components/ContactSection'
import Footer from '../components/Footer'

const index = () => {
  return (
    <>
    <Navbar />
    <Hero />
    <AboutSection />
    {/* <ProgramsSection /> */}
    <ScheduleSection />
    <GallerySection />
    <VideoGallery />
    <TestimonialsSection />
    <ContactSection />
    <Footer />
    </>
  )
}

export default index