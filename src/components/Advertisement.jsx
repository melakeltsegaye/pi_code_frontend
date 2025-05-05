import React, {useState, useEffect} from 'react'
import axios from 'axios'

const Advertisement = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [ad, setAds] = useState([])

      useEffect(() => {
            axios
              .get("http://127.0.0.1:8000/Ad/")
              .then((response) => {
                  setAds(response.data);
              })
              .catch((error) => {
                  console.error("Error fetching data:", error);
              });
      }, []);

      useEffect(() => {
        const interval = setInterval(() => {
          setCurrentIndex((prevIndex) => (prevIndex + 1) % ad.length);
        }, 1 * 60 * 1000); // 10 minutes in milliseconds
    
        return () => clearInterval(interval); // Cleanup on unmount
      }, [ad.length]);
    
      const currentAd = ad[currentIndex];


  return (
    <div>
        <div className='w-full pt-16 flex flex-col items-center gap-5'>
        {currentAd ? (
        <div className="w-full h-72 bg-gray-300 flex justify-center items-end  relative">
          <img src={currentAd.Ad_Img} className='w-full h-full object-cover absolute ' alt="" />
          <div className='z-10 p-6 text-white'>
            
            <a target="_blank" href={currentAd.Ad_Link} className="">
              <button className='b1'>visit site</button>
            </a>
          </div>
        </div>
      ) : (
        <div className="w-full h-72 bg-gray-200 flex items-center justify-center">
          Loading Ad...
        </div>
      )}
        </div>
    </div>
  )
}

export default Advertisement