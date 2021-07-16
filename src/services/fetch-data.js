export function getFetch(url,callback){
    fetch(url)
    .then(status)
    .then(json)
    .then(data =>{
        data.forEach(item =>{
            callback(item)
        })
        console.log('Request succeeded with JSON response', data);
    }).catch(error =>{
        console.log('Request failed',error);
    });
}

export const updateFetch = async ({url,data}) =>{
    const res = await fetch(url,{
        method:'PUT',
        body:JSON.stringify(data),
        headers:{"Content-type": "application/json; charset=UTF-8"}
    })
    .then(status)
    .then(json)
    .catch(err => err)
    const i = 0;
}

export function deleteFetch({url}){
    fetch(url,{
        method:'DELETE'
    })
    .then(status)
    .then(json)
    .catch(err => err)
}

export function postFetch(url,data){
    fetch(url,{
        method:'POST',
        body:JSON.stringify(data),
        headers:{"Content-type":"application/json; charset=UTF-8" }
    })
    .then(response => response.json())
    .then(json => console.log(json))
    .catch(err => console.log(err))

}



function status(response){
    if(response.status >=200 && response.status < 300){
        return Promise.resolve(response);
    }
    return Promise.reject(new Error(response.statusText));
}

function json(response){
    return response.json();
}