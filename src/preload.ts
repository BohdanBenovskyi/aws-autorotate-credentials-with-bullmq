import { contextBridge, ipcRenderer } from "electron";

const handlers = {
    configurationsApi: {
        testConnection: async (connectionString: string) => { return await ipcRenderer.invoke('test-connection', { connectionString }) },
        getConfigurations: async () => { return await ipcRenderer.invoke('get-configurations') }
    }
}

contextBridge.exposeInMainWorld('autorotateApi', handlers);

export type AutorotateApi = typeof handlers;