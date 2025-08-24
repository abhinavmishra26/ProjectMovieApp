// import axios from 'axios';
// import React, { useEffect, useState } from 'react'
// import Loading from '../Components/Loading';
// import { useAppContext } from '../context/AppProvider';
// import { useParams } from 'react-router-dom';

// const MovieImages = () => {
//     const {axios,getToken,image_base_url}=useAppContext();
//     const [images,setImages]=useState(null);
//     const {id}=useParams();

//     const getImages=async()=>{
//         try{
//             const {data}=await axios.get(`/api/show/${id}`,{
//         headers:{
//           Authorization:`Bearer ${await getToken()}`
//         }
//       })
//        setImages({MovieImage:data.Images})
//     }
//         catch(error){
//             console.log(error);
//         }
//     }

//   useEffect(()=>{
//     getImages()

//   },[])
//   return images?(
//     <div className='flex flex-wrap' >
//        {
//           images.MovieImage.backdrops.map((item,ind)=>(
//             <div>
//               <img src={image_base_url+item.file_path} className='w-[600px] h-74' ></img>
//               </div>
//           ))
//         }
//     </div>
//   ):
//   <Loading/>
// }

// export default MovieImages
import React, { useEffect, useState } from 'react';
import Loading from '../Components/Loading';
import { useAppContext } from '../context/AppProvider';
import { useParams } from 'react-router-dom';

const MovieImages = () => {
  const { axios, getToken, image_base_url } = useAppContext();
  const [images, setImages] = useState(null);
  const { id } = useParams();

  const getImages = async () => {
    try {
      const { data } = await axios.get(`/api/show/${id}`, {
        headers: { Authorization: `Bearer ${await getToken()}` }
      });
      setImages({ MovieImage: data.Images });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getImages();
  }, []);

  // Assign different sizes for variety
  const getGridClass = (index) => {
    const styles = [
      'col-span-3 row-span-2', // Big Image
      'col-span-2 row-span-1', // Medium Image
      'col-span-1 row-span-1'  // Small Image
    ];
    return styles[index % styles.length];
  };

  return images ? (
    <div className="px-36 py-24">
      <h2 className="text-2xl font-bold mb-6 text-center">Movie Gallery</h2>

      <div className="grid grid-cols-6 auto-rows-[200px] gap-4">
        {images.MovieImage.backdrops.map((item, index) => (
          <div
            key={index}
            className={`overflow-hidden rounded-xl shadow-lg hover:scale-[1.03] transition-transform duration-300 ${getGridClass(index)}`}
          >
            <img
              src={image_base_url + item.file_path}
              alt={`Backdrop ${index}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default MovieImages;
