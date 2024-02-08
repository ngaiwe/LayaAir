import { CommandBuffer } from "../../../d3/core/render/command/CommandBuffer";
import { IForwardAddRP } from "../../DriverDesign/3DRenderPass/I3DRenderPass";
import { GLESDirectLightShadowRP } from "./GLESDirectLightShadowRP";
import { GLESForwardAddClusterRP } from "./GLESForwardAddClusterRP";
import { GLESSpotLightShadowRP } from "./GLESSpotLightShadowRP";


export class GLESForwardAddRP implements IForwardAddRP {
    public get shadowCastPass(): boolean {
        return this._nativeObj._shadowCastPass;
    }
    public set shadowCastPass(value: boolean) {
        this._nativeObj._shadowCastPass = value;
    }
    private _directLightShadowPass: GLESDirectLightShadowRP;
    public get directLightShadowPass(): GLESDirectLightShadowRP {
        return this._directLightShadowPass;
    }
    public set directLightShadowPass(value: GLESDirectLightShadowRP) {
        this._directLightShadowPass = value;
        this._nativeObj.setDirectLightShadowPass(value._nativeObj);
    }
    public get enableDirectLightShadow(): boolean {
        return this._nativeObj._enableDirectLightShadow;
    }
    public set enableDirectLightShadow(value: boolean) {
        this._nativeObj._enableDirectLightShadow = value;
    }
    private _spotLightShadowPass: GLESSpotLightShadowRP;
    public get spotLightShadowPass(): GLESSpotLightShadowRP {
        return this._spotLightShadowPass;
    }
    public set spotLightShadowPass(value: GLESSpotLightShadowRP) {
        this._spotLightShadowPass = value;
        this._nativeObj.setSpotLightShadowPass(value._nativeObj);
    }
    private _enableSpotLightShadowPass: boolean;
    public get enableSpotLightShadowPass(): boolean {
        return this._enableSpotLightShadowPass;
    }
    public set enableSpotLightShadowPass(value: boolean) {
        this._enableSpotLightShadowPass = value;
    }
    private _renderpass: GLESForwardAddClusterRP;
    public get renderpass(): GLESForwardAddClusterRP {
        return this._renderpass;
    }
    public set renderpass(value: GLESForwardAddClusterRP) {
        this._renderpass = value;
        this._nativeObj.setSpotLightShadowPass(value._nativeObj);
    }

    setAfterEventCmd(value: CommandBuffer[]): void {
        //throw new Error("Method not implemented.");
    }

    _nativeObj: any;

    constructor() {
        this._nativeObj = new (window as any).conchRTForwardAddRP();
        this.directLightShadowPass = new GLESDirectLightShadowRP();
        this.spotLightShadowPass = new GLESSpotLightShadowRP();
        this.renderpass = new GLESForwardAddClusterRP();
    }
}