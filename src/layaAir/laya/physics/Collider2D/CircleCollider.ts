import { ColliderBase } from "./ColliderBase";
import { Physics2D } from "../Physics2D";
import { PhysicsShape } from "./ColliderStructInfo";

/**
 * 2D圆形碰撞体
 */
export class CircleCollider extends ColliderBase {

    /**圆形半径，必须为正数*/
    private _radius: number = 50;

    constructor() {
        super();
        this._physicShape = PhysicsShape.CircleShape;
    }

    /**
    * @override
    */
    protected _setShapeData(shape: any): void {
        var scale: number = Math.max(Math.abs(this.scaleX), Math.abs(this.scaleY));
        let radius = this.radius;
        Physics2D.I._factory.set_CircleShape_radius(shape, radius, scale);
        Physics2D.I._factory.set_CircleShape_pos(shape, this.pivotoffx + radius, this.pivotoffy + radius, scale);
    }

    /**圆形半径，必须为正数*/
    get radius(): number {
        return this._radius;
    }

    set radius(value: number) {
        if (value <= 0) throw "CircleCollider radius cannot be less than 0";
        if (this._radius == value) return;
        this._radius = value;
        this._needupdataShapeAttribute();
    }


}