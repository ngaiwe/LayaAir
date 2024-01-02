// import { TypeExtendsData } from "./types/BlueprintTypes";

import { TBPDeclaration } from "./types/BlueprintDeclaration";

// export const extendsData: TypeExtendsData = {
//     Node: {
//         /**
//         * 组件被激活后执行，此时所有节点和组件均已创建完毕，次方法只执行一次
//         * 此方法为虚方法，使用时重写覆盖即可
//         */
//         onAwake: {},
//         /**
//          * 组件被启用后执行，比如节点被添加到舞台后
//          * 此方法为虚方法，使用时重写覆盖即可
//          */
//         onEnable: {},
//         /**
//          * 组件被禁用时执行，比如从节点从舞台移除后
//          * 此方法为虚方法，使用时重写覆盖即可
//          */
//         onDisable: {},
//         /**
//          * 反序列化后会调用
//          */
//         onAfterDeserialize: {}
//     },
//     Sprite: {
//         extends: "Node",
//     },
//     Sprite3D: {
//         extends: "Node",
//     }
// }

/**
 * 开发者自定义相关
 */
export const customData : Record<string , TBPDeclaration> = {
}

export const extendsData: Record<string, TBPDeclaration> = {
    "Script": {
        "module": "Laya",
        "name": "Script",
        "extends": [
            "Component"
        ],
        "props": [],
        "funcs": [
            {
                "name": "onTriggerEnter",
                "type": "event",
                "modifiers": {
                    "isPublic": true
                },
                "params": [
                    {
                        "name": "other",
                        "type": "PhysicsColliderComponent|ColliderBase"
                    },
                    {
                        "name": "self",
                        "type": "ColliderBase",
                        "optional": true
                    },
                    {
                        "name": "contact",
                        "type": "any",
                        "optional": true
                    }
                ],
                "returnType": "void"
            },
            {
                "name": "onTriggerStay",
                "type": "event",
                "modifiers": {
                    "isPublic": true
                },
                "params": [
                    {
                        "name": "other",
                        "type": "PhysicsColliderComponent|ColliderBase"
                    },
                    {
                        "name": "self",
                        "type": "ColliderBase",
                        "optional": true
                    },
                    {
                        "name": "contact",
                        "type": "any",
                        "optional": true
                    }
                ],
                "returnType": "void"
            },
            {
                "name": "onTriggerExit",
                "type": "event",
                "modifiers": {
                    "isPublic": true
                },
                "params": [
                    {
                        "name": "other",
                        "type": "PhysicsColliderComponent|ColliderBase"
                    },
                    {
                        "name": "self",
                        "type": "ColliderBase",
                        "optional": true
                    },
                    {
                        "name": "contact",
                        "type": "any",
                        "optional": true
                    }
                ],
                "returnType": "void"
            },
            {
                "name": "onCollisionEnter",
                "type": "event",
                "modifiers": {
                    "isPublic": true
                },
                "params": [
                    {
                        "name": "collision",
                        "type": "Collision"
                    }
                ],
                "returnType": "void"
            },
            {
                "name": "onCollisionStay",
                "type": "event",
                "modifiers": {
                    "isPublic": true
                },
                "params": [
                    {
                        "name": "collision",
                        "type": "Collision"
                    }
                ],
                "returnType": "void"
            },
            {
                "name": "onCollisionExit",
                "type": "event",
                "modifiers": {
                    "isPublic": true
                },
                "params": [
                    {
                        "name": "collision",
                        "type": "Collision"
                    }
                ],
                "returnType": "void"
            },
            {
                "name": "onJointBreak",
                "type": "event",
                "modifiers": {
                    "isPublic": true
                },
                "returnType": "void"
            },
            {
                "name": "onMouseDown",
                "type": "event",
                "modifiers": {
                    "isPublic": true
                },
                "params": [
                    {
                        "name": "evt",
                        "type": "Event"
                    }
                ],
                "returnType": "void"
            },
            {
                "name": "onMouseUp",
                "type": "event",
                "modifiers": {
                    "isPublic": true
                },
                "params": [
                    {
                        "name": "evt",
                        "type": "Event"
                    }
                ],
                "returnType": "void"
            },
            {
                "name": "onRightMouseDown",
                "type": "event",
                "modifiers": {
                    "isPublic": true
                },
                "params": [
                    {
                        "name": "evt",
                        "type": "Event"
                    }
                ],
                "returnType": "void"
            },
            {
                "name": "onRightMouseUp",
                "type": "event",
                "modifiers": {
                    "isPublic": true
                },
                "params": [
                    {
                        "name": "evt",
                        "type": "Event"
                    }
                ],
                "returnType": "void"
            },
            {
                "name": "onMouseMove",
                "type": "event",
                "modifiers": {
                    "isPublic": true
                },
                "params": [
                    {
                        "name": "evt",
                        "type": "Event"
                    }
                ],
                "returnType": "void"
            },
            {
                "name": "onMouseOver",
                "type": "event",
                "modifiers": {
                    "isPublic": true
                },
                "params": [
                    {
                        "name": "evt",
                        "type": "Event"
                    }
                ],
                "returnType": "void"
            },
            {
                "name": "onMouseOut",
                "type": "event",
                "modifiers": {
                    "isPublic": true
                },
                "params": [
                    {
                        "name": "evt",
                        "type": "Event"
                    }
                ],
                "returnType": "void"
            },
            {
                "name": "onMouseDrag",
                "type": "event",
                "modifiers": {
                    "isPublic": true
                },
                "params": [
                    {
                        "name": "evt",
                        "type": "Event"
                    }
                ],
                "returnType": "void"
            },
            {
                "name": "onMouseDragEnd",
                "type": "event",
                "modifiers": {
                    "isPublic": true
                },
                "params": [
                    {
                        "name": "evt",
                        "type": "Event"
                    }
                ],
                "returnType": "void"
            },
            {
                "name": "onMouseClick",
                "type": "event",
                "modifiers": {
                    "isPublic": true
                },
                "params": [
                    {
                        "name": "evt",
                        "type": "Event"
                    }
                ],
                "returnType": "void"
            },
            {
                "name": "onMouseDoubleClick",
                "type": "event",
                "modifiers": {
                    "isPublic": true
                },
                "params": [
                    {
                        "name": "evt",
                        "type": "Event"
                    }
                ],
                "returnType": "void"
            },
            {
                "name": "onMouseRightClick",
                "type": "event",
                "modifiers": {
                    "isPublic": true
                },
                "params": [
                    {
                        "name": "evt",
                        "type": "Event"
                    }
                ],
                "returnType": "void"
            },
            {
                "name": "onKeyDown",
                "type": "event",
                "modifiers": {
                    "isPublic": true
                },
                "params": [
                    {
                        "name": "evt",
                        "type": "Event"
                    }
                ],
                "returnType": "void"
            },
            {
                "name": "onKeyPress",
                "type": "event",
                "modifiers": {
                    "isPublic": true
                },
                "params": [
                    {
                        "name": "evt",
                        "type": "Event"
                    }
                ],
                "returnType": "void"
            },
            {
                "name": "onKeyUp",
                "type": "event",
                "modifiers": {
                    "isPublic": true
                },
                "params": [
                    {
                        "name": "evt",
                        "type": "Event"
                    }
                ],
                "returnType": "void"
            }
        ],
        "type": "Component"
    },
    "Sprite3D": {
        "module": "Laya",
        "name": "Sprite3D",
        "extends": [
            "Node",
            "EventDispatcher"
        ],
        "props": [
            {
                "modifiers": {
                    "isPublic": true,
                    "isReadonly": true
                },
                "name": "transform",
                "getter": true,
                "type": "Transform3D"
            }
        ],
        "funcs": [
            {
                "name": "instantiate",
                "type": "function",
                "modifiers": {
                    "isPublic": true,
                    "isStatic": true
                },
                "params": [
                    {
                        "name": "original",
                        "type": "Sprite3D"
                    },
                    {
                        "name": "parent",
                        "type": "Node",
                        "optional": true
                    },
                    {
                        "name": "worldPositionStays",
                        "type": "boolean",
                        "optional": true
                    },
                    {
                        "name": "position",
                        "type": "Vector3",
                        "optional": true
                    },
                    {
                        "name": "rotation",
                        "type": "Quaternion",
                        "optional": true
                    }
                ],
                "returnType": "Sprite3D"
            },
            {
                "name": "clone",
                "type": "function",
                "modifiers": {
                    "isPublic": true
                },
                "returnType": "Node"
            },
            {
                "name": "destroy",
                "type": "function",
                "modifiers": {
                    "isPublic": true
                },
                "params": [
                    {
                        "name": "destroyChild",
                        "type": "boolean",
                        "optional": true
                    }
                ],
                "returnType": "void",
                "fromParent": "Node"
            },
            {
                "name": "onDestroy",
                "type": "event",
                "modifiers": {
                    "isPublic": true
                },
                "returnType": "void",
                "fromParent": "Node"
            },
            {
                "name": "onAwake",
                "type": "event",
                "modifiers": {
                    "isPublic": true
                },
                "returnType": "void",
                "fromParent": "Node"
            },
            {
                "name": "onEnable",
                "type": "event",
                "modifiers": {
                    "isPublic": true
                },
                "returnType": "void",
                "fromParent": "Node"
            },
            {
                "name": "onDisable",
                "type": "event",
                "modifiers": {
                    "isPublic": true
                },
                "returnType": "void",
                "fromParent": "Node"
            },
            {
                "name": "onTest",
                "type": "event",
                "modifiers": {
                    "isPublic": true
                },
                "params": [
                    {
                        "name": "a",
                        "type": "number"
                    },
                    {
                        "name": "str",
                        "type": "string"
                    }
                ],
                "returnType": "void",
                "fromParent": "Node"
            }
        ],
        "type": "Node"
    },
    "Transform3D": {
        "module": "Laya",
        "name": "Transform3D",
        "extends": [
            "EventDispatcher"
        ],
        "props": [
            {
                "modifiers": {
                    "isPublic": true
                },
                "name": "worldMatrix",
                "getter": true,
                "type": "Matrix4x4",
                "setter": true
            }
        ],
        "funcs": [
            {
                "name": "translate",
                "type": "function",
                "modifiers": {
                    "isPublic": true
                },
                "params": [
                    {
                        "name": "translation",
                        "type": "Vector3"
                    },
                    {
                        "name": "isLocal",
                        "type": "boolean",
                        "optional": true
                    }
                ],
                "returnType": "void"
            },
            {
                "name": "rotate",
                "type": "function",
                "modifiers": {
                    "isPublic": true
                },
                "params": [
                    {
                        "name": "rotation",
                        "type": "Vector3"
                    },
                    {
                        "name": "isLocal",
                        "type": "boolean",
                        "optional": true
                    },
                    {
                        "name": "isRadian",
                        "type": "boolean",
                        "optional": true
                    }
                ],
                "returnType": "void"
            }
        ],
        "type": "Others"
    },
    "Matrix4x4": {
        "module": "Laya",
        "name": "Matrix4x4",
        "implements": [
            "IClone"
        ],
        "props": [
            {
                "name": "elements",
                "modifiers": {
                    "isPublic": true
                },
                "type": "Float32Array"
            }
        ],
        "funcs": [
            {
                "name": "multiply",
                "type": "function",
                "modifiers": {
                    "isPublic": true,
                    "isStatic": true
                },
                "params": [
                    {
                        "name": "left",
                        "type": "Matrix4x4"
                    },
                    {
                        "name": "right",
                        "type": "Matrix4x4"
                    },
                    {
                        "name": "out",
                        "type": "Matrix4x4"
                    }
                ],
                "returnType": "void"
            },
            {
                "name": "setPosition",
                "type": "function",
                "modifiers": {
                    "isPublic": true
                },
                "params": [
                    {
                        "name": "position",
                        "type": "Vector3"
                    }
                ],
                "returnType": "void"
            }
        ],
        "construct": {
            "params": [
                {
                    "name": "m11",
                    "type": "number",
                    "optional": true
                },
                {
                    "name": "m12",
                    "type": "number",
                    "optional": true
                },
                {
                    "name": "m13",
                    "type": "number",
                    "optional": true
                },
                {
                    "name": "m14",
                    "type": "number",
                    "optional": true
                },
                {
                    "name": "m21",
                    "type": "number",
                    "optional": true
                },
                {
                    "name": "m22",
                    "type": "number",
                    "optional": true
                },
                {
                    "name": "m23",
                    "type": "number",
                    "optional": true
                },
                {
                    "name": "m24",
                    "type": "number",
                    "optional": true
                },
                {
                    "name": "m31",
                    "type": "number",
                    "optional": true
                },
                {
                    "name": "m32",
                    "type": "number",
                    "optional": true
                },
                {
                    "name": "m33",
                    "type": "number",
                    "optional": true
                },
                {
                    "name": "m34",
                    "type": "number",
                    "optional": true
                },
                {
                    "name": "m41",
                    "type": "number",
                    "optional": true
                },
                {
                    "name": "m42",
                    "type": "number",
                    "optional": true
                },
                {
                    "name": "m43",
                    "type": "number",
                    "optional": true
                },
                {
                    "name": "m44",
                    "type": "number",
                    "optional": true
                },
                {
                    "name": "elements",
                    "type": "Float32Array",
                    "optional": true
                }
            ]
        },
        "type": "Others"
    },
    "Vector3": {
        "module": "Laya",
        "name": "Vector3",
        "implements": [
            "IClone"
        ],
        "props": [
            {
                "name": "x",
                "modifiers": {
                    "isPublic": true
                },
                "type": "number"
            },
            {
                "name": "y",
                "modifiers": {
                    "isPublic": true
                },
                "type": "number"
            },
            {
                "name": "z",
                "modifiers": {
                    "isPublic": true
                },
                "type": "number"
            }
        ],
        "funcs": [],
        "construct": {
            "params": [
                {
                    "name": "x",
                    "type": "number",
                    "optional": true
                },
                {
                    "name": "y",
                    "type": "number",
                    "optional": true
                },
                {
                    "name": "z",
                    "type": "number",
                    "optional": true
                }
            ]
        },
        "type": "Others"
    },
    "Vector4": {
        "module": "Laya",
        "name": "Vector4",
        "implements": [
            "IClone"
        ],
        "props": [
            {
                "name": "x",
                "modifiers": {
                    "isPublic": true
                },
                "type": "number"
            },
            {
                "name": "y",
                "modifiers": {
                    "isPublic": true
                },
                "type": "number"
            },
            {
                "name": "z",
                "modifiers": {
                    "isPublic": true
                },
                "type": "number"
            },
            {
                "name": "w",
                "modifiers": {
                    "isPublic": true
                },
                "type": "number"
            }
        ],
        "construct": {
            "params": [
                {
                    "name": "x",
                    "type": "number",
                    "optional": true
                },
                {
                    "name": "y",
                    "type": "number",
                    "optional": true
                },
                {
                    "name": "z",
                    "type": "number",
                    "optional": true
                },
                {
                    "name": "w",
                    "type": "number",
                    "optional": true
                }
            ]
        },
        "funcs": [],
        "type": "Others"
    }
}