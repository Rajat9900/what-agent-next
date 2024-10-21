import axios from "axios"

const api_url="https://backendsharebrain.whatagent.net/"

export const NewChat = (payload,token)=>{
    return axios.post(api_url+"create-chat",payload,{
        headers:{
            Authorization:"Bearer "+token
        }
    })
}