import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import DefaultUserAvatar from '../../assets/images/user.jpg';
import { Character } from '../../utils/type';
import { Location } from '../../utils/type';

const Detail = () => {
  let { userId } = useParams();
  const [userInfo, setUserInfo] = useState<Character>();
  const [origin, setOrigin] = useState<Location>();
  const [lastLocation, setLastLocation] = useState<Location>()
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    axios.get(`https://rickandmortyapi.com/api/character/${userId}`).then((res) => {
      setUserInfo(res.data);
      if (res.data.origin.url != "") {
        axios.get(res.data.origin.url).then((response) => {
          setOrigin(response.data);
        }).catch((err) => {
          console.log(err)
        });
      }
      if (res.data.location.url != "") {
        axios.get(res.data.location.url).then((response) => {
          setLastLocation(response.data);
        }).catch((err) => {
          console.log(err)
        });
      }
    }).then(() => { setLoading(false) }).catch((error) => {
      console.log(error);
    })
  }, []);

  return (
    <div className="min-h-[100vh] flex flex-col justify-center">
      <div className='p-6 w-full md:w-[400px] mx-auto text-center bg-gray-500 dark:bg-gray-600 rounded-2xl dark:text-white font-semibold '>
        {loading
          ? <div className='dark:text-white min-h-16 text-black leading-[4rem] text-lg'>Loading</div>
          : userInfo
            ? <>
              <img className=' max-h-[200px] max-w-[200px] mx-auto rounded-lg border-gray-200 dark:border-gray-400 border-2' src={userInfo.image == "" ? DefaultUserAvatar : userInfo.image} alt="" />
              <h1 className='text-center font-bold text-xl py-2 dark:text-white text-black'>{userInfo.name}</h1>
              <div className='flex flex-col gap-2 divide-y-2 divide-gray-700 dark:divide-gray-300'>
                <div className='flex justify-between px-2 text-gray-900 dark:text-gray-300'>
                  <p>status</p>
                  <p className='dark:text-white text-black'>{userInfo.status}</p>
                </div>
                <div className='flex justify-between px-2 text-gray-900 dark:text-gray-300'>
                  <p>species</p>
                  <p className='dark:text-white text-black'>{userInfo.species}</p>
                </div>
                <div className='flex justify-between px-2 text-gray-900 dark:text-gray-300'>
                  <p>gender</p>
                  <p className='dark:text-white text-black'>{userInfo.gender}</p>
                </div>
                <div className='flex justify-between px-2 text-gray-900 dark:text-gray-300'>
                  <p>origin</p>
                  <p className='dark:text-white text-black'>{origin ? origin.name : "unknown"}</p>
                </div>
                <div className='flex justify-between px-2 text-gray-900 dark:text-gray-300'>
                  <p>Last Location</p>
                  <p className='dark:text-white text-black'>{lastLocation ? lastLocation.name : "unknown"}</p>
                </div>
              </div>
            </>
            : <div className='dark:text-white text-black'>No Data</div>
        }

        <Link to="/" className="text-gray-900 mt-5 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 me-2 mb-2">
          <span className="w-full">Back to Home</span>
        </Link>
      </div>
    </div>);
}



export default Detail;