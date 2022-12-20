import { useParallax } from 'react-scroll-parallax';
import { ParallaxBanner } from 'react-scroll-parallax';
import bg from './img/background.png'
import claud from './img/clauds.png'
import mont1 from './img/1montain.png'
import mont2 from './img/2montain.png'
import tree from './img/trees.png'

import './App.scss';

const App = () => {
  const background = {
    image: bg,
    translateY: [20, 50],
    opacity:[1,0.4],
    // speed: -20 ,
    shouldAlwaysCompleteAnimation: true,
  };

  // const montains1: BannerLayer = {
  //   translateY: [0, 30],
  //   scale: [1, 1.05, 'easeOutCubic'],
  //   shouldAlwaysCompleteAnimation: true,
  //   expanded: false,
  //   children: (
  //     <div className="absolute inset-0 flex items-center justify-center">
  //       <h1 className="text-6xl md:text-8xl text-white font-thin">
  //         Hello World!
  //       </h1>
  //     </div>
  //   ),
  // };

  const clouds = {
    image: claud,
    translateX: [-50, 90],
    translateY: [30, 80],
    shouldAlwaysCompleteAnimation: true,
  };
  const clouds2 = {
    image: claud,
    translateX: [0, 150],
    translateY: [30, 80],
    // translateY: [10, 20],
    shouldAlwaysCompleteAnimation: true,
  };

  const montains1 = {
    image: mont1,
    translateY: [10, 40],
    shouldAlwaysCompleteAnimation: true,
  };

  const montains2 = {
    image:mont2,
    // translateY: [2, 0],
    translateY: [2, 20],
    shouldAlwaysCompleteAnimation: true,
  };

  const trees = {
    image:tree,
    // translateY: [0, -9],
    speed: -2,
    shouldAlwaysCompleteAnimation: true,
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
      layers={[background, clouds, clouds2, montains1, montains2, trees]}
      className="banner"
    />
    </div>
  );
};

export default App;

