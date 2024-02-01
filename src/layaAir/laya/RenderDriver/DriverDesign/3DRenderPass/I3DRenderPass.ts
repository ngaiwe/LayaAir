
import { SubShader } from "../../../RenderEngine/RenderShader/SubShader";
import { Camera } from "../../../d3/core/Camera";
import { Transform3D } from "../../../d3/core/Transform3D";
import { SpotLightCom } from "../../../d3/core/light/SpotLightCom";
import { CommandBuffer } from "../../../d3/core/render/command/CommandBuffer";
import { Viewport } from "../../../d3/math/Viewport";
import { Color } from "../../../maths/Color";
import { Vector4 } from "../../../maths/Vector4";
import { DepthTextureMode } from "../../../resource/RenderTexture";
import { SingletonList } from "../../../utils/SingletonList";
import { IDirectLightData, ICameraNodeData, IBaseRenderNode, ISceneNodeData } from "../../RenderModuleData/Design/3D/I3DRenderModuleData";
import { ShaderData } from "../RenderDevice/ShaderData";
import { IRenderGeometryElement } from "../RenderDevice/IRenderGeometryElement";
import { InternalRenderTarget } from "../RenderDevice/InternalRenderTarget";

export interface ISpotLightShadowRP {
    light: SpotLightCom;
    destTarget: InternalRenderTarget;
}

export interface IDirectLightShadowRP {
    light: IDirectLightData;
    camera: ICameraNodeData;
    destTarget: InternalRenderTarget;
}

export interface IForwardAddClusterRP {
    /**enable */
    /**@internal */
    enableOpaque: boolean;
    /**@internal */
    enableCMD: boolean;
    /**@internal */
    enableTransparent: boolean;
    /**@internal */
    enableOpaqueTexture: boolean;

    /**@internal */
    destTarget: InternalRenderTarget;
    /**@internal */
    pipelineMode: PipelineMode;

    /**@internal */
    depthTarget: InternalRenderTarget;
    /**@internal */
    depthPipelineMode: PipelineMode;

    /**@internal */
    depthNormalTarget: InternalRenderTarget;
    /**@internal */
    depthNormalPipelineMode: PipelineMode

    /**@internal sky TODO*/
    skyRenderNode: IBaseRenderNode;
    /**@internal */
    depthTextureMode: DepthTextureMode;
    /**@internal */
    opaqueTexture: InternalRenderTarget;
    /**@internal */
    camera: ICameraNodeData;
    /**@internal */
    clearColor: Color;
    /**@internal */
    clearFlag: number;

    setCameraCullInfo(value: Camera): void;
    setViewPort(value: Viewport): void;
    setScissor(value: Vector4): void;
    setBeforeForwardCmds(value: Array<CommandBuffer>): void;
    setBeforeSkyboxCmds(value: Array<CommandBuffer>): void;
    setBeforeTransparentCmds(value: Array<CommandBuffer>): void;
}

export interface IForwardAddRP {

    /**是否开启阴影 */
    shadowCastPass: boolean;

    /**directlight shadow */
    directLightShadowPass: IDirectLightShadowRP;

    /**enable directlight */
    enableDirectLightShadow: boolean;

    /**spot shadow */
    spotLightShadowPass: ISpotLightShadowRP;

    /**enable spot */
    enableSpotLightShadowPass: boolean;

    /**postProcess pass */
    //postProcess TODO

    /**main pass */
    renderpass: IForwardAddClusterRP;

    /**Render end commanbuffer */
    setAfterEventCmd(value: Array<CommandBuffer>): void;
}

export interface IRender3DProcess {
    renderFowarAddCameraPass(context: IRenderContext3D, renderpass: IForwardAddRP, list: IBaseRenderNode[], count: number): void;
}

export declare type PipelineMode = "Forward" | "ShadowCaster" | "DepthNormal" | string;
export interface IRenderContext3D {
    globalShaderData: ShaderData;
    sceneData: ShaderData;
    sceneModuleData: ISceneNodeData;
    cameraModuleData: ICameraNodeData;
    cameraData: ShaderData;

    sceneUpdataMask: number;
    cameraUpdateMask: number;
    pipelineMode: PipelineMode;
    invertY: boolean;
    setRenderTarget(value: InternalRenderTarget): void;
    setViewPort(value: Viewport): void;
    setScissor(value: Vector4): void;
    setClearData(clearFlag: number, clolor: Color, depth: number, stencil: number): number;
    drawRenderElementList(list: SingletonList<IRenderElement3D>): number;
    drawRenderElementOne(node: IRenderElement3D): number;
}

export interface IRenderElement3D {
    geometry: IRenderGeometryElement;
    materialShaderData: ShaderData;
    materialRenderQueue: number;
    renderShaderData: ShaderData;
    transform: Transform3D;
    isRender: boolean;
    owner: IBaseRenderNode;
    subShader: SubShader;
    destroy(): void;
}

export interface IVertexBuffer3D{
    //TODO
}

export interface IIndexBuffer3D{
    //TODO
}