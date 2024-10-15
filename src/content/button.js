function hasToolBarChild(node, imgButtonClickHandler) {
  const toolbarNode = node.querySelector('[data-testid="toolBar"]');
  if (toolbarNode) {
    let containerDiv = document.createElement("div");
    containerDiv.classList.add("image-button-container");

    let imgButton = document.createElement("img");
    imgButton.src = chrome.runtime.getURL("/src/assets/images/icon-button.png");
    imgButton.alt = "Click Me";
    imgButton.classList.add("image-button");

    containerDiv.appendChild(imgButton);
    toolbarNode.parentNode.insertBefore(containerDiv, toolbarNode);

    imgButton.addEventListener("click", () => imgButtonClickHandler(node));

    console.log("Toolbar found and button added!");
  }
}

function populateAndFocus(node) {
  const editorRoot = node.querySelector(".DraftEditor-root");
  if (editorRoot) {
    const placeholderDiv = editorRoot.querySelector(
      ".public-DraftEditorPlaceholder-root"
    );
    const contentEditableDiv = editorRoot.querySelector(
      ".public-DraftEditor-content"
    );

    if (placeholderDiv) {
      placeholderDiv.classList.add("public-DraftEditorPlaceholder-hasFocus");
      contentEditableDiv.focus();
    }
  }
}

function imgButtonClickHandler(node) {
  const toolbarTweetNode = node.querySelector('[data-testid="tweetText"]');
  if (toolbarTweetNode) {
    alert(toolbarTweetNode.innerText);
  }

  const nodeToPass = document.querySelector(
    '[data-testid="tweetTextarea_0RichTextInputContainer"]'
  );
  if (nodeToPass) {
    populateAndFocus(nodeToPass);
  }
}

// Create a MutationObserver to monitor changes in the DOM
const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    mutation.addedNodes.forEach((node) => {
      if (node.nodeType === Node.ELEMENT_NODE) {
        hasToolBarChild(node, imgButtonClickHandler);
      }
    });
  });
});

// Configuration for the observer
const config = {
  childList: true,
  subtree: true,
};

// Start observing the document body for changes
observer.observe(document.body, config);

console.log("MutationObserver started!");
