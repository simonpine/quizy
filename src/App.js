import { useParallax } from 'react-scroll-parallax';
import { MontainParallaxBanner } from './components/montainParallaxBanner';
import { Navbar } from './components/navBar';

import './App.scss';

const App = () => {
  return (
    <div className='containerStart'>
      <MontainParallaxBanner />
      <div className='contentHome'>
        <Navbar selected={1} />
        
      </div>
    </div>
  );
};

export default App;

