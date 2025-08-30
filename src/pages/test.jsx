import { createClient } from "@supabase/supabase-js";
import { useState } from "react"
import mediaUpload from "../utils/mediaUpload";



export default function TestPage(){

    const [file, setFile] = useState(null);

    async function uploadFile(){

      const link = await mediaUpload(file);
      console.log(link);
        
    }


    return(
        <div className="w-full h-full flex justify-center items-center">
            <input type="file" onChange={
                (e)=>{
                    setFile(e.target.files[0]);
                }
            }/>
            <button className="p-2 bg-blue-500 text-white " onClick={uploadFile}>
                Add File
            </button>
        </div>
    )
}