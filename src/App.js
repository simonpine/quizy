import { useParallax } from 'react-scroll-parallax';
import { ParallaxBanner } from 'react-scroll-parallax';
import bg from './img/background.png'
import claud2 from './img/clauds2.png'
import mont1 from './img/1montain.png'
import mont2 from './img/2montain.png'
import tree from './img/trees.png'
import stars from './img/stars.png'
import logo from './img/logo1.svg'

import './App.scss';

const App = () => {
  const background = {
    image: bg,
    translateY: [0, 50],
    opacity:[1,0.4],
    shouldAlwaysCompleteAnimation: true,
  };

  const text = {
    translateY: [2, 20],
    translateX: [-100, 100],
    shouldAlwaysCompleteAnimation: true,
    expanded: false,
    children: (
      <div className="bannerText">
        <h1 className="homeTitle">
          Create and resolve quizzes
        </h1>
      </div>
    ),
  };
  const text2 = {
    translateY: [0 ,80],
    shouldAlwaysCompleteAnimation: true,
    expanded: false,
    children: (
      <div className="center nameOfSite">
        <h2 className='Quizy'>Quizy</h2>
        <img className='logoPresentation' src={logo}/>
      </div>
    ),
  };
  const star = {
    image: stars,
    translateX: [0, -15],
    translateY: [0, 50],
    shouldAlwaysCompleteAnimation: true,
  };

  const clouds = {
    image: claud2,
    translateX: [0, 50],
    translateY: [20, 50],
    shouldAlwaysCompleteAnimation: true,
  };
  const clouds2 = {
    image: claud2,
    translateX: [50, 100],
    translateY: [15, 50],
    shouldAlwaysCompleteAnimation: true,
  };

  const montains1 = {
    image: mont1,
    translateY: [10, 40],
    shouldAlwaysCompleteAnimation: true,
  };

  const montains2 = {
    image:mont2,
    translateY: [2, 20],
    shouldAlwaysCompleteAnimation: true,
  };

  const trees = {
    image:tree,
    // translateY: [0, -9],
    speed: -2,
    shouldAlwaysCompleteAnimation: true,
    children: (
      <div className='leftDown'>
        <div class="arrows"></div>
      </div>
  ),
  };

  // const gradientOverlay: BannerLayer = {
  //   opacity: [0, 0.9],
  //   shouldAlwaysCompleteAnimation: true,
  //   expanded: false,
  //   children: (
  //     <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-blue-900" />
  //   ),
  // };
  return (
    <div className='containerStart'>
      <ParallaxBanner
      layers={[background, text2, star, clouds, clouds2, montains1, text, montains2, trees]}
      className="banner"
    />
    </div>
  );
};

export default App;

