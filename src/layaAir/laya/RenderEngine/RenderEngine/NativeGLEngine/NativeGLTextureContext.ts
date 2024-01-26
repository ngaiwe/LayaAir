
import { NativeGLObject } from "./NativeGLObject";
import { NativeWebGLEngine } from "./NativeWebGLEngine";
import { DDSTextureInfo } from "../../DDSTextureInfo";
import { HDRTextureInfo } from "../../HDRTextureInfo";
import { KTXTextureInfo } from "../../KTXTextureInfo";
import { InternalRenderTarget } from "../../../RenderDriver/DriverDesign/RenderDevice/InternalRenderTarget";
import { InternalTexture } from "../../../RenderDriver/DriverDesign/RenderDevice/InternalTexture";
import { ITextureContext } from "../../../RenderDriver/DriverDesign/RenderDevice/ITextureContext";
import { RenderTargetFormat } from "../../RenderEnum/RenderTargetFormat";
import { TextureCompareMode } from "../../RenderEnum/TextureCompareMode";
import { TextureDimension } from "../../RenderEnum/TextureDimension";
import { TextureFormat } from "../../RenderEnum/TextureFormat";

export class NativeGLTextureContext extends NativeGLObject implements ITextureContext {
    needBitmap: boolean;
    protected _native: any;

    constructor(engine: NativeWebGLEngine, native: any) {
        super(engine);
        this._native = native;
        this.needBitmap = false;
    }

    createTextureInternal(dimension: TextureDimension, width: number, height: number, format: TextureFormat, generateMipmap: boolean, sRGB: boolean): InternalTexture {
        return this._native.createTextureInternal(dimension, width, height, format, generateMipmap, sRGB);
    }

    setTextureImageData(texture: InternalTexture, source: HTMLImageElement | HTMLCanvasElement | ImageBitmap, premultiplyAlpha: boolean, invertY: boolean) {
        this._native.setTextureImageData(texture, (source as any)._nativeObj.conchImgId, premultiplyAlpha, invertY);
    }

    setTexturePixelsData(texture: InternalTexture, source: ArrayBufferView, premultiplyAlpha: boolean, invertY: boolean) {
        this._native.setTexturePixelsData(texture, source, premultiplyAlpha, invertY);
    }

    initVideoTextureData(texture: InternalTexture): void {
        this._native.initVideoTextureData(texture);
    }

    setTextureSubPixelsData(texture: InternalTexture, source: ArrayBufferView, mipmapLevel: number, generateMipmap: boolean, xOffset: number, yOffset: number, width: number, height: number, premultiplyAlpha: boolean, invertY: boolean): void {
        this._native.setTextureSubPixelsData(texture, source, mipmapLevel, generateMipmap, xOffset, yOffset, width, height, premultiplyAlpha, invertY);
    }

    setTextureSubImageData(texture: InternalTexture, source: HTMLImageElement | HTMLCanvasElement | ImageBitmap, x: number, y: number, premultiplyAlpha: boolean, invertY: boolean): void {
        throw new Error("setTextureSubImageData Method not implemented.");
    }

    setTexture3DImageData(texture: InternalTexture, source: HTMLImageElement[] | HTMLCanvasElement[] | ImageBitmap[], depth: number, premultiplyAlpha: boolean, invertY: boolean): void {
        this._native.setTexture3DImageData(texture, (source as any[]).map(function (s) { return s._nativeObj }), depth, premultiplyAlpha, invertY);
    }

    setTexture3DPixlesData(texture: InternalTexture, source: ArrayBufferView, depth: number, premultiplyAlpha: boolean, invertY: boolean): void {
        this._native.setTexture3DPixlesData(texture, source, depth, premultiplyAlpha, invertY);
    }

    setTexture3DSubPixelsData(texture: InternalTexture, source: ArrayBufferView, mipmapLevel: number, generateMipmap: boolean, xOffset: number, yOffset: number, zOffset: number, width: number, height: number, depth: number, premultiplyAlpha: boolean, invertY: boolean): void {
        this._native.setTexture3DSubPixelsData(texture, source, mipmapLevel, generateMipmap, xOffset, yOffset, zOffset, width, height, depth, premultiplyAlpha, invertY);
    }

    setTextureHDRData(texture: InternalTexture, hdrInfo: HDRTextureInfo): void {
        let sourceData = hdrInfo.readScanLine();
        throw new Error("setTextureHDRData Method not implemented.");
        this.setTexturePixelsData(texture, sourceData, false, false);
    }
    setTextureDDSData(texture: InternalTexture, ddsInfo: DDSTextureInfo) {
        this._native.setTextureKTXData(texture, ddsInfo);
    }

    setTextureKTXData(texture: InternalTexture, ktxInfo: KTXTextureInfo) {
        this._native.setTextureKTXData(texture, ktxInfo);
    }
    setCubeImageData(texture: InternalTexture, sources: (HTMLImageElement | HTMLCanvasElement | ImageBitmap)[], premultiplyAlpha: boolean, invertY: boolean): void {
        var images: any[] = [];
        var length = sources.length;
        for (let index = 0; index < length; index++) {
            images.push((sources[index] as any)._nativeObj);
        }
        this._native.setCubeImageData(texture, images, premultiplyAlpha, invertY);
    }

    setCubePixelsData(texture: InternalTexture, source: ArrayBufferView[], premultiplyAlpha: boolean, invertY: boolean): void {
        this._native.setCubePixelsData(texture, source, premultiplyAlpha, invertY);
    }
    setCubeSubPixelData(texture: InternalTexture, source: ArrayBufferView[], mipmapLevel: number, generateMipmap: boolean, xOffset: number, yOffset: number, width: number, height: number, premultiplyAlpha: boolean, invertY: boolean): void {
        this._native.setCubeSubPixelData(texture, source, mipmapLevel, generateMipmap, xOffset, yOffset, width, height, premultiplyAlpha, invertY);
    }


    setCubeDDSData(texture: InternalTexture, ddsInfo: DDSTextureInfo) {
        this._native.setCubeDDSData(texture, ddsInfo);
    }

    setCubeKTXData(texture: InternalTexture, ktxInfo: KTXTextureInfo) {
        this._native.setCubeKTXData(texture, ktxInfo);
    }

    setTextureCompareMode(texture: InternalTexture, compareMode: TextureCompareMode): TextureCompareMode {
        return this._native.setTextureCompareMode(texture, compareMode);
    }

    bindRenderTarget(renderTarget: InternalRenderTarget, faceIndex: number = 0): void {
        this._native.bindRenderTarget(renderTarget, faceIndex);
    }

    bindoutScreenTarget(): void {
        this._native.bindoutScreenTarget();
    }

    unbindRenderTarget(renderTarget: InternalRenderTarget): void {
        this._native.unbindRenderTarget(renderTarget);
    }

    createRenderTextureInternal(dimension: TextureDimension, width: number, height: number, format: RenderTargetFormat, generateMipmap: boolean, sRGB: boolean): InternalTexture {
        return this._native.createRenderTextureInternal(dimension, width, height, format, generateMipmap, sRGB);
    }

    createRenderTargetInternal(width: number, height: number, colorFormat: RenderTargetFormat, depthStencilFormat: RenderTargetFormat, generateMipmap: boolean, sRGB: boolean, multiSamples: number): InternalRenderTarget {
        return this._native.createRenderTargetInternal(width, height, colorFormat, depthStencilFormat ? depthStencilFormat : RenderTargetFormat.None, generateMipmap, sRGB, multiSamples);
    }

    createRenderTargetCubeInternal(size: number, colorFormat: RenderTargetFormat, depthStencilFormat: RenderTargetFormat, generateMipmap: boolean, sRGB: boolean, multiSamples: number): InternalRenderTarget {
        return this._native.createRenderTargetCubeInternal(size, colorFormat, depthStencilFormat, generateMipmap, sRGB, multiSamples);
    }
    createRenderTextureCubeInternal(dimension: TextureDimension, size: number, format: RenderTargetFormat, generateMipmap: boolean, sRGB: boolean): InternalTexture {
        throw new Error("createRenderTextureCubeInternal Method not implemented.");
    }
    // todo  color 0, 1, 2, 3 ?
    setupRendertargetTextureAttachment(renderTarget: InternalRenderTarget, texture: InternalTexture) {
        this._native.setupRendertargetTextureAttachment(renderTarget, texture);
    }

    // todo 不同 格式
    readRenderTargetPixelData(renderTarget: InternalRenderTarget, xOffset: number, yOffset: number, width: number, height: number, out: ArrayBufferView): ArrayBufferView {
        return this._native.readRenderTargetPixelData(renderTarget, xOffset, yOffset, width, height, out);
    }

    updateVideoTexture(texture: InternalTexture, video: HTMLVideoElement, premultiplyAlpha: boolean, invertY: boolean): void {
        this._native.updateVideoTexture(texture, (video as any)._nativeObj.conchImgId, premultiplyAlpha, invertY);
    }

    getRenderTextureData(internalTex: InternalRenderTarget, x: number, y: number, width: number, height: number): ArrayBufferView {
        return this._native.getRenderTextureData(internalTex, x, y, width, height);
    }
}