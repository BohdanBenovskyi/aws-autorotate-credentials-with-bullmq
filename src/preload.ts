// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
import { contextBridge, ipcRenderer } from "electron";

const handlers = {
    configurationsApi: {
        getConfigurations: async () => { return await ipcRenderer.invoke('get-configurations') }
    }
}

contextBridge.exposeInMainWorld('autorotateApi', handlers);

export type AutorotateApi = typeof handlers;