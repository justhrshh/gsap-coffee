import React, { useRef, useState } from 'react'
import { sliderLists } from '../constants'
import { useGSAP } from '@gsap/react';
import {gsap} from 'gsap';

const Menu = () => {
    const contentRef = useRef()
    const [currentIndex,setCurrentIndex] = useState(0);

    useGSAP(()=>{
        gsap.fromTo('#title', {opacity:0},{opacity:1,duration:1})
        gsap.fromTo('.cocktail img',{opacity:0, xPercent:-100},{xPercent:0,opacity:1,duration:1,ease:'power1.inOut'})
        gsap.fromTo('.details h2',{yPercent:100,opacity:0},{yPercent:0,opacity:100, ease:'power1.inOut'})
        gsap.fromTo('.details p',{yPercent:100,opacity:0},{yPercent:0,opacity:100, ease:'power1.inOut'})

    },[currentIndex])

    const totalBrews = sliderLists.length
    const goToSlide = (index) =>{
        const newIndex = (index + totalBrews) % totalBrews;
        setCurrentIndex(newIndex)
    }
    const getBrewAt = (indexOffset) =>{
        return sliderLists[(currentIndex + indexOffset + totalBrews) % totalBrews]
    }
    const currentBrew = getBrewAt(0);
    const prevBrew = getBrewAt(-1);
    const nextBrew = getBrewAt(1);
  return (
    <section id='menu' aria-labelledby='menu-heading'>
        <img src='images/slider-left-leaf.png' alt='left-leaf' id='m-left-leaf' />
        <img src='images/slider-right-leaf.png' alt='right-leaf' id='m-right-leaf' />

        <h2 id='menu-heading' className='sr-only'>
            Signature Brews
        </h2>

        <nav className='cocktail-tabs' aria-label='Cocktail Navigation'>
            {sliderLists.map((brews,index)=>{
                const isActive = index === currentIndex;
                return(
                    <button key={brews.id} className={`${isActive ? 'text-white border-white' : 'text-white/50 border-white/50' }`}
                    onClick={()=> goToSlide(index)}>
                        {brews.name}
                    </button>
                )
            })}
        </nav>

        <div className='content'>
            <div className='arrows'>
                <button className='text-left' onClick={()=> goToSlide(currentIndex-1)}>
                    <span>{prevBrew.name}</span>
                    <img src='/images/right-arrow.png' alt='right-arrow' aria-hidden='true'/>
                </button>
                <button className='text-left' onClick={()=> goToSlide(currentIndex+1)}>
                    <span>{nextBrew.name}</span>
                    <img src='/images/left-arrow.png' alt='left-arrow' aria-hidden='true'/>
                </button>
            </div>
            <div className='cocktail'>
                <img src={currentBrew.image} className='object-contain' />
            </div>
            <div className='recipe'>
                <div ref={contentRef} className='info'>
                    <p>Recipe for:</p>
                    <p id='title'>{currentBrew.name}</p>
                </div>
                <div className='details'>
                    <h1>{currentBrew.title}</h1>
                    <p>{currentBrew.description}</p>
                </div>
            </div>
        </div>
    </section>
  )
}

export default Menu
