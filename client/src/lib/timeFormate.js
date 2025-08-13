 const timeformate=(minute)=>{
    const hours=Math.floor(minute/60);
    const minutes=minute%60;
    return (`${hours}h ${minutes}m`)
 }
export default timeformate