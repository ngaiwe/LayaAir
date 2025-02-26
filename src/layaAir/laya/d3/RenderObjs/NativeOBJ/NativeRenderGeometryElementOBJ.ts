import { DrawType } from "../../../RenderEngine/RenderEnum/DrawType";
import { IndexFormat } from "../../../RenderEngine/RenderEnum/IndexFormat";
import { MeshTopology } from "../../../RenderEngine/RenderEnum/RenderPologyMode";
import { IRenderGeometryElement } from "../../../RenderEngine/RenderInterface/RenderPipelineInterface/IRenderGeometryElement";
import { SingletonList } from "../../../utils/SingletonList";
import { BufferState } from "../../../webgl/utils/BufferState";



export class NativeRenderGeometryElementOBJ implements IRenderGeometryElement {
  /**@internal */
  private _bufferState: BufferState;

   /**@internal */
   drawParams: SingletonList<number>;
   
  _nativeObj: any;

  /**@internal */
  constructor(mode: MeshTopology, drawType: DrawType) {
    this._nativeObj = new (window as any).conchRenderGeometryElement(mode, drawType);
    this.drawParams = new SingletonList();
  }

  /**@internal */
  setDrawArrayParams(first: number, count: number): void {
    this.drawParams.add(first);
    this.drawParams.add(count);
    this._nativeObj.setDrawArrayParams(first, count);
  }

  /**@internal */
  setDrawElemenParams(count: number, offset: number): void {
    this.drawParams.add(offset);
    this.drawParams.add(count);
    this._nativeObj.setDrawElemenParams(count, offset);
  }
  
  /**@internal */
  destroy(): void {
    this._nativeObj.destroy();
  }

  clearRenderParams() {
    this.drawParams.length = 0;
    this._nativeObj.clearRenderParams();
  }

  set bufferState(value: BufferState) {
    this._bufferState = value;
    if (value) {
      this._nativeObj.bufferState = (value as any)._nativeVertexArrayObject._nativeObj;
    }
    else {
      this._nativeObj.bufferState = null;
    }
  }

  get bufferState(): BufferState {
    return this._bufferState;
  }

  set mode(value: MeshTopology) {
    this._nativeObj.mode = value;
  }

  get mode(): MeshTopology {
    return this._nativeObj.mode;
  }

  set drawType(value: DrawType) {
    this._nativeObj.drawType = value;
  }

  get drawType(): DrawType {
    return this._nativeObj.drawType;
  }

  set instanceCount(value: number) {
    this._nativeObj.instanceCount = value;
  }

  get instanceCount(): number {
    return this._nativeObj.instanceCount;
  }

  set indexFormat(value: IndexFormat) {
    this._nativeObj.indexFormat = value;
  }

  get indexFormat(): IndexFormat {
    return this._nativeObj.indexFormat;
  }
}