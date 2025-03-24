const targetNode = document.querySelector(".center-buttons h1");

const observer = new MutationObserver((mutatationsList) => {
  for (const mutation of mutatationsList) {
    if (
      mutation.type === "childList" ||
      mutation.type === "characterData" ||
      mutation.type === "subtree"
    ) {
      console.log("Change detected: ", mutation);
      console.log("New content: ", targetNode.textContent.trim());
    }
  }
});

const config = {
  childList: true,
  characterData: true,
  subtree: true,
};

observer.observe(targetNode, config);
console.log("Observing started!");

const timeoutMultiplier = 2; // x minutes
setTimeout(observer.disconnect(), timeoutMultiplier * 1000);

