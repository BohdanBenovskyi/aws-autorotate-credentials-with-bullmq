import { contextBridge, ipcRenderer } from "electron";
import { type ConnectionStatus } from "./constants/index.constants";

const handlers = {
    configurationsApi: {
        testConnection: async (connectionString: string): Promise<ConnectionStatus> => {
            return await ipcRenderer.invoke('test-connection', { connectionString });
        },
        selectDirectories: async (): Promise<string[]> => { return await ipcRenderer.invoke('select-dirs') },
    }
}

contextBridge.exposeInMainWorld('autorotateApi', handlers);

export type AutorotateApi = typeof handlers;