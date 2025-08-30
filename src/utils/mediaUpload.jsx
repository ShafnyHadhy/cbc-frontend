import { createClient } from "@supabase/supabase-js";

const anonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFnbXhpaGVjdHFqcXh5dW5xaWNxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYxMjg4NDQsImV4cCI6MjA3MTcwNDg0NH0.Tu44ezvIH_0kjGPiw6qn0vcLhzuTEg7JBtgL-A9DRQQ"
const supabaseURL = "https://agmxihectqjqxyunqicq.supabase.co"

const supabase = createClient(supabaseURL, anonKey);

export default function mediaUpload(file){
    return new Promise((resolve, reject)=>{
        if(file == null){
            reject("File is not selected");
        }else{
            const timestamp = new Date().getTime();
            const fileName = timestamp+file.name;

            supabase.storage
                .from("images")
                .upload(fileName, file, {
                    upsert: false,
                    cacheControl:3600
        }).then(
            ()=>{
                const publicUrl = supabase.storage.from("images").getPublicUrl(fileName).data.publicUrl;
                resolve(publicUrl);     
            }).catch(()=>{
                reject("Error in uploading file...")
            })
        }
    });
}