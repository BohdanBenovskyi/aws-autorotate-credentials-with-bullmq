export type TestConnectionButtonProps = {
    connectionString: string;
    setConnectionResult: (connectionResult: string) => void;
    renderToastResult: (connectionResult: string) => void;
}