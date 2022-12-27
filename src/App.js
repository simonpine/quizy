
import { MontainParallaxBanner } from './components/montainParallaxBanner';
import { Layout } from './components/layout';
import './App.scss';
import { Link } from 'react-router-dom';
import { AnimateScrollIcons } from './components/animateScrollIcons';
const App = () => {
  return (

    <div className='containerStart'>
      <MontainParallaxBanner />
      <Layout selceted={1}>
        <div className='contentHome'>
          <div className='sectionHome create'>
            <div className='textContentHome'>
              <h2 className='subtitleHome'>Create new quizzes</h2>
              <p className='pHome'>
                With quizy you can create quizzes that others can solve with a code, the quizzes can have many questions as you want, also it don't have to be of an specific subject. The quizzes you create cannot be modified, and will be public in the "test" section.
              </p>
              <Link to={{ pathname: "/create" }} className="link">New quizz</Link>
            </div>
            <div className='spinnerContainer'>
              <AnimateScrollIcons />
            </div>
          </div>
          <div className='sectionHome test'>
            <div className='textContentHome2'>
              <h2 className='subtitleHome2'>Test yourself</h2>
              <p className='pHome'>
                With quizy you will be able to resolve your quizzes and those of others, the grade will not be public, therefore no one will can access to it. To take a test you need to have a quizz code, or select one of the public quizzes.
              </p>
              <Link to={{ pathname: "/tests" }} className="link">Resolve</Link>
            </div>
            <div>
              {/* <div ref={parallax.ref} className="spinner">
                <div className="diamond">💎💎💎💎</div>
                <div className="clown">🤡💎💎💎</div>
                <div className="money">💰💎💎💎</div>
                <div className="hand">👌🏻💎💎💎</div>
              </div> */}
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default App;

