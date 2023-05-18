
import { Stat } from "../utils/Stat";
import { AnimatorControllerLayer2D } from "./AnimatorControllerLayer2D";
import { AnimatorPlayState2D } from "./AnimatorPlayState2D";
import { AnimatorState2D } from "./AnimatorState2D";
import { Component } from "./Component";
import { KeyframeNode2D } from "./KeyframeNode2D";
import { Node } from "../../laya/display/Node";
import { ClassUtils } from "../utils/ClassUtils";
import { Animation2DParm } from "./Animation2DParm";
import { AnimatorController2D } from "./AnimatorController2D";
import { AniParmType } from "./AnimatorControllerParse";
import { AnimatorTransition2D } from "./AnimatorTransition2D";
import { Animation2DEvent } from "./Animation2DEvent";
import { AnimatorUpdateMode } from "./AnimatorUpdateMode";

/**
 * <code>Animator2D<code/>2D动画组件
 */
export class Animator2D extends Component {
    /**@internal */
    private _speed = 1;
    /**@internal 更新模式*/
    private _updateMode = AnimatorUpdateMode.Normal;
    /**@internal 降低更新频率调整值*/
    private _lowUpdateDelty = 20;
    /**@internal */
    private _isPlaying = true;
    /**@internal */
    private _ownerMap: Map<KeyframeNode2D, { ower: Node, pro?: { ower: any, key: string, defVal: any } }>
    /**@internal */
    _parameters: Record<string, Animation2DParm>;
    /**@internal */
    _controllerLayers: AnimatorControllerLayer2D[];
    /**@internal */
    _controller: AnimatorController2D;
    /**@internal */
    _checkEnterIndex: number[];

    /**
     * 实例化2D动画组件
     */
    constructor() {
        super();
        this._controllerLayers = [];
        this._parameters = {};
    }

    /**
     * 2D动画控制器
     */
    set controller(val: AnimatorController2D) {
        this._controller = val;
        if (val) {
            val.updateTo(this);
        }
    }

    get controller() {
        return this._controller;
    }

    /**
     * 动画参数
     */
    set parameters(val: Record<string, Animation2DParm>) {
        this._parameters = val;
    }

    get parameters() {
        return this._parameters;
    }

    /**
     * 播放速度
     */
    set speed(num: number) {
        this._speed = num;
    }

    get speed() {
        return this._speed;
    }

    /**
     * 是否正在播放中
     */
    get isPlaying() {
        return this._isPlaying;
    }

    /**
     * @internal
     * @param animatorState 
     * @param playState 
     */
    private _updateStateFinish(animatorState: AnimatorState2D, playState: AnimatorPlayState2D): void {
        if (playState._finish) {
            animatorState._eventExit();//派发播放完成的事件
        }
    }

    /**
     * 赋值Node数据
     * @param stateInfo 动画状态
     * @param additive 是否为addtive
     * @param weight state权重
     * @param isFirstLayer 是否是第一层
     */
    private _setClipDatasToNode(stateInfo: AnimatorState2D, additive: boolean, weight: number, isFirstLayer: boolean, controllerLayer: AnimatorControllerLayer2D = null): void {
        var realtimeDatas = stateInfo._realtimeDatas;
        var nodes = stateInfo._clip!._nodes!;
        for (var i = 0, n = nodes.count; i < n; i++) {
            if (null == realtimeDatas[i]) continue;
            var node = nodes.getNodeByIndex(i);
            var o = this.getOwner(node);
            o && this._applyFloat(o, additive, weight, isFirstLayer, realtimeDatas[i]);
        }
    }

    /**
     * @internal
     * @param o 
     * @param additive 
     * @param weight 
     * @param isFirstLayer 
     * @param data 
     */
    private _applyFloat(o: { ower: Node, pro?: { ower: any, key: string, defVal: any } }, additive: boolean, weight: number, isFirstLayer: boolean, data: string | number | boolean): void {
        var pro = o.pro;
        if (pro && pro.ower) {
            if (additive && "number" == typeof data) {
                pro.ower[pro.key] = pro.defVal + weight * data;
            } else if ("number" == typeof data) {
                pro.ower[pro.key] = weight * data;
            } else {
                pro.ower[pro.key] = data;
            }
        }
    }

    /**
     * @internal
     * @param node 
     * @returns 
     */
    private getOwner(node: KeyframeNode2D) {
        var ret: { ower: Node, pro?: { ower: any, key: string, defVal: any } };
        if (this._ownerMap) {
            ret = this._ownerMap.get(node);
            if (ret) {
                return ret;
            }
        }

        var property = this.owner;
        for (var j = 0, m = node.ownerPathCount; j < m; j++) {
            var ownPat = node.getOwnerPathByIndex(j);
            if ("" == ownPat) {
                continue;
            } else {
                property = property.getChildByName(ownPat);
                if (!property)
                    break;
            }
        }

        ret = { ower: property };

        if (property) {
            var pobj: any = property;
            var propertyCount = node.propertyCount;

            if (1 == propertyCount) {
                var pname = node.getPropertyByIndex(0);
                ret.pro = { ower: property, key: pname, defVal: (property as any)[pname] };
            } else {
                for (var i = 0; i < propertyCount; i++) {
                    var pname = node.getPropertyByIndex(i);

                    if (i == propertyCount - 1 || null == pobj) {
                        ret.pro = { ower: pobj, key: pname, defVal: pobj ? pobj[pname] : null }
                        break;
                    }

                    if (null == pobj[pname] && property == pobj) {
                        //有可能是组件,查找组件逻辑
                        pobj = null;
                        var classObj = ClassUtils.getClass(pname);
                        if (classObj) {
                            pobj = property.getComponent(classObj);
                        }

                    } else {
                        pobj = pobj[pname];
                    }
                }
            }

        }
        if (null == this._ownerMap) {
            this._ownerMap = new Map();
        }
        this._ownerMap.set(node, ret);
        return ret;


    }

    /**
     * 更新clip数据
     * @internal
     */
    private _updateClipDatas(animatorState: AnimatorState2D, addtive: boolean, playStateInfo: AnimatorPlayState2D): void {
        var clip = animatorState._clip;
        var clipDuration = clip!._duration;

        var curPlayTime = animatorState.clipStart * clipDuration + playStateInfo._normalizedPlayTime * playStateInfo._duration;
        var currentFrameIndices = animatorState._currentFrameIndices;
        //var frontPlay = playStateInfo._frontPlay;
        let frontPlay = true;
        clip!._evaluateClipDatasRealTime(curPlayTime, currentFrameIndices, addtive, frontPlay, animatorState._realtimeDatas);
    }

    /**
     * @internal
     * @param animatorState 
     * @param playState 
     * @param elapsedTime 
     * @param loop 
     * @param layerIndex 
     * @returns 
     */
    private _updatePlayer(animatorState: AnimatorState2D, playState: AnimatorPlayState2D, elapsedTime: number, loop: number, layerIndex: number): void {

        let isReplay = false;
        var clipDuration = animatorState._clip!._duration * (animatorState.clipEnd - animatorState.clipStart);

        var lastElapsedTime = playState._elapsedTime;

        let pAllTime = playState._playAllTime;

        playState._playAllTime += Math.abs(elapsedTime);

        //动画播放总时间
        elapsedTime = lastElapsedTime + elapsedTime;
        //动画播放的上次总时间
        playState._lastElapsedTime = lastElapsedTime;
        playState._elapsedTime = elapsedTime;
        var normalizedTime = elapsedTime / clipDuration;

        let scale = 1;
        if (animatorState.yoyo) {
            scale = 2;
        }

        //总播放次数
        let pTime = playState._playAllTime / (clipDuration * scale);

        if (Math.floor(pAllTime / (clipDuration * scale)) < Math.floor(pTime)) {
            isReplay = true;
        }

        var playTime = normalizedTime % 1.0;
        let normalizedPlayTime = playTime < 0 ? playTime + 1.0 : playTime;
        playState._normalizedPlayTime = normalizedPlayTime;
        playState._duration = clipDuration;

        if (1 != scale) {
            normalizedTime = playState._playAllTime / (clipDuration * scale);
            playTime = normalizedTime % 1.0;
            normalizedPlayTime = playTime < 0 ? playTime + 1.0 : playTime;

            if (animatorState.yoyo) {
                if (0.5 > normalizedPlayTime) {
                    if (!playState._frontPlay) {
                        if (0 > animatorState.speed) {
                            playState._elapsedTime = animatorState.clipEnd * pAllTime;
                            playState._normalizedPlayTime = animatorState.clipEnd;
                        } else {
                            playState._elapsedTime = animatorState.clipStart * pAllTime;
                            playState._normalizedPlayTime = animatorState.clipStart;
                        }
                        playState._frontPlay = true;
                    }
                } else {
                    if (playState._frontPlay) {
                        playState._frontPlay = false;
                        if (0 > animatorState.speed) {
                            playState._elapsedTime = animatorState.clipStart * pAllTime;
                            playState._normalizedPlayTime = animatorState.clipStart;
                        } else {
                            playState._elapsedTime = animatorState.clipEnd * pAllTime;
                            playState._normalizedPlayTime = animatorState.clipEnd;
                        }
                    }
                }
            }
        }

        animatorState._eventStateUpdate(normalizedPlayTime);
        let ret = this._applyTransition(layerIndex, animatorState._eventtransition(normalizedPlayTime, this.parameters, isReplay));

        if (!ret && isReplay) {
            let absTime = playState._playAllTime / (clipDuration * scale);
            if (0 < loop && loop <= absTime) {
                playState._finish = true;

                if (0 > animatorState.speed) {
                    if (animatorState.yoyo) {
                        playState._elapsedTime = animatorState.clipEnd * pAllTime;
                        playState._normalizedPlayTime = animatorState.clipEnd;
                    } else {
                        playState._elapsedTime = animatorState.clipStart * pAllTime;
                        playState._normalizedPlayTime = animatorState.clipStart;
                    }
                } else {
                    if (animatorState.yoyo) {
                        playState._elapsedTime = animatorState.clipStart * pAllTime;
                        playState._normalizedPlayTime = animatorState.clipStart;
                    } else {
                        playState._elapsedTime = animatorState.clipEnd * pAllTime;
                        playState._normalizedPlayTime = animatorState.clipEnd;
                    }
                }
                return;
            }
        }
    }

    /**
     * @internal
     * @param stateInfo 
     * @param playStateInfo 
     */
    private _updateEventScript(stateInfo: AnimatorState2D, playStateInfo: AnimatorPlayState2D): void {
        let clip = stateInfo._clip;
        let events = clip!._animationEvents;
        if (!events || 0 == events.length) return;
        let clipDuration = clip!._duration;
        let time = playStateInfo._normalizedPlayTime * clipDuration;
        let frontPlay = playStateInfo._frontPlay;
        let parentPlayTime = playStateInfo._parentPlayTime;
        if (null == parentPlayTime) {
            if (frontPlay) {
                parentPlayTime = clipDuration * playStateInfo.animatorState.clipStart;
            } else {
                parentPlayTime = clipDuration * playStateInfo.animatorState.clipEnd;
            }
        }
        if (frontPlay) {
            if (time < parentPlayTime) {
                this._eventScript(events, parentPlayTime, clipDuration * playStateInfo.animatorState.clipEnd, frontPlay);
                parentPlayTime = clipDuration * playStateInfo.animatorState.clipStart;
            }
        } else {
            if (time > parentPlayTime) {
                this._eventScript(events, parentPlayTime, clipDuration * playStateInfo.animatorState.clipStart, frontPlay);
                parentPlayTime = clipDuration * playStateInfo.animatorState.clipEnd;
            }
        }


        this._eventScript(events, parentPlayTime, time, frontPlay);
        playStateInfo._parentPlayTime = time;
    }
    /**
    * @internal
    */
    private _eventScript(events: Animation2DEvent[], parentPlayTime: number, currPlayTime: number, frontPlay: boolean) {
        let scripts = this.owner.components;
        if (frontPlay) {
            for (let i = 0, len = events.length; i < len; i++) {
                let e = events[i];
                if (e.time > parentPlayTime && e.time <= currPlayTime) {
                    for (let j = 0, m = scripts.length; j < m; j++) {
                        let script = scripts[j];
                        if (script._isScript()) {
                            let fun: Function = (script as any)[e.eventName];
                            (fun) && (fun.apply(script, e.params));
                        }
                    }
                } else if (e.time > currPlayTime) {
                    break;
                }
            }
        } else {
            for (let i = events.length - 1; i >= 0; i--) {
                let e = events[i];
                if (e.time < parentPlayTime && e.time >= currPlayTime) {
                    for (let j = 0, m = scripts.length; j < m; j++) {
                        let script = scripts[j];
                        if (script._isScript()) {
                            let fun: Function = (script as any)[e.eventName];
                            (fun) && (fun.apply(script, e.params));
                        }
                    }
                } else if (e.time < currPlayTime) {
                    break;
                }
            }
        }
    }

    /**
     * @internal
     */
    // private _eventScript(events: Animation2DEvent[], eventIndex: number, endTime: number, front: boolean, startTime = 0): number {
    //     let scripts = this.owner.components;
    //     if (front) {
    //         for (let n = events.length; eventIndex < n; eventIndex++) {
    //             let event = events[eventIndex];
    //             if (event.time <= endTime) {
    //                 if (event.time >= startTime) {
    //                     for (let j = 0, m = scripts.length; j < m; j++) {
    //                         let script = scripts[j];
    //                         if (script._isScript()) {
    //                             let fun: Function = (script as any)[event.eventName];
    //                             (fun) && (fun.apply(script, event.params));
    //                         }
    //                     }
    //                 }
    //             } else {
    //                 break;
    //             }
    //         }
    //     } else {
    //         for (; eventIndex >= 0; eventIndex--) {
    //             let event = events[eventIndex];
    //             if (event.time >= endTime) {
    //                 for (let j = 0, m = scripts.length; j < m; j++) {
    //                     let script = scripts[j];
    //                     if (script._isScript()) {
    //                         let fun = (script as any)[event.eventName];
    //                         (fun) && (fun.apply(script, event.params));
    //                     }
    //                 }
    //             } else {
    //                 break;
    //             }
    //         }
    //     }
    //     return eventIndex;
    // }

    /**
     * 启用过渡
     * @param layerindex 
     * @param transition 
     * @returns 
     */
    private _applyTransition(layerindex: number, transition: AnimatorTransition2D) {
        if (!transition)
            return false;
        return this.crossFade(transition.destState.name, transition.transduration, layerindex, transition.transstartoffset);
    }

    /**
     * @internal
     * @param delta 
     * @returns 
     */
    private _applyUpdateMode(delta: number): number {
        let ret;
        switch (this._updateMode) {
            case AnimatorUpdateMode.Normal:
                ret = delta;
                break;
            case AnimatorUpdateMode.LowFrame:
                ret = (Stat.loopCount % this._lowUpdateDelty == 0) ? delta * this._lowUpdateDelty : 0;
                break;
            case AnimatorUpdateMode.UnScaleTime:
                ret = 0;
                break;
        }
        return ret;
    }

    /**
     * 播放动画
     * @param name 动画名称
     * @param layerIndex 层索引
     * @param normalizedTime 归一化时间
     * @returns 
     */
    play(name?: string, layerIndex = 0, normalizedTime: number = Number.NEGATIVE_INFINITY) {
        if (this._checkEnterIndex) {
            let i = this._checkEnterIndex.indexOf(layerIndex);
            if (0 <= i) {
                this._checkEnterIndex.splice(i, 1);
            }
        }
        this._isPlaying = true;
        var controllerLayer = this._controllerLayers[layerIndex];
        if (controllerLayer) {
            var defaultState = controllerLayer.defaultState;
            if (!name && !defaultState)
                throw new Error("Animator:must have default clip value,please set clip property.");

            var playStateInfo = controllerLayer._playStateInfo!;
            var curPlayState = playStateInfo._currentState!;
            var animatorState = name ? controllerLayer.getStateByName(name) : defaultState;

            if (!animatorState._clip)
                return;

            var clipDuration = animatorState._clip!._duration;
            var calclipduration = animatorState._clip!._duration * (animatorState.clipEnd - animatorState.clipStart);

            // this.resetDefOwerVal();
            // playStateInfo._resetPlayState(0.0, calclipduration);
            // if (curPlayState != animatorState) {
            //     playStateInfo._currentState = animatorState;
            // }
            // controllerLayer._playType = 0;、

            if (curPlayState !== animatorState) {
                if (normalizedTime !== Number.NEGATIVE_INFINITY)
                    playStateInfo._resetPlayState(clipDuration * normalizedTime, calclipduration);
                else
                    playStateInfo._resetPlayState(0.0, calclipduration);
                (curPlayState !== null && curPlayState !== animatorState);
                controllerLayer._playType = 0;
                playStateInfo._currentState = animatorState;
            } else {
                if (normalizedTime !== Number.NEGATIVE_INFINITY) {
                    playStateInfo._resetPlayState(clipDuration * normalizedTime, calclipduration);
                    controllerLayer._playType = 0;
                }
            }
            animatorState._eventStart();
        }
        var scripts = animatorState._scripts!;
        if (scripts) {
            for (var i = 0, n = scripts.length; i < n; i++)
                scripts[i].onStateEnter();
        }
    }

    /**
     * 停止播放动画
     */
    stop() {
        this._isPlaying = false;
    }

    /**
     * 帧循环
     * @returns 
     */
    onUpdate(): void {
        if (!this._isPlaying) return;

        if (this._checkEnterIndex) {
            for (let i = this._checkEnterIndex.length - 1; i >= 0; i--) {
                let index = this._checkEnterIndex[i];
                let enterTransition = this._controllerLayers[index]._enterTransition;
                if (enterTransition.check(0, this.parameters, true)) {
                    var defaultClip = this.getDefaultState(index);
                    this.play(null, index, defaultClip.cycleOffset);
                }
            }
        }


        var delta = this.owner.timer._delta / 1000.0;
        delta = this._applyUpdateMode(delta);
        if (0 == this.speed || 0 == delta) return;
        var needRender = true;//TODO:有渲染节点才可将needRender变为true

        for (var i = 0, n = this._controllerLayers.length; i < n; i++) {
            var controllerLayer = this._controllerLayers[i];
            if (!controllerLayer.enable)
                continue;


            var playStateInfo = controllerLayer._playStateInfo!;
            //var crossPlayStateInfo = controllerLayer._crossPlayStateInfo!;
            var addtive = controllerLayer.blendingMode != AnimatorControllerLayer2D.BLENDINGMODE_OVERRIDE;
            switch (controllerLayer._playType) {
                case 0:
                    var animatorState = playStateInfo._currentState!;
                    var speed = this._speed * animatorState.speed;
                    var finish = playStateInfo._finish;

                    var loop = animatorState.loop;
                    if (-1 >= loop) {
                        var clip = animatorState._clip!;
                        if (clip.islooping) {
                            loop = 0;
                        } else {
                            loop = 1;
                        }
                    }

                    let dir = 1;
                    if (!playStateInfo._frontPlay) {
                        dir = -1;
                    }


                    finish || this._updatePlayer(animatorState, playStateInfo, delta * speed * dir, loop, i);
                    if (needRender) {
                        this._updateClipDatas(animatorState, addtive, playStateInfo);
                        if (!finish) {
                            this._setClipDatasToNode(animatorState, addtive, controllerLayer.defaultWeight, i == 0, controllerLayer);
                            this._updateEventScript(animatorState, playStateInfo);
                        }
                    }
                    finish || this._updateStateFinish(animatorState, playStateInfo);
                    break;
            }
        }
    }

    /**
     * 添加控制器层。
     */
    addControllerLayer(controllderLayer: AnimatorControllerLayer2D): void {
        this._controllerLayers.push(controllderLayer);
    }

    /**
     * 在当前动画状态和目标动画状态之间进行融合过渡播放。
     * @param	name 目标动画状态。
     * @param	transitionDuration 过渡时间,该值为当前动画状态的归一化时间，值在0.0~1.0之间。
     * @param	layerIndex 层索引。
     * @param	normalizedTime 归一化的播放起始时间。
     */
    crossFade(name: string, transitionDuration: number, layerIndex: number = 0, normalizedTime: number = Number.NEGATIVE_INFINITY) {
        var controllerLayer = this._controllerLayers[layerIndex];
        if (controllerLayer) {
            var destAnimatorState = controllerLayer.getStateByName(name);
            if (destAnimatorState) {

                this.play(name, layerIndex, normalizedTime);
                return true;

            }
            else {
                console.warn("Invalid layerIndex " + layerIndex + ".");
            }
        }
        return false;
    }

    /**
     * @internal
     * @returns 
     */
    onAfterDeserialize(): void {
        let arr = (<any>this).controllerLayers;
        if (!arr || null != this.controller)
            return;
        delete (<any>this).controllerLayers;
        this._controllerLayers.length = 0;
        for (let layer of arr) {
            this.addControllerLayer(layer);
        }
    }

    /**
     * @internal
     */
    onEnable() {
        if (this._checkEnterIndex) this._checkEnterIndex.length = 0;
        else this._checkEnterIndex = [];

        if (this._isPlaying) {
            for (var i = 0, n = this._controllerLayers.length; i < n; i++) {
                if (this._controllerLayers[i].playOnWake) {
                    var defaultClip = this.getDefaultState(i);
                    //(defaultClip) && (this.play(null, i, defaultClip.cycleOffset));
                    if (defaultClip) {
                        let enterTransition = this._controllerLayers[i]._enterTransition;
                        if (enterTransition) {
                            this._isPlaying = true;
                            if (enterTransition.check(0, this.parameters, true)) {
                                this.play(null, i, defaultClip.cycleOffset);
                            } else {
                                this._checkEnterIndex.push(i);
                            }
                        } else {
                            this.play(null, i, defaultClip.cycleOffset);
                        }
                    }
                }
            }
        }
    }

    /**
     * 默认状态机
     * @param layerIndex 
     * @returns 
     */
    getDefaultState(layerIndex = 0) {
        var controllerLayer = this._controllerLayers[layerIndex];
        return controllerLayer.defaultState;
    }

    /**
     * 设置参数Trigger值
     * @param name 名字
     */
    setParamsTrigger(name: string) {
        this._parameters[name] = { name: name, type: AniParmType.Trigger, value: true };
    }

    /**
     * 设置参数Number值
     * @param name 名字
     * @param value 值
     */
    setParamsNumber(name: string, value: number) {
        this._parameters[name] = { name: name, type: AniParmType.Float, value: value };
    }

    /**
     * 设置参数Bool值
     * @param name 名字
     * @param value 值
     */
    setParamsBool(name: string, value: boolean) {
        this._parameters[name] = { name: name, type: AniParmType.Float, value: value };
    }

    /**
     * 得到参数值
     * @param name 名字
     * @returns 
     */
    getParamsvalue(name: number) {
        let parm = this._parameters[name];
        if (parm) {
            return parm.value;
        }
        return null;
    }

    /**
     * @internal
     */
    onDestroy() {
        for (var i = 0, n = this._controllerLayers.length; i < n; i++)
            this._controllerLayers[i].destroy();
        this._controllerLayers.length = 0;
        this._isPlaying = false;
        this._parameters = null;
    }
}