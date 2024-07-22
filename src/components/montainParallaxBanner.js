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
            <h1 className='Quizy'>Quizy</h1>
            <img alt='SimonPine brand logo' className='logoPresentation' src={logo}/>
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
        translateX: [-5, 5],
        translateY: [20, 50],
        shouldAlwaysCompleteAnimation: true,
        children: (
          
          <img src={claud2} className='clouds' alt='Clouds for the parallax' />
        )
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
        layers={[background, text2, star, clouds, montains1, montains2, trees]}
        className="banner"
      />
    )
}