import React from 'react'
import { useGSAP } from '@gsap/react';
import { SplitText } from 'gsap/all';
import { gsap } from 'gsap';


const Hero = () => {

    useGSAP(() => {
        const heroSplit = new SplitText('.title', { type: 'chars, words' });
        const paragraphSplit = new SplitText('.subtitle', { type: 'lines' });

        heroSplit.chars.forEach((char) => char.classList.add('text-gradient'));

        gsap.from(heroSplit.chars, {
            yPercent: 100,
            duration: 1.8,
            ease: 'expo.out',
            stagger: 0.05,
        });

        gsap.from(paragraphSplit.lines, {
            opacity: 0,
            yPercent: 100,
            duration: 1.8,
            ease: 'expo.out',
            stagger: 0.06,
            delay: 1,
        });

        // Leaves parallax
        gsap.timeline({
            scrollTrigger: {
                trigger: '#hero',
                start: 'top top',
                end: 'bottom top',
                scrub: true,
            }
        })
        .to('.right-leaf', { y: 200 }, 0)
        .to('.left-leaf', { y: -200 }, 0);

        // ── Main image: entry animation ──────────────────────────────
        // Cup rises from below — blurred and dark → crisp and bright
        gsap.fromTo('.main',
            {
                scale: 0.75,
                y: 80,
                opacity: 0,
                filter: 'brightness(0.25) blur(8px)',
            },
            {
                scale: 1.15,
                y: 0,
                opacity: 1,
                filter: 'brightness(1) blur(0px)',
                duration: 2.4,
                ease: 'expo.out',
                delay: 1.1,
            }
        );

        // ── Main image: stays in place while hero scrolls away ───────
        // The cup sits at ~85vh. As the hero scrolls up by its full
        // height (~100vh), we translate the wrapper DOWN by the same
        // amount — so the net viewport position stays exactly where
        // the cup was on load. Hero moves; cup doesn't.
        gsap.to('.main-wrapper', {
            // y: () => window.innerHeight,
            ease: 'none',
            scrollTrigger: {
                trigger: '#hero',
                start: 'top top',
                end: 'bottom top',
                scrub: true,          // instant 1:1 scrub — no lag so it tracks perfectly
            }
        });

    }, []);

    return (
        <>
            <section id="hero" className='noisy'>
                <h1 className='title'>MOCHA</h1>

                <img src="/images/hero-left-leaf.png" alt="leaf" className='left-leaf' />
                <img src="/images/hero-right-leaf.png" alt="leaf" className='right-leaf' />

                <div className='body'>
                    <div className='content'>
                        <div className='space-y-5 hidden md:block'>
                            <p>Rich. Smooth. Timeless.</p>
                            <p className='subtitle'>Brewed To <br />Perfection</p>
                        </div>
                        <div className='view-cocktails'>
                            <p className='subtitle'>Every cup at Velvet Brew is crafted from premium beans and perfected with timeless brewing traditions—designed to awaken your senses.</p>
                            <a href="#cocktails">Explore Menu →</a>
                        </div>
                    </div>
                </div>
            </section>

            {/*
              main-wrapper  → counter-scrolled to stay fixed in viewport
              .main         → only animated during entry (scale, y, filter)
            */}
            <div className="main-wrapper absolute left-1/2 top-[85%] -translate-x-1/2 -translate-y-1/2 z-20">
                <img src="/images/main.png" alt="main" className="main" />
            </div>
        </>
    )
}

export default Hero