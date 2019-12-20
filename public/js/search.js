const button = document.querySelector('.button');

button.addEventListener('click', () => {
    const searchArea = document.querySelector('input').value;
    const url = '/weather?address=' + encodeURIComponent(searchArea);

    fetch(url)
    .then(res => res.json())
    .then(resp => {
        console.log(resp)
        if (!searchArea) {
            document.querySelector('.weather').style.display = 'block';
            document.querySelector('.weather').innerHTML = resp.location;
        }
        else if (!resp.location || !resp.forecast) {
            document.querySelector('.weather').style.display = 'block';
            document.querySelector('.weather').innerHTML = resp.forecast;
        }
        else {
            document.querySelectorAll('.weather')[0].style.display = 'block';
            document.querySelectorAll('.weather')[1].style.display = 'block';
            document.querySelectorAll('.weather')[0].innerHTML += resp.location;
            document.querySelectorAll('.weather')[1].innerHTML += resp.forecast;
        }
    })
})