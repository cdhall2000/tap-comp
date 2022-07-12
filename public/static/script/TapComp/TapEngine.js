export default class TapEngine {
    constructor(){
        this.var = 'started'
    }
    run(){
        this.var = 'running'
        return this.var
    }
}