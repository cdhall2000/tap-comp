//@ts-check



export default class TapEngine {
    start: String;

    constructor(){
        this.start = 'started'
    }
    run(): Number{
        this.var = 'running'
        return this.var
    }
}