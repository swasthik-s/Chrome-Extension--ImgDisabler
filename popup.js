document.addEventListener("DOMContentLoaded", function () {
  const toggleSwitch = document.getElementById("toggleSwitch");
  toggleSwitch.addEventListener("change", toggleImageBlocking);

  // Retrieve user preference from storage and update the switch accordingly
  chrome.storage.sync.get("imageBlockingEnabled", ({ imageBlockingEnabled }) => {
    toggleSwitch.checked = imageBlockingEnabled;
    if (imageBlockingEnabled) {
      autoReloadActiveTab();
    }
  });
});

function toggleImageBlocking() {
  const enabled = document.getElementById("toggleSwitch").checked;
  chrome.storage.sync.set({ imageBlockingEnabled: enabled });

  // Send a message to the content script to toggle image blocking
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const activeTab = tabs[0];
    const action = enabled ? "disableImages" : "enableImages";
    chrome.tabs.executeScript(
      activeTab.id,
      { code: `(${toggleImages.toString()})("${action}")` },
      () => {
        // Script executed successfully
        if (!enabled) {
          // If turning off image block, auto-reload the active tab
          autoReloadActiveTab();
        }
      }
    );
  });

  if (enabled) {
    autoReloadActiveTab();
  } else {
    // If turning off image block, auto-reload the active tab
    autoReloadActiveTab();
  }
}

function toggleImages(action) {
  const images = document.querySelectorAll("img");
  for (const img of images) {
    img.style.display = action === "disableImages" ? "none" : "block";
  }
}

function autoReloadActiveTab() {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const activeTab = tabs[0];
    chrome.tabs.reload(activeTab.id);
  });
}
