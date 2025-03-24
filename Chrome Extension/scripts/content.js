function elementChecker(selector, timeout = 10000) {
  //timeout = 10 minutes
  return new Promise((resolve, reject) => {
    const pollingRate = 100;
    let timeElapsed = 0;

    const interval = setInterval(() => {
      const element = document.querySelector(selector);
      if (element) {
        clearInterval(interval);
        resolve(element);
      } else if ((timeElapsed += pollingRate) <= timeout) {
        clearInterval(interval);
        reject(new Error("Could not find the element within timeout"));
      }
    }, pollingRate);
  });
}

elementChecker(".center-buttons h1")
  .then((targetNode) => {
    const observer = new MutationObserver((mutationsList) => {
      for (const mutation of mutationsList) {
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

    const timeoutMultiplier = 120; // x seconds
    setTimeout(() => observer.disconnect(), timeoutMultiplier * 1000);
  })
  .catch((error) => console.warn("Mutation observer error: ", error));
