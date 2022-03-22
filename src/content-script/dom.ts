export function initializeDOM() {
  const bodyDOM = document.querySelector('body');

  const containerDOM = document.createElement('div');
  containerDOM.className = 'webkansu-ui-container';

  const contentDOM = document.createElement('div');
  contentDOM.className = 'webkansu-ui-content';
  contentDOM.innerHTML = `Webkansu`;

  if (bodyDOM) {
    bodyDOM.appendChild(containerDOM);
    containerDOM.appendChild(contentDOM);
  }
  return contentDOM;
}
