const trendingURL = " https://api.themoviedb.org/3/trending/movie/week?api_key=67eab0d9fe5d8ddce707c258d0119915";
const upcomingURL = "https://api.themoviedb.org/3/movie/upcoming?api_key=67eab0d9fe5d8ddce707c258d0119915&language=en-US&page=1";
const popularURL = "https://api.themoviedb.org/3/movie/popular?api_key=67eab0d9fe5d8ddce707c258d0119915&language=en-US&page=1";
const nowPlayingURL = "https://api.themoviedb.org/3/movie/now_playing?api_key=67eab0d9fe5d8ddce707c258d0119915&language=en-US&page=1";
const topRatedURL = "https://api.themoviedb.org/3/movie/top_rated?api_key=67eab0d9fe5d8ddce707c258d0119915&language=en-US&page=1";
let nowPlayingBtn = document.getElementById("nowPlayingBtn");
let upcomingBtn = document.getElementById("upcomingBtn");
let popularBtn = document.getElementById("popularBtn");
let topRatedBtn = document.getElementById("topRatedBtn");
let trendingBtn = document.getElementById("trendingBtn");
let allMoviesSearch = document.getElementById("allMovies");
let wordSearch = document.getElementById("word");
let userNameInput = document.getElementById("userName");
let userEmailInput = document.getElementById("userEmail");
let userPhoneInput = document.getElementById("userName");
let userAgeInput = document.getElementById("userAge");
let userPassInput = document.getElementById("userPass");
let userRePassInput = document.getElementById("userRePass");
let submitBtn = document.getElementById("submitBtn");
let submitted = document.getElementById("submitted");
let notSubmitted = document.getElementById("notSubmitted");

// GetMoveis
async function getMovies(nowPlayingURL) {
   let response = await fetch(nowPlayingURL);
   let finalResult = await response.json();
   let Movies = Array.from(finalResult.results);
   displayMovies(Movies);
   allMoviesSearch.addEventListener("keyup", function () {
      searchMovies(Movies);
   });
}
getMovies(nowPlayingURL);

function displayMovies(movies) {
   cartona = "";
   for (var i = 0; i < movies.length; i++) {
      cartona += `
      <div class="col-md-6 col-lg-4">
                  <div id="post" class="position-relative overflow-hidden">
                     <img src="https://image.tmdb.org/t/p/w500${movies[i].poster_path}" alt="notfound" class="img-fluid" />
                     <div class="layer w-100 h-100 text-center position-absolute d-flex align-items-center">
                        <div class="info p-0">
                           <h2>${movies[i].original_title}</h2>
                           <p>
                           ${movies[i].overview}
                           </p>
                           <p>rate: ${movies[i].vote_average}</p>
                           <p>${movies[i].release_date}</p>
                        </div>
                     </div>
                  </div>
               </div>
      `;
   }
   document.getElementById("posts").innerHTML = cartona;
}

// nowplaying
nowPlayingBtn.addEventListener("click", function () {
   getMovies(nowPlayingURL);
});
upcomingBtn.addEventListener("click", function () {
   getMovies(upcomingURL);
});
trendingBtn.addEventListener("click", function () {
   getMovies(trendingURL);
});
topRatedBtn.addEventListener("click", function () {
   getMovies(topRatedURL);
});
popularBtn.addEventListener("click", function () {
   getMovies(popularURL);
});
// Search
function searchMovies(movies) {
   searchResults = [];
   for (let i = 0; i < movies.length; i++) {
      if (movies[i].original_title.toLowerCase().includes(allMoviesSearch.value.toLowerCase())) {
         searchResults.push(movies[i]);
      }
   }
   displayMovies(searchResults);
}

//Navsliding
$("#toggler-closer").click(function () {
   if ($("nav").css("left") == "0px") {
      $("nav").animate({ left: -185 }, 1000);
      document.getElementById("toggler-closer").innerHTML = '<i class="fa fa-align-justify"></i>';
   } else {
      $("nav").animate({ left: "0px" }, 1000);
      document.getElementById("toggler-closer").innerHTML = '<i class="fa-solid fa-xmark"></i>';
      new WOW().init();
   }
});

// Email validation
function validateEmail() {
   var regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
   if (regex.test(userEmailInput.value)) {
      userEmailInput.classList.replace("is-invalid", "is-valid");
      return true;
   } else if (userEmailInput.value == "") {
      userEmailInput.classList.remove("is-invalid", "is-valid");
   } else {
      userEmailInput.classList.add("is-invalid");
      return false;
   }
}
userEmailInput.addEventListener("keyup", function () {
   validateEmail();
});

//Name Validation
function validateName() {
   var regex = /\b([A-ZÀ-ÿ][-,a-z. ']+[ ]*)+/;
   if (regex.test(userNameInput.value)) {
      userNameInput.classList.replace("is-invalid", "is-valid");
      return true;
   } else if (userNameInput.value == "") {
      userNameInput.classList.remove("is-invalid", "is-valid");
   } else {
      userNameInput.classList.add("is-invalid");
      return false;
   }
}
userNameInput.addEventListener("keyup", function () {
   validateName();
});

//Age validation

function validateAge() {
   if (userAgeInput.value >= 18 && userAgeInput.value <= 100) {
      userAgeInput.classList.replace("is-invalid", "is-valid");
      return true;
   } else if (userAgeInput.value == "") {
      userAgeInput.classList.remove("is-invalid", "is-valid");
   } else {
      userAgeInput.classList.add("is-invalid");
      return false;
   }
}
userAgeInput.addEventListener("keyup", function () {
   validateAge();
   console.log("working");
});

// Pass-Validation
function validatePassword(userPassInput) {
   var regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
   if (regex.test(userPassInput.value)) {
      userPassInput.classList.replace("is-invalid", "is-valid");
      return true;
   } else if (userPassInput.value == "") {
      userPassInput.classList.remove("is-invalid", "is-valid");
   } else {
      userPassInput.classList.add("is-invalid");
      return false;
   }
}

userPassInput.addEventListener("keyup", function () {
   validatePassword(userPassInput);
});
userRePassInput.addEventListener("keyup", function () {
   validatePassword(userRePassInput);
});
// Ready function

$(document).ready(function () {
   $("#loading .spinner").fadeOut(100, function () {
      $("#loading").fadeOut(100, function () {
         $("#loading").remove();
         $("body").css("overflow-y", "auto");
      });
   });
});

// Submit
submitBtn.addEventListener("click", function () {
   if (validateAge() && validateEmail() && validateName && validatePassword) {
      submitted.classList.replace('d-none','d-block')
      notSubmitted.classList.replace('d-block','d-none')
   }
    else{
      notSubmitted.classList.replace('d-none','d-block')
      submitted.classList.replace('d-block','d-none')
   } ;
});
