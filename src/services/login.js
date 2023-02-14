const ENDPOINT = 'http://localhost:8080'

export default function login({username, password}) {
    
    return fetch(`${ENDPOINT}/login`, {
        mode: 'no-cors',
        method: 'POST',
        headers:{
            "Content-Type": "application/json",
            'Accept': 'text/html'
        },
        body: JSON.stringify({
            "username": username, 
            "password": password})
    }).then(res=>{
        console.log(res.status)
        if(!res.ok) throw new Error('ERROR RESPUESTA')
        return res.json()
    }).then(data => {
        
        const  jwt  = data
        return {jwt}
    })
}