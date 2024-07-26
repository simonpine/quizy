import { MontainParallaxBanner } from './components/montainParallaxBanner';
import { useParallax } from 'react-scroll-parallax';
import './App.scss';
import { Link } from 'react-router-dom';
import one from './img/1.jpg'
import two from './img/2.jpg'
import tape from './img/tape1.png'
import tape2 from './img/tape2.png'
const App = () => {
  const parallax = useParallax({
    easing: 'easeOutQuad',
    translateX: [-30, 50],
    rotate: [-10, 0]
  });
  return (

    <div className='containerStart'>
      <MontainParallaxBanner />
      <main>
        {/* <section className='sectionHome create'>
           <div className='textContentHome'>
             <h2 className='subtitleHome'>Create new quizzes</h2>
             <p className='pHome'>
               With quizy you can create quizzes that others can solve with a code, the quizzes can have many questions as you want, also it don't have to be of an specific subject. The quizzes you create cannot be modified, and will be public in the "test" section.
             </p>
             <Link to={{ pathname: "/create" }} className="link">New quizz</Link>
           </div>
           <div className='spinnerContainer'>
           </div>
         </section>
         <section className='sectionHome test'>
           <div className='textContentHome2'>
             <h2 className='subtitleHome2'>Test yourself</h2>
             <p className='pHome'>
               With quizy you will be able to resolve your quizzes and those of others, the grade will not be public, therefore no one will can access to it. To take a test you need to have a quizz code, or select one of the public quizzes.
             </p>
             <Link to={{ pathname: "/tests" }} className="link">Resolve</Link>
           </div>
           <div>
             <div className='imgContainer'>
               <img className='firstImg' alt='img of a girl' src={one} />
               <img className='MiniImg' alt='img of a laptop' src={two} />
             </div>
           </div>
         </section> */}
        <section className='SectionSidebySide'>
          <div>
          <div ref={parallax.ref} className='borderImgs'>
            <img className='tapeTop' src={tape} alt='Tape ilustration to show that the polaroid in stiked' />
            <img className='tapeBellow' src={tape2} alt='Tape ilustration to show that the polaroid in stiked' />

            <img alt='Person making fire in a forest camp' src={two} />
            <p>20/15/23</p>
            <h4>Share quizies with your friends</h4>
          </div>
          </div>
          <div>
              <h2>Hola Todos</h2>
              <p>Introducing Quizy, the AI-powered web app that transforms your content into engaging quizzes in just a few clicks. Quizy analyzes your material—whether it's educational content, corporate training modules, or fun trivia—and generates dynamic, tailored quizzes that enhance engagement and retention. Save time, improve learning outcomes, and make assessments interactive and fun. Perfect for educators, trainers, and content creators. Try Quizy and turn your information into knowledge that sticks!</p>
          </div>
        </section>


        
      </main>
    </div>
  );
};

export default App;

