export class Message {
    private type: string;
    private date: number;
    private text: string;

    constructor (message: string) {
        this.type = 'manager';
        this.date = +new Date();
        this.text = message;
    }
}
