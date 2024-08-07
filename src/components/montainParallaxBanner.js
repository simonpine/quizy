import { ParallaxBanner } from 'react-scroll-parallax';
import bg from '../img/background.png'
import claud from '../img/clauds.png'
import mont1 from '../img/1montain.png'
import mont2 from '../img/2montain.png'
import tree from '../img/trees.png'
import stars from '../img/stars.png'
export function MontainParallaxBanner() {
    const background = {
        image: bg,
        translateY: [0, 50],
        opacity:[1,0.4],
        shouldAlwaysCompleteAnimation: true,
      };
      const text2 = {
        translateY: [5 ,70],
        shouldAlwaysCompleteAnimation: true,
        expanded: false,
        children: (
          <div className="center nameOfSite">
            <h1 className='Quizy'>Quizy</h1>
            <p>Enjoy and test yourself</p>
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
        translateX: [15, -10],
        translateY: [20, 50],
        shouldAlwaysCompleteAnimation: true,
        children: (
          
          <img src={claud} className='clouds' alt='Clouds for the parallax' />
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
      };
    return(
        <ParallaxBanner
        layers={[background, text2, star, clouds, montains1, montains2, trees]}
        className="banner"
      />
    )
}