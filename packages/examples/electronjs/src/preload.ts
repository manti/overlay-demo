const { contextBridge, ipcRenderer } = require('electron');

window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector: string, text: string) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  }

  for (const type of ["chrome", "node", "electron"]) {
    replaceText(`${type}-version`, process.versions[type as keyof NodeJS.ProcessVersions]);
  }
})


contextBridge.exposeInMainWorld('electron', {
  startDrag: () => {
    ipcRenderer.send('start-drag');
  }
});

ipcRenderer.on('start-drag-reply', () => {
  // @ts-ignore
  window.electronDragStart();
});