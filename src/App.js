import { useParallax } from 'react-scroll-parallax';
import { MontainParallaxBanner } from './components/montainParallaxBanner';
import { Layout } from './components/layout';
import './App.scss';

const App = () => {
  return (
    <div className='containerStart'>
      <MontainParallaxBanner />
      <Layout selceted={1}>
      <div className='contentHome'>
        <div className='sectionHome create'>
          <div className=''>
            <h2 className='subtitleHome'>Create new quizzes</h2>
            <p className='pHome'>
              With quizy you can create quizzes that others can solve with a code, the quizzes can have many questions as you want, also it don't have to be of an specific subject. The quizzes you create cannot be modified, and will be public in the "test" section.
            </p>
          </div>
        </div>
      </div>
      </Layout>
    </div>
  );
};

export default App;

