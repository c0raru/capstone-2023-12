import { toast } from 'react-toastify';
import { useEffect, useState } from "react"

export const responseMessage = (res, returnError=false) => {
    return new Promise((resolve, reject) => {
        res.then(resolve).catch(err => {
            if(err.response.status === 404) {
              const keys = Object.keys(err.response.data)
              const messages = err.response.data[keys[0]]
              toast.error(messages)
              return
            }
            if(err.response.status === 400) {
              const keys = Object.keys(err.response.data)
                const messages = err.response.data[keys[0]]
                if(returnError) {
                    reject(messages[0])
                    return
                }
                toast.error(messages[0])
                return
            }
            if(err.response.status === 403) {
                toast.error("로그인이 필요합니다.")
                return
            }
            reject(err)
        })
    })
}

export function convertHMS(value) {
    const sec = parseInt(value, 10); // convert value to number if it's string
    let hours   = Math.floor(sec / 3600); // get hours
    let minutes = Math.floor((sec - (hours * 3600)) / 60); // get minutes
    let seconds = sec - (hours * 3600) - (minutes * 60); //  get seconds
    // add 0 if value < 10
    if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    if(hours == "00") {
        return minutes+':'+seconds; // Return is MM : SS
    }
    return hours+':'+minutes+':'+seconds; // Return is HH : MM : SS
}

export const useContainerDimensions = myRef => {
    const getDimensions = () => ({
      width: myRef.current.offsetWidth,
      height: myRef.current.offsetHeight
    })
  
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  
    useEffect(() => {
      const handleResize = () => {
        setDimensions(getDimensions())
      }
  
      if (myRef.current) {
        setDimensions(getDimensions())
      }
  
      window.addEventListener("resize", handleResize)
  
      return () => {
        window.removeEventListener("resize", handleResize)
      }
    }, [myRef])
  
    return dimensions;
};

export function useWindowSize() {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    // only execute all the code below in client side
    if (typeof window !== 'undefined') {
      // Handler to call on window resize
      function handleResize() {
        // Set window width/height to state
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }
    
      // Add event listener
      window.addEventListener("resize", handleResize);
     
      // Call handler right away so state gets updated with initial window size
      handleResize();
    
      // Remove event listener on cleanup
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []); // Empty array ensures that effect is only run on mount
  return windowSize;
}


export default {
    responseMessage,
    convertHMS,
    useContainerDimensions,
    useWindowSize
}

