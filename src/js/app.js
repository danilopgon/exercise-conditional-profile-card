import "../style/index.css";
/**
 *  EDIT ONLY INSIDE THIS RENDER FUNCTION
 *  This function is called every time the user changes types or changes any input
 * 
    {
        includeCover: true, // if includeCover is true the algorithm should
        background: "https://images.unsplash.com/photo-1511974035430-5de47d3b95da", // this is the url of the image that will used as background for the profile cover
        avatarURL: "https://randomuser.me/api/portraits/women/42.jpg", // this is the url for the profile avatar
        socialMediaPosition: "left", // social media bar position (left or right)
        
        twitter: null, // social media usernames
        github: null,
        linkedin: null,
        instagram: null,

        name: null,
        lastname: null,
        role: null,
        country: null,
        city: null
    }
 */
function render(variables = {}) {
  console.log("These are the current variables: ", variables); //print on the console
  // here we ask the logical questions to make decisions on how to build the html
  // if includeCover==false then we reset the cover code without the <img> tag to make the cover transparent.
  let cover = `<div class="cover"><img src="${variables.background}" /></div>`;
  if (variables.includeCover == false) cover = "<div class='cover'></div>";

  // reset the website body with the new html output
  document.querySelector("#widget_content").innerHTML = `<div class="widget">
            ${cover}
          <img src="${variables.avatarURL}" class="photo" />
          <h1></h1>
          <h2></h2>
          <h3></h3>
         </div>
    `;

  let nameText = document.querySelector("h1");
  let roleText = document.querySelector("h2");
  let cityText = document.querySelector("h3");
  let socialMediaUL = document.createElement("ul");

  variables.name !== null && variables.lastname !== null
    ? (nameText.textContent = `${variables.name} ${variables.lastname}`)
    : (nameText.textContent = `Write your name`);

  variables.role !== null
    ? (roleText.textContent = `${variables.role}`)
    : (roleText.textContent = `Select your role`);

  variables.city !== null && variables.country !== null
    ? (cityText.textContent = `${variables.city}, ${variables.country}`)
    : (cityText.textContent = `Select your city & country`);

  socialMediaUL.className = `${variables.socialMediaPosition}`;
  socialMediaUL.style.visibility = "hidden";
  document.querySelector(".widget").appendChild(socialMediaUL);

  let twitterLi = document.createElement("li");
  twitterLi.style.visibility = "hidden";
  twitterLi.innerHTML = `<a href="https://twitter.com/${variables.twitter}"><i class="fab fa-twitter"></i></a>`;
  variables.twitter !== null
    ? (twitterLi.style.visibility = "visible")
    : (twitterLi.style.visibility = "hidden");

  let instagramLi = document.createElement("li");
  instagramLi.style.visibility = "hidden";
  instagramLi.innerHTML = `<a href="https://instagram.com/${variables.instagram}"><i class="fab fa-instagram"></i></a>`;
  variables.instagram !== null
    ? (instagramLi.style.visibility = "visible")
    : (instagramLi.style.visibility = "hidden");

  let linkedinLi = document.createElement("li");
  linkedinLi.style.visibility = "hidden";
  linkedinLi.innerHTML = `<a href="https://linkedin.com/in/${variables.linkedin}"><i class="fab fa-linkedin"></i></a>`;
  variables.linkedin !== null
    ? (linkedinLi.style.visibility = "visible")
    : (linkedinLi.style.visibility = "hidden");

  let githubLi = document.createElement("li");
  githubLi.style.visibility = "hidden";
  githubLi.innerHTML = `<a href="https://github.com/${variables.github}"><i class="fab fa-github"></i></a>`;
  variables.github !== null
    ? (githubLi.style.visibility = "visible")
    : (githubLi.style.visibility = "hidden");

  socialMediaUL.append(twitterLi, githubLi, linkedinLi, instagramLi);

  variables.twitter !== null ||
  variables.github !== null ||
  variables.linkedin !== null ||
  variables.instagram !== null
    ? (socialMediaUL.style.visibility = "visible")
    : (socialMediaUL.style.visibility = "hidden");
}

window.onload = function() {
  window.variables = {
    // if includeCover is true the algorithm should
    includeCover: false,
    // this is the url of the image that will used as background for the profile cover
    background:
      "https://cdn.pixabay.com/photo/2016/08/03/09/03/universe-1566159__340.jpg",
    // this is the url for the profile avatar
    avatarURL:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
    // social media bar position (left or right)
    socialMediaPosition: "position-left",
    // social media usernames
    twitter: null,
    github: null,
    linkedin: null,
    instagram: null,
    name: null,
    lastname: null,
    role: null,
    country: null,
    city: null
  };
  render(window.variables); //render the card for the first time

  document.querySelectorAll(".picker").forEach(function(elm) {
    elm.addEventListener("change", function(e) {
      // <- add a listener to every input
      const attribute = e.target.getAttribute("for"); // when any input changes, collect the value
      let values = {};
      values[attribute] =
        this.value == "" || this.value == "null"
          ? null
          : this.value == "true"
          ? true
          : this.value == "false"
          ? false
          : this.value;
      render(Object.assign(window.variables, values)); // render again the card with new valus
    });
  });
};
