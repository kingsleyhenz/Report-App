export interface webHookService {
    handle(data: any): Promise<void>
    verify(hash: string, data: any): Promise<boolean> | boolean;

    handleFlutterwave(data: any): Promise<void>
    verifyFlutterwave(hash: string): Promise<boolean> | boolean;
}