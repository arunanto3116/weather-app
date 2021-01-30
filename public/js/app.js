

const getWeather = e => {
    e.preventDefault();
    const message1 = document.getElementById('message-1');
    const message2 = document.getElementById('message-2');
    message1.textContent = "";
    message2.textContent = "";
    message1.classList.remove('error');
    message1.classList.remove('success');
    let location  = document.getElementById('location').value;
    fetch(`http://localhost:3000/weather?address=${encodeURI(location)}`)
    .then( response => {
        response.json().then(data => {
            if (data.status === "ERROR") {
                message1.textContent = data.message;
                message1.classList.add('error');
            } else {
                message1.classList.add('success');
                message1.textContent = data.data.location;
                message2.textContent = data.data.info;
            }
        });
    });    
}

//A button object calls the function:
document.getElementById("submit").addEventListener("click", getWeather);