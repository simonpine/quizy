import man from '../img/man.png'
import one from '../img/1.png'
import two from '../img/2.png'
import tree from '../img/3.png'
import four from '../img/4.png'
import { useParallax } from 'react-scroll-parallax';
export function AnimateScrollIcons(){
    const general = useParallax({
        rotate: [360, 0],
      });
      const specific = useParallax({
        rotate: [0, 360],
      });
      const specific2 = useParallax({
        rotate: [0, 400],
      });
      const specific3 = useParallax({
        rotate: [0, 400],
      });
      const specific4 = useParallax({
        rotate: [0, 400],
      });
      const specific5 = useParallax({
        rotate: [0, 400],
      });
      return(
        <div ref={general.ref} className="spinner">
        <img alt='secundaryMiniIcon' ref={specific5.ref} id='one' className='secundaryMiniIcon' src={one} />
        <div></div>
        <img alt='secundaryMiniIcon' ref={specific4.ref} id='two' className='secundaryMiniIcon' src={two} />
        <div></div>
        <img alt='Icon of a person' ref={specific.ref} className='person' src={man} />
        <div></div>
        <img alt='secundaryMiniIcon' ref={specific2.ref} id='tree' className='secundaryMiniIcon' src={tree} />
        <div></div>
        <img alt='secundaryMiniIcon' ref={specific3.ref} id='four' className='secundaryMiniIcon' src={four} />
      </div>
      )
}