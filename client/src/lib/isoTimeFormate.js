const isoTimeFormate=(dateTime)=>{
    const date=new Date(dateTime);
    const localeTime=date.toLocaleTimeString('en-US',{
        hour:'2-digit',
        minute:'2-digit',
        hour12:true,
    });
    return localeTime;
}

export default isoTimeFormate