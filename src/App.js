import { MontainParallaxBanner } from './components/montainParallaxBanner';
import { Parallax, useParallax } from 'react-scroll-parallax';
import './App.scss';
import { Link } from 'react-router-dom';
import one from './img/1.jpg'
import two from './img/5.jpg'
import three from './img/3.jpg'
import tape from './img/tape1.png'
import tape2 from './img/tape2.png'
import { useState } from 'react';
import simonpineImg from './img/SimonPine.jpg'
import ParallaxText from './components/ParallaxText';
const App = () => {
  const [tapes, setTapes] = useState(false)
  const parallaxImg1 = useParallax({
    easing: 'easeOutExpo',
    translateX: [-60, 0],
    rotate: [10, -10],
  });
  const parallaxImg1iner = useParallax({
    easing: 'ease',
    translateY: [-20, 0],
  });
  const parallaxSideImgs = useParallax({
    easing: 'ease',
    translateY: [15, 0],
  });
  return (

    <div className='containerStart'>
      <MontainParallaxBanner />
      <main>
        <section className='SectionSidebySide'>
          <aside className="TextContainerLanding">
            <h2>Story of <br /> the project</h2>
            <p>As a student at Los Andes University, I, Simon Pineda, often found creating quizzes to be a tedious and time-consuming process. I knew there had to be a better way. Driven by my passion for both education and technology, I set out to develop a smarter solution—Quizy. Quizy is an AI-powered app designed to transform any content into dynamic, interactive quizzes effortlessly. My goal was to create a tool that would be useful not only for studying but also for playing with friends and challenging oneself.</p>
            <Link to={{ pathname: "/tests" }} className="linkButton">Explore Quizzes</Link>
          </aside>
          <aside className='collage toSmall'>
            <div className='borderImgs imageOfcolage'>
              <figure>
                <img ref={parallaxImg1iner.ref} src={simonpineImg} alt='Simon Pineda smiling in front of food' />
              </figure>
              <p>04/12/22</p>
              <span>SimonPine being happy</span>
            </div>
            <div ref={parallaxSideImgs.ref} className='part2'>
              <div className='borderImgs imageOfcolage'>
                <img src={one} alt='Women sleeping with a book in her face at the park' />
                <p>21/04/24</p>
                <span>Relax and chill</span>
              </div>
              <div className='borderImgs imageOfcolage'>
                <img src={three} alt='Dog in a yellow background' />
                <p>12/05/20</p>
                <span>You can also enjoy</span>
              </div>
            </div>
          </aside>
        </section>
        <section className='TextContainerSection'>
          <ParallaxText baseVelocity={-1}>Save Time, Boost Learning</ParallaxText>
          <ParallaxText baseVelocity={1}>From Content to Quizzes in Clicks</ParallaxText>
        </section>
        <section className='SectionSidebySideSpe'>
          <aside>
            <div ref={parallaxImg1.ref} className='borderImgs toSmall'>
              <img className={'tapeTop ' + tapes} src={tape} alt='Tape ilustration to show that the polaroid in stiked' />
              <img className={'tapeBellow ' + tapes} src={tape2} alt='Tape ilustration to show that the polaroid in stiked' />
              <figure className='figoreToMoveImgEffect'>
                <img alt='Person making fire in a forest camp' src={two} />
              </figure>
              <p>20/15/23</p>
              <span>Share quizies with your friends</span>
            </div>
            <Parallax onExit={() => setTapes('tapeOut')} onEnter={() => setTapes('tapeFull')} />
          </aside>
          <aside className="TextContainerLanding">
            <h2>Effortless <br /> Quiz Creator</h2>
            <p>Introducing Quizy, the AI-powered web app that transforms your content into engaging quizzes in just a few clicks. Quizy analyzes your material—whether it's educational content, corporate training modules, or fun trivia—and generates dynamic, tailored quizzes that enhance engagement and retention. Save time, improve learning outcomes, and make assessments interactive and fun. Perfect for educators, trainers, and content creators. Try Quizy and turn your information into knowledge that sticks!</p>
            <Link className="linkButton" to={{ pathname: "/create" }}>Create Quiz</Link>
          </aside>
        </section>
      </main>
    </div>
  );
};

export default App;

