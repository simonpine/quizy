import { ParallaxBanner } from 'react-scroll-parallax';
import bg from '../img/background.png'
import claud2 from '../img/clauds2.png'
import mont1 from '../img/1montain.png'
import mont2 from '../img/2montain.png'
import tree from '../img/trees.png'
import stars from '../img/stars.png'
import logo from '../img/logo1.svg'
export function MontainParallaxBanner() {
    const background = {
        image: bg,
        translateY: [0, 50],
        opacity:[1,0.4],
        shouldAlwaysCompleteAnimation: true,
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
        speed: -2,
        shouldAlwaysCompleteAnimation: true,
        children: (
          <div className='leftDown'>
            <button onClick={() => window.scrollTo(0, 1000)} className="arrows"></button>
          </div>
      ),
      };
    return(
        <ParallaxBanner
        layers={[background, text2, star, clouds, clouds2, montains1, montains2, trees]}
        className="banner"
      />
    )
}