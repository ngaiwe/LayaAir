
import { Bounds } from "../d3/math/Bounds";
import { Vector3 } from "../maths/Vector3";
import { TextResource } from "../resource/TextResource";
import { Byte } from "../utils/Byte";
import { NavigationUtils } from "./NavigationUtils";


/**
 * @en Read NavTileCache data from buffer.
 * @param byte The byte buffer to read from.
 * @param navData The NavTileData object to store the read data.
 * @zh 从 buffer 读取 NavTileCache 数据。
 * @param byte 要读取的字节缓冲区。
 * @param navData 用于存储读取数据的 NavTileData 对象。
 */
const readNavTileCache = function (byte: Byte, navData: NavTileData) {
    navData._dirtyFlag = byte.getFloat32();
    const min: Vector3 = navData._boundBox.min;
    min.x = byte.getFloat32();
    min.y = byte.getFloat32();
    min.z = byte.getFloat32();
    const max: Vector3 = navData._boundBox.max;
    max.x = byte.getFloat32();
    max.y = byte.getFloat32();
    max.z = byte.getFloat32();
    let navCount: number = byte.readUint16();
    for (var i = 0; i < navCount; i++) {
        let nav = navData._oriTiles[i] = new NavTileCache();
        const bound = nav._bound;
        const min = bound.min;
        min.x = byte.getFloat32();
        min.y = byte.getFloat32();
        min.z = byte.getFloat32();
        const max = bound.max
        max.x = byte.getFloat32();
        max.y = byte.getFloat32();
        max.z = byte.getFloat32();

        nav.x = byte.readUint16();
        nav.y = byte.readUint16();
        let vertStart = byte.readUint32();
        let vertCount = byte.readUint32();
        let indexStart = byte.readUint32();
        let indexCount = byte.readUint32();
        let flagStart = byte.readUint32();
        let flagCount = byte.readUint32();
        byte.pos = vertStart;
        nav.triVertex = new Float32Array(byte.readArrayBuffer(vertCount));
        byte.pos = indexStart;
        nav.triIndex = new Uint32Array(byte.readArrayBuffer(indexCount))
        byte.pos = flagStart;
        nav.triFlag = new Uint8Array(byte.readArrayBuffer(flagCount));
    }
}

/**
 * @en The class NavTileCache is used to cache and manage the tile data of the navigation mesh.
 * @zh 类 NavTileCache 用于缓存和管理导航网格的瓦片数据。
 */
export class NavTileCache {
    /**
     * @internal
     */
    _bindData: any;
    /**
     * @internal
     */
    _triVertex: Float32Array;
    /**
     * @internal
     */
    _triIndex: Uint32Array;
    /**
     * @internal
     */
    _triFlag: Uint8Array;

    /** @internal tile bounds */
    _bound: Bounds;
    /**
     * @en The x offset of the tile.
     * @zh 瓦片的x偏移。
     */
    x: number;
    /**
     * @en The y offset of the tile.
     * @zh 瓦片的y偏移。
     */
    y: number;


    /**
     * @en Create a new instance of NavTileCache.
     * @zh 创建 NavTileCache 类的新实例。
     */
    constructor() {
        this._bindData = NavigationUtils.createdtNavTileData();
        this._bound = new Bounds(new Vector3(), new Vector3());
        this.x = this.y = 0;
    }

    /**
     * @en Triangle vertices
     * @zh 三角形顶点
     */
    set triVertex(data: Float32Array) {
        this._triVertex = data;
        this._bindData.setTriVertex(data);
    }

    get triVertex(): Float32Array {
        return this._triVertex;
    }

    /**
     * @en Triangle indices
     * @zh 三角形索引
     */
    set triIndex(data: Uint32Array) {
        this._triIndex = data;
        this._bindData.setTriIndex(data);
    }

    get triIndex(): Uint32Array {
        return this._triIndex;
    }

    /**
     * @en Triangle flags
     * @zh 三角形标记
     */
    set triFlag(data: Uint8Array) {
        this._triFlag = data;
        this._bindData.setTriFlag(data);
    }

    get triFlag(): Uint8Array {
        return this._triFlag;
    }


    /**
     * @en Bounding box
     * @zh 包围盒大小
     */
    get bound(): Bounds {
        return this._bound;
    }

    /**
     * @en Bound data
     * @zh 绑定数据
     */
    get bindData(): any {
        return this._bindData;
    }

    /**
     * @en Destroy the NavTileCache
     * @zh 销毁 NavTileCache
     */
    destroy(): void {
        if (this._bindData) {
            NavigationUtils.free(this._bindData);
            this._bindData = null;
        }
    }

}

/**
 * @en NavTileData class for parsing and storing navigation mesh data
 * @zh NavTileData 类用于解析和存储导航网格数据
 */
export class NavTileData {
    /**@internal load*/
    _dirtyFlag: number = 0;
    /**@internal load*/
    _oriTiles: Array<NavTileCache>;
    /**@internal load*/
    _res: TextResource;
    /**@internal load*/
    _boundBox: Bounds;
    /**
     * @en Create a new instance of NavTileData.
     * @param res TextResource containing navigation data
     * @zh 创建 NavTileData 类的新实例。
     * @param res 包含导航数据的 TextResource
     */
    constructor(res: TextResource) {
        this._boundBox = new Bounds(new Vector3(), new Vector3());
        this._res = res;
        this._oriTiles = [];
        this._parse();
    }
    /**@internal load*/
    _parse() {
        var readData: Byte = new Byte(this._res.data);
        readData.pos = 0;
        var version: string = readData.readUTFString();
        switch (version) {
            case "LAYANAV:0101":
                readNavTileCache(readData, this);
                break;
        }
    }

    /**
     * @en Get the dirty flag
     * @zh 获取脏标记
     */
    get dirtyFlag(): number {
        return this._dirtyFlag;
    }
    /**
     * @en Get NavTileCache data by index
     * @param index The index of the NavTileCache
     * @zh 通过索引获取 NavTileCache 数据
     * @param index NavTileCache 的索引
     */
    public getNavData(index: number): NavTileCache {
        return this._oriTiles[index];
    }

    /**
     * @en Get the number of NavTileCache objects
     * @zh 获取 NavTileCache 对象的数量
     */
    public get length(): number {
        return this._oriTiles.length;
    }
}