import { MontainParallaxBanner } from './components/montainParallaxBanner';
import { Parallax, useParallax } from 'react-scroll-parallax';
import './App.scss';
import { Link } from 'react-router-dom';
import one from './img/1.jpg'
import two from './img/2.jpg'
import tape from './img/tape1.png'
import tape2 from './img/tape2.png'
import { useState } from 'react';
import ParallaxText from './components/ParallaxText';
const App = () => {
  const [tapes, setTapes] = useState(false)
  const parallaxImg1 = useParallax({
    easing: 'easeOutBack',
    translateX: [-50, 0],
    rotate: [10, -10],
  });
  // const parallaxImg1iner = useParallax({
  //   easing: 'ease',
  //   translateY: [-20, 0],
  // });
  return (

    <div className='containerStart'>
      <MontainParallaxBanner />
      <main>
        <section className='TextContainerSection'>
          <ParallaxText baseVelocity={-1}>Save Time, Boost Learning</ParallaxText>
          <ParallaxText baseVelocity={1}>From Content to Quizzes in Clicks</ParallaxText>
        </section>

        <section className='SectionSidebySide'>
          <aside>
            <div ref={parallaxImg1.ref} className='borderImgs'>
              <img className={'tapeTop ' + tapes} src={tape} alt='Tape ilustration to show that the polaroid in stiked' />
              <img className={'tapeBellow ' + tapes} src={tape2} alt='Tape ilustration to show that the polaroid in stiked' />
              <figure className='figoreToMoveImgEffect'>
                <img alt='Person making fire in a forest camp' src={two} />
              </figure>
              <p>20/15/23</p>
              <h4>Share quizies with your friends</h4>
            </div>
          </aside>
          <div></div>
          <aside className="TextContainerLanding">
            <h2>Effortless <br /> Quiz Creator</h2>
            <p>Introducing Quizy, the AI-powered web app that transforms your content into engaging quizzes in just a few clicks. Quizy analyzes your material—whether it's educational content, corporate training modules, or fun trivia—and generates dynamic, tailored quizzes that enhance engagement and retention. Save time, improve learning outcomes, and make assessments interactive and fun. Perfect for educators, trainers, and content creators. Try Quizy and turn your information into knowledge that sticks!</p>
            <Link to={{ pathname: "/create" }} className="linkbutton">Create Quiz</Link>
          </aside>
        </section>
        <Parallax onExit={() => setTapes('tapeOut')} onEnter={() => setTapes('tapeFull')} />

        <section className='SectionSidebySide'>
          <aside className="TextContainerLanding">
            <h2>Story of <br /> the project</h2>
            <p>As a student at Los Andes University, I, Simon Pineda, often found creating quizzes to be a tedious and time-consuming process. I knew there had to be a better way. Driven by my passion for both education and technology, I set out to develop a smarter solution—Quizy. Quizy is an AI-powered app designed to transform any content into dynamic, interactive quizzes effortlessly. My goal was to create a tool that would be useful not only for studying but also for playing with friends and challenging oneself.</p>
            <Link to={{ pathname: "/create" }} className="linkbutton">Create Quiz</Link>
          </aside>
          <div></div>
          <aside>
            <div className='borderImgs'>
              <img src={one} alt='Women sleeping with a book in her face at the park' />
              <p>21/04/24</p>
              <h4>SimonPine being happy</h4>
            </div>
          </aside>

        </section>

      </main>
    </div>
  );
};

export default App;

