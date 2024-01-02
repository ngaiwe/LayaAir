import { IOutParm } from "../../core/interface/IOutParm";

export class RuntimeNodeData {
    parmsArray: any[];

    constructor() {
        this.parmsArray=[];
    }
}

export class RuntimePinData implements IOutParm {
    name: string;
    value: any;
    setValue(value:any){
        this.value=value;
    }

    getValue():any{
        return this.value;
    }

}