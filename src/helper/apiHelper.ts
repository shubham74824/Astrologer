import axios,{AxiosRequestConfig} from "axios";

// match making api request handler

export const fetchMatchMaking=async(url:string,config?:AxiosRequestConfig)=>{

    try{
     const response=await axios.get(url,config);
     return response.data;
    }catch(error){

        console.log("errror",error)
      return{status:500,message:"Error is coming from api calling in matchMaking"}
    }
}