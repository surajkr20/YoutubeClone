
import React, { useEffect, useState } from 'react';

const Loader = () => {
    const [currentProgress, setCurrentProgress] = useState(0);
    useEffect(()=>{
        let Loader = setInterval(()=>{
            setCurrentProgress((prevProgress)=>{
                let newProgress = prevProgress + Math.random() * 40;
                if(newProgress>100) newProgress = 100;
                if(newProgress === 100) clearInterval(Loader);
                    return newProgress;
            })
        }, 800)
        return () => clearInterval(Loader);
    },[])

  return (
    <div className='bg-red-500 h-1 transition-all duration-200 absolute z-40 top-0' style={{width: `${currentProgress}%`}}>
        Loader
    </div>
  )
}

export default Loader;