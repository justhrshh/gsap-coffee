import React from 'react'
import { cocktailLists } from '../constants'; 
import { mockTailLists } from '../constants';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';

const SignatureBrews = () => {
    useGSAP(() => {
        const parallaxTimeline = gsap.timeline({
            scrollTrigger: {
                trigger: '#cocktails',
                start: 'top 30%',
                end: 'bottom 80%',
                scrub: true,
            }
        });
        parallaxTimeline.from('#c-left-leaf', {x:-100, y: 100 })
        .from('#c-right-leaf', {x:100, y: 100 }, 0);
    });
  return (
    <section id="cocktails" className="noisy">
        <img src="/images/Menu-left-leaf.png" alt="l-leaf" id='c-left-leaf'/>
        <img src="/images/Menu-right-leaf.png" alt="r-leaf" id='c-right-leaf'/>

        <div className="list">
            <div className='popular'>
                <h2>Popular Cocktails</h2>
                <ul>
                    {cocktailLists.map((drink) => (
                        <li key={drink.id}>
                            <div className='md:me-28'>
                                <h3>{drink.name}</h3>
                                <p>{drink.country} | {drink.detail}</p>
                            </div>
                            <span>- {drink.price}</span>
                        </li>
                    ))}
                </ul>
            </div>
            <div className='loved'>
                <h2>MostLoved Cocktails</h2>
                <ul>
                    {mockTailLists.map((drink) => (
                        <li key={drink.id}>
                            <div className='md:me-28'>
                                <h3>{drink.name}</h3>
                                <p>{drink.country} | {drink.detail}</p>
                            </div>
                            <span>- {drink.price}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    </section>
  )
}

export default SignatureBrews;
