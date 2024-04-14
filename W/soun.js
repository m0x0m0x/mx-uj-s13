/* 
This is for adding sound effects which are taken from here 
main Sound - https://cdn.freesound.org/previews/721/721989_12068263-lq.mp3 
Source Web - https://freesound.org/search/?f=grouping_pack:%2239000_Female%20Sexual%20Sound%20Effects%20For%20NSFW%20Content%20Creators%22&s=Date+added+(newest+first)&g=1
*/

// OPen Account Sound
document.addEventListener("DOMContentLoaded", () => {
  const opnbtn = document.querySelector(".btn.btn--show-modal");
  const opnbtn2 = document.querySelector(
    ".nav__link.nav__link--btn.btn--show-modal"
  );
  const openSound = document.getElementById("openSound");
  opnbtn.addEventListener("click", () => {
    openSound.currentTime = 0; // Reset the audio to the beginning
    openSound.play(); // Play the click sound
  });
  opnbtn2.addEventListener("click", () => {
    openSound.currentTime = 0; // Reset the audio to the beginning
    openSound.play(); // Play the click sound
  });
});

//
