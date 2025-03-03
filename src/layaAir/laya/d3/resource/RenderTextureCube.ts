import { LayaGL } from "../../layagl/LayaGL";
import { RenderTargetFormat } from "../../RenderEngine/RenderEnum/RenderTargetFormat";
import { TextureDimension } from "../../RenderEngine/RenderEnum/TextureDimension";
import { RenderTexture } from "../../resource/RenderTexture";

/**
 * <code>SpotLight</code> 类用于创建RenderTextureCube。
 */
export class RenderTextureCube extends RenderTexture {

    faceIndex: number;

    /**
     * 实例化一个RendertextureCube
     * @param size 像素
     * @param colorFormat 颜色格式
     * @param depthFormat 深度格式
     * @param generateMipmap 是否生成mipmap
     * @param multiSamples 
     */
    constructor(size: number, colorFormat: RenderTargetFormat, depthFormat: RenderTargetFormat, generateMipmap: boolean, multiSamples: number) {
        super(size, size, colorFormat, depthFormat, generateMipmap, multiSamples);
        this.faceIndex = 0;
    }

    /**
     * @internal
     */
    _createRenderTarget(): void {
        this._dimension = TextureDimension.Cube;
        this._renderTarget = LayaGL.textureContext.createRenderTargetCubeInternal(this.width, <RenderTargetFormat><any>this._format, this._depthStencilFormat, this._generateMipmap, this._gammaSpace, this._multiSamples);

        this._texture = this._renderTarget._textures[0];
    }

    _start() {
        RenderTexture._configInstance.invertY = this._isCameraTarget;
        if (RenderTexture._currentActive != this) {
            RenderTexture._currentActive && RenderTexture._currentActive._end();
            RenderTexture._currentActive = this;
            LayaGL.textureContext.bindRenderTarget(this._renderTarget, this.faceIndex);
        }
    }

}