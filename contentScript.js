// This code will be executed on every page load
chrome.storage.sync.get("imageBlockingEnabled", ({ imageBlockingEnabled }) => {
  if (imageBlockingEnabled) {
    toggleImages("disableImages");
  }
});

function toggleImages(action) {
  const images = document.querySelectorAll("img");
  for (const img of images) {
    img.style.display = action === "disableImages" ? "none" : "block";
  }
}

// If you want to disable loading images, uncomment the lines below:
// const observer = new MutationObserver((mutationsList) => {
//   for (const mutation of mutationsList) {
//     if (mutation.type === "childList" && mutation.addedNodes.length) {
//       const addedImages = mutation.target.querySelectorAll("img");
//       for (const img of addedImages) {
//         img.style.display = "none";
//       }
//     }
//   }
// });

// observer.observe(document.body, { childList: true, subtree: true });
