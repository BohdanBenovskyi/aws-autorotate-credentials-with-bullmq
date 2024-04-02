import { type AutorotateApi } from './preload';

declare global {
    interface Window {
        autorotateApi: AutorotateApi
    }
}