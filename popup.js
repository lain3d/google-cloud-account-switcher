document.addEventListener("DOMContentLoaded", async () => {
    const saveButton = document.getElementById("save");
    const authuserInput = document.getElementById("authuser");
    const statusSpan = document.getElementById("status");
  
    saveButton.addEventListener("click", async () => {
      const authuserValue = authuserInput.value;
      await browser.storage.sync.set({ authuser: authuserValue });
      
      // Show the status message
      statusSpan.textContent = "Authuser value saved!";
      statusSpan.style.display = "block";
      
      // Hide the status message after a few seconds
      setTimeout(() => {
        statusSpan.style.display = "none";
      }, 3000);
    });
});