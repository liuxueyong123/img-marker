interface ShapeProp {
    type: ShapeType;
    [key: string]: any;
}
declare class Shape {
    /** 坐标 */
    coor: any[];
    /** 边线颜色 */
    strokeStyle: string;
    /** 填充颜色 */
    fillStyle: string;
    /** 边线宽度 */
    lineWidth: number;
    /** 默认为矩形 */
    type: ShapeType;
    /** 当前是否处于活动状态 */
    active: boolean;
    /** 当前是否处于创建状态 */
    creating: boolean;
    /** 当前是否处于拖拽状态 */
    dragging: boolean;
    /** 唯一标识 */
    uuid: string;
    constructor(item: ShapeProp);
}

declare class Rect extends Shape {
    type: ShapeType;
    static MIN_WIDTH: number;
    static MIN_HEIGHT: number;
    constructor(item: any);
    get ctrlsData(): Point[];
}

type Point = [number, number];
type AllShape = Rect;
declare enum ShapeType {
    rect = 1
}
declare enum MarkMode {
    edit = 0,
    rect = 1
}
declare enum EventType {
    Add = "add",
    Select = "select",
    Load = "load",
    Update = "update"
}
interface EventCallbacks {
    [EventType.Add]: (args: AllShape) => void;
    [EventType.Select]: (args: AllShape) => void;
    [EventType.Load]: () => void;
    [EventType.Update]: (args: AllShape[]) => void;
}

declare class ImgMarker {
    /** 画布宽度 */
    private CANVAS_WIDTH;
    /** 画布高度 */
    private CANVAS_HEIGHT;
    /** 图片原始宽度 */
    private IMAGE_ORIGIN_WIDTH;
    /** 图片原始高度 */
    private IMAGE_ORIGIN_HEIGHT;
    /** 图片缩放宽度 */
    private IMAGE_WIDTH;
    /** 图片缩放高度 */
    private IMAGE_HEIGHT;
    /** 边线颜色 */
    strokeStyle: string;
    /** 填充颜色 */
    fillStyle: string;
    /** 边线宽度 */
    lineWidth: number;
    /** 当前选中的标注边线颜色 */
    activeStrokeStyle: string;
    /** 当前选中的标注填充颜色 */
    activeFillStyle: string;
    /** 控制点边线颜色 */
    ctrlStrokeStyle: string;
    /** 控制点填充颜色 */
    ctrlFillStyle: string;
    /** 控制点半径 */
    ctrlRadius: number;
    private readonly canvas;
    private ctx;
    /** 所有标注数据 */
    dataset: AllShape[];
    /** 背景图片 */
    private readonly image;
    /** 当前行为 */
    private currentMode;
    /** 控制点索引 */
    private ctrlIndex;
    /** 当前鼠标位置 */
    private currentMousePoint;
    /** 当前当前选中的标注 */
    get activeShape(): AllShape | null;
    /**
       * @param el Valid CSS selector string, or DOM
       * @param src image src
       */
    constructor(el: HTMLCanvasElement | string, src?: string);
    /**
       * 初始化配置
       */
    private initSetting;
    /**
       * 初始化事件
       */
    private initEvents;
    /**
       * 销毁
       */
    destroy(): void;
    private handleLoad;
    private handleMouseDown;
    private handelMouseMove;
    private handelMouseUp;
    private handelKeyup;
    /**
       * 适配背景图
       */
    fitZoom(): void;
    /**
       * 设置数据
       * @param data Array
       */
    setData(data: AllShape[]): void;
    /**
       * 设置当前行为
       * @param mode MarkMode
       */
    setMode(mode: MarkMode): void;
    /**
       * 事件订阅
       * @param eventName 事件名称
       * @param cb 回调方法
       */
    on<T extends EventType>(eventName: T, cb: EventCallbacks[T]): void;
    /**
       * 删除指定标注
       * @param uuid string
       */
    deleteByUuid(uuid: string): void;
    /**
       * 更新画布
       */
    update(): void;
    /**
       * 绘制标记的图形到 canvas 上
       * @returns
       */
    private drawShapes;
    /**
       * 绘制底图到 canvas 上
       * @returns
       */
    private drawImg;
    /**
       * 绘制矩形
       * @param shape 标注实例
       * @returns
       */
    private drawRect;
    /**
       * 绘制控制点列表
       * @param shape 标注实例
       */
    private drawCtrlList;
    /**
       * 绘制控制点
       * @param point 坐标
       */
    private drawCtrl;
    /**
       * 添加/切换图片
       * @param url 图片链接
       */
    setImage(url: string): void;
    /**
       * 添加/切换图片
       * @param url 图片链接
       */
    exportImg(type?: string, quality?: number): string;
    /**
       * 合成事件
       * @param e
       * @returns
       */
    private mergeEvent;
    /**
       * 判断是否在圆内
       * @param point 坐标
       * @param center 圆心
       * @param r 半径
       * @param needScale 是否为圆形点击检测
       * @returns 布尔值
       */
    private isPointInCircle;
    /**
       * 判断是否在矩形内
       * @param point 坐标
       * @param coor 区域坐标
       * @returns 布尔值
       */
    private isPointInRect;
    /**
       * 判断是否在标注实例上
       * @param mousePoint 点击位置
       * @returns
       */
    private isHitOnShape;
    /**
       * 更改当前鼠标样式
       * @param cursor 鼠标样式
       * @returns
       */
    private changeCursor;
}

export { EventType, MarkMode, ShapeType, ImgMarker as default };
