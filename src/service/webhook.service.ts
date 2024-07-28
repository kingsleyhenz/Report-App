export interface webHookService {
    handle(data: any): Promise<void>
    verify(hash: string, data: any): Promise<boolean> | boolean;
}