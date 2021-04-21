const { REACT_APP_API_URL } = process.env;

export default class APIService{

    async receiveData(url, data = {}) {
      const response = await fetch(REACT_APP_API_URL + url, {
        method: 'GET', 
        mode: 'cors', 
        cache: 'no-cache', 
        credentials: 'same-origin', 
        headers: {
          'Content-Type': 'application/json'
        },
        redirect: 'follow', 
        referrerPolicy: 'no-referrer',
      });
      return response.json();
    }
  

    sendData(link, data){
      fetch(REACT_APP_API_URL + link, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(data)
      })
    }
  
    getBase64Image(base64Image, format){
      return `data:image/${format};base64,` + base64Image;
    }
  }