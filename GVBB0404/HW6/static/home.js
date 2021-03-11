let movies = [];
let tv = [];
let searchResults = [];
let movie_genres = {};
let tv_genres = {};
var tvind = 0;
var movieind = 0;

function populateslides(){
    var i;
    var j;
    var x = document.getElementsByClassName("movieslides");
    for (i = 0; i < x.length; i++) {
        if(movies[i].backdrop !== ""){
            x[i].src = "https://image.tmdb.org/t/p/original/" + movies[i].backdrop;  
        }
    }
    var y = document.getElementsByClassName("tvslides");
    for (j = 0; j < y.length; j++) {
        if(tv[j].backdrop !== ""){
            y[j].src = "https://image.tmdb.org/t/p/original/" + tv[j].backdrop;  
        }
    }
    slideshowmovies();
    slideshowtv();
}

function clearfields(){
    clearSearch();
    var input = document.getElementById("kword")
    input.value = "";
    var check = document.getElementById("category")
    check.value = "";
}

function slideshowmovies(){
    var i;
    var x = document.getElementsByClassName("movieslides");
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";  
    }
    movieind++;
    if (movieind > x.length) {movieind = 1}
    x[movieind-1].style.display = "inherit";  
    var te = document.getElementById("moviecaption");
    var year = movies[movieind-1].date.substring(0,4);
    te.innerHTML = movies[movieind-1].title + "(" + year + ")";
    setTimeout(slideshowmovies, 5000); // Change image every 2 seconds
}

function slideshowtv(){
    var i;
    var x = document.getElementsByClassName("tvslides");
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";  
    }
    tvind++;
    if (tvind > x.length) {tvind = 1}
    x[tvind-1].style.display = "inherit"; 
    var te = document.getElementById("tvcaption");
    var year = tv[tvind-1].date.substring(0,4);
    te.innerHTML = tv[tvind-1].name + "(" + year + ")"; 
    setTimeout(slideshowtv, 5000); // Change image every 2 seconds
}

function clearSearch(){
    var res = document.getElementById("resultlister");
    res.innerHTML = "";
    var x = document.getElementsByClassName("searchitem");
    var num = Math.min(10, 12);
    for(i = 0; i < num; i++){
        x[i].style.display = "none";
    }
}

async function search() {
    clearSearch();
    const urls = 'http://gbhw6.azurewebsites.net/search'
    var keyw = document.getElementById("kword").value;
    var cat = document.getElementById("category").value;
    let response = [];
    if(keyw === "" || cat === ""){
        alert("Please enter valid values");
    }else{
        if(cat === "M"){
            url = urls + "movie/" + keyw
            response = await searchMovie(url);
        }else if(cat === "T"){
            url = urls + "tv/" + keyw
            response = await searchTV(url);
        }else{
            url = urls + "multi/" + keyw
            response = await searchMulti(url);
        }
    }
    populateSearch(response);
}

async function searchMovie(url){
    response = await fetch(url, {
        method:'GET',
        headers: {
            'Content-Type': 'application/json'
          },
    })
    .then(response=>response.json())
    .then(data=>JSON.parse(data))
    .then(function(data){
        results = [];
        for(i = 0; i < Math.min(10, data.results.length); i++){
            results.push(fillMovie(data.results[i]));
        }
        return results;
    });
    return response;
}

function fillMovie(obj){
    item = {
        id:obj.id,
        title:obj.title,
        overview:obj.overview,
        poster_path:obj.poster_path,
        date:obj.release_date,
        vote_average:obj.vote_average,
        vote_count:obj.vote_count,
        genres:obj.genre_ids,
        type:"movie"
    }
    return item;
}

function fillTV(obj){
    item = {
        id:obj.id,
        title:obj.name,
        overview:obj.overview,
        poster_path:obj.poster_path,
        date:obj.first_air_date,
        vote_average:obj.vote_average,
        vote_count:obj.vote_count,
        genres:obj.genre_ids,
        type:"tv"
    }
    return item;
}

async function searchTV(url){
    response = await fetch(url, {
        method:'GET',
        headers: {
            'Content-Type': 'application/json'
          },
    })
    .then(response=>response.json())
    .then(data=>JSON.parse(data))
    .then(function(data){
        results = [];
        for(i = 0; i < Math.min(10, data.results.length); i++){
            results.push(fillTV(data.results[i]));
        }
        return results;
    });
    return response;
}

async function searchMulti(url){
    response = await fetch(url, {
        method:'GET',
        headers: {
            'Content-Type': 'application/json'
          },
    })
    .then(response=>response.json())
    .then(data=>JSON.parse(data))
    .then(function(data){
        results = [];
        for(i = 0; i < Math.min(10, data.results.length); i++){
            if(data.results[i].media_type === "movie"){
                results.push(fillMovie(data.results[i]));
            } else if(data.results[i].media_type === "tv") {
                results.push(fillTV(data.results[i]));
            }
        }
        return results;
    });
    return response;
}


function populateSearch(result)
{
    console.log(result);
    var resultheader = document.getElementById("resultlister");
    if(result.length === 0)
    {
        resultheader.innerHTML = "No Results";
    } else {
        resultheader.innerHTML = "Showing Results...";
    }
    var num = Math.min(10, result.length);
    var elementString = "searchitem";
    var x = document.getElementsByClassName("searchitem"); 
    for(i = 0; i < num; i++){
        x[i].style.display = "inherit";
        if(result[i].poster_path !== "" && result[i].poster_path !== null){
            x[i].firstElementChild.firstElementChild.src = "https://image.tmdb.org/t/p/original" + result[i].poster_path;
        }
        x[i].lastElementChild.firstElementChild.innerHTML = result[i].title;
        var y = x[i].lastElementChild.children;
        for(j = 0; j < y.length; j++){
            if(y[j].id==="summary"){
                y[j].innerHTML = result[i].overview;
            }
            if(y[j].id==="rating"){
                y[j].innerHTML = "&#9733; " + result[i].vote_average + "/5";
            }
            if(y[j].id==="votes"){
                y[j].innerHTML = result[i].vote_count + " votes";
            }
            if(y[j].id==="showmmore"){
                y[j].value = result[i].id + " " + result[i].type;
            }
            if(y[j].id==="type"){
                y[j].innerHTML = result[i].type;
            }
            if(y[j].id==="yeargenre"){
                gen = []
                for(k = 0; k < result[i].genres.length; k++){     
                    gen.push(movie_genres[result[i].genres[k]]);     
                }
                y[j].innerHTML = result[i].date.substring(0,4) + " | " + gen.join();
            }
        }
    }
}


async function trending(){
    const movieurl = 'http://gbhw6.azurewebsites.net/trendingmovies'  
    var xhttp = new XMLHttpRequest();
    
    xhttp.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200){
            console.log(xhttp.responseText);
        }
    };
    xhttp.open("GET",movieurl,true);
    //xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.setRequestHeader('Access-Control-Allow-Origin', '*');
    xhttp.send();
    response= await fetch(movieurl, {
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(response=>response.json())
    .then(data=>JSON.parse(data))
    .then(function(data){
        for(i = 0; i < 5; i ++){
            item = {
                title:data.results[i].title,
                backdrop:data.results[i].backdrop_path,
                date:data.results[i].release_date
            }
            movies.push(item);
        }
    });
    const tvurl = 'http://gbhw6.azurewebsites.net/trendingtv'
    response=await fetch(tvurl, {
        method:'GET',
        mode: 'cors', // cors, *cors, same-origin
        credentials: 'same-origin', // include, *same-origin, omit
    })
    .then(response=>response.json())
    .then(data=>JSON.parse(data))
    .then(function(data){
        for(i = 0; i < 5; i ++){
            item = {
                name:data.results[i].name,
                backdrop:data.results[i].backdrop_path,
                date:data.results[i].first_air_date
            }
            tv.push(item);
        }
    });
    const genremovieurl = 'http://gbhw6.azurewebsites.net/mgenre'
    response=await fetch(genremovieurl, {
        method:'GET',
        mode: 'cors', // cors, *cors, same-origin
        credentials: 'same-origin', // include, *same-origin, omit
    })
    .then(response=>response.json())
    .then(data=>JSON.parse(data))
    .then(function(data){
        for(i = 0; i < data.genres.length; i++){
            movie_genres[data.genres[i].id] = data.genres[i].name;
        }
    });
    const genretvurl = 'http://gbhw6.azurewebsites.net/tgenre'
    response=await fetch(genretvurl, {
        method:'GET',
        mode: 'cors', // cors, *cors, same-origin
        credentials: 'same-origin', // include, *same-origin, omit
    })
    .then(response=>response.json())
    .then(data=>JSON.parse(data))
    .then(function(data){
        for(i = 0; i < data.genres.length; i++){
            movie_genres[data.genres[i].id] = data.genres[i].name;
        }
    });
    console.log(movie_genres);
    console.log(tv_genres);
    populateslides();
}

function hometab(evt) {
    var homecontent;
    homecontent = document.getElementsByClassName("homecontent");
    for(i = 0; i < homecontent.length; i++){
        homecontent[i].style.display = "inherit";
    }
    var searchcontent;
    searchcontent = document.getElementsByClassName("searchcontent");
    var searchform;
    searchform = document.getElementsByClassName("searchform");
    for(i = 0; i < searchcontent.length; i++){
        searchcontent[i].style.display = "none";
    }
    for(i = 0; i < searchform.length; i++){
        searchform[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    evt.currentTarget.className += " active";
}

function searchtab(evt) {
    var homecontent;
    homecontent = document.getElementsByClassName("homecontent");
    for(i = 0; i < homecontent.length; i++){
        homecontent[i].style.display = "none";
    }
    var searchform;
    searchform = document.getElementsByClassName("searchform");
    for(i = 0; i < searchform.length; i++){
        searchform[i].style.display = "inherit";
    }
    var searchcontent;
    searchcontent = document.getElementsByClassName("searchcontent");
    for(i = 0; i < searchcontent.length; i++){
        searchcontent[i].style.display = "inherit";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    evt.currentTarget.className += " active";
    return;
}

function start(){
    trending();
}

async function showmoredata(event){
    key = event.toElement.value;
    ind = key.indexOf(' ');
    type = key.substring(ind + 1);
    id = key.substring(0, ind);
    console.log(key.substring(0, ind));
    console.log(key.substring(ind + 1));
    const getdetails = 'http://gbhw6.azurewebsites.net/' + type + '/' + id;
    console.log(getdetails);
    const getcredits = 'http://gbhw6.azurewebsites.net/' + type + '/credits/' + id;
    console.log(getcredits);
    const getreviews = 'http://gbhw6.azurewebsites.net/' + type + '/review/' + id;
    console.log(getreviews);
    details=await fetch(getdetails)
    .then(response=>response.json())
    .then(data=>JSON.parse(data))
    .then(function(data){
        console.log(data);
        if(type === "movie"){
            item = {
                id: data.id,
                title: data.title,
                runtime: data.runtime,
                date: data.release_date,
                lang: data.spoken_languages,
                vote_average: data.vote_average,
                vote_count: data.vote_count,
                poster_path: data.poster_path,
                backdrop_path: data.backdrop_path,
                genres:data.genres
            };
            return item;
        }else{
            item = {
                id: data.id,
                title: data.name,
                overview: data.overview,
                runtime: data.episode_run_time,
                date: data.first_air_date,
                lang: data.spoken_languages,
                vote_average: data.vote_average,
                vote_count: data.vote_count,
                poster_path: data.poster_path,
                backdrop_path: data.backdrop_path,
                genres:data.genres,
                number_of_seasons:data.number_of_seasons
            };
            return item;
        }
    });
    console.log(details);
    credits = await fetch(getcredits)
    .then(response=>response.json())
    .then(data=>JSON.parse(data))
    .then(function(data){
        res = []
        console.log(data);
        for(i = 0; i < 8; i++){
            item = {
                name:data.cast[i].name,
                profile:data.cast[i].profile_path,
                character:data.cast[i].character
            }
            res.push(item);
        }
        return res;
    });
    console.log(credits);
    reviews = await fetch(getreviews)
    .then(response=>response.json())
    .then(data=>JSON.parse(data))
    .then(function(data){
        res = []
        for(i = 0; i < 5; i++){
            item = {
                username:data.results[i].username,
                content:data.results[i].content,
                rating:data.results[i].rating,
                created_at:data.results[i].created_at
            }
            res.push(item);
        }
        return res;
    });
    console.log(reviews)
}