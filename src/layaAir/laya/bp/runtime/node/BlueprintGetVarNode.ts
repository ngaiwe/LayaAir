import { TBPNode } from "../../datas/types/BlueprintTypes";
import { BlueprintConst } from "../../core/BlueprintConst";
import { INodeManger } from "../../core/interface/INodeManger";
import { IRunAble } from "../interface/IRunAble";
import { BlueprintStaticFun } from "../BlueprintStaticFun";
import { BlueprintRuntimeBaseNode } from "./BlueprintRuntimeBaseNode";
import { BlueprintUtil } from "../../core/BlueprintUtil";
import { IBPRutime } from "../interface/IBPRutime";
import { IRuntimeDataManger } from "../../core/interface/IRuntimeDataManger";

export class BlueprintGetVarNode extends BlueprintRuntimeBaseNode {
    private _varKey: string;
    constructor() {
        super();
    }

    protected onParseLinkData(node: TBPNode, manger: INodeManger<BlueprintRuntimeBaseNode>) {
        let cfg = manger.dataMap[node.dataId];
        this._varKey = cfg ? cfg.name : BlueprintUtil.constAllVars[node.dataId].name;
    }

    step(context: IRunAble, runTimeData: IRuntimeDataManger, fromExcute: boolean, runner: IBPRutime, enableDebugPause: boolean, runId: number): number {

        let _parmsArray: any[] = this.colloctParam(context, runTimeData, this.inPutParmPins, runner, runId);

        context.parmFromCustom(_parmsArray, this._varKey, '"' + this._varKey + '"');
        context.parmFromCustom(_parmsArray, context, "context");

        if (this.nativeFun) {
            let result = context.excuteFun(this.nativeFun, this.outPutParmPins, runTimeData, BlueprintStaticFun, _parmsArray, runId);
            if (result == undefined) {
                runTimeData.setPinData(this.outPutParmPins[0], result, runId);
            }
        }
        return BlueprintConst.MAX_CODELINE;
    }

}