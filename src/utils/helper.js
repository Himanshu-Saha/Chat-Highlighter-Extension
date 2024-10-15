export function hasToolBarChild(node, imgButtonClickHandler) {
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

export function populateAndFocus(node) {
    const editorRoot = node.querySelector(".DraftEditor-root");
    if (editorRoot) {
        const placeholderDiv = editorRoot.querySelector(".public-DraftEditorPlaceholder-root");
        const contentEditableDiv = editorRoot.querySelector(".public-DraftEditor-content");

        if (placeholderDiv) {
            placeholderDiv.classList.add("public-DraftEditorPlaceholder-hasFocus");
            contentEditableDiv.focus();
        }
    }
}
