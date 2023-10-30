type Point = [number, number];
type AllShape = Rect;
declare enum ShapeType {
    rect = 1
}
declare enum MarkMode {
    edit = 0,
    rect = 1
}

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
    /** 索引 */
    index: number;
    /** 唯一标识 */
    uuid: string;
    constructor(item: ShapeProp, index: number);
}

declare class Rect extends Shape {
    type: ShapeType;
    static MIN_WIDTH: number;
    static MIN_HEIGHT: number;
    constructor(item: any, index: number);
    get ctrlsData(): Point[];
}

declare class ImgMarker {
    /** 画布宽度 */
    CANVAS_WIDTH: number;
    /** 画布高度 */
    CANVAS_HEIGHT: number;
    /** 图片原始宽度 */
    IMAGE_ORIGIN_WIDTH: number;
    /** 图片原始高度 */
    IMAGE_ORIGIN_HEIGHT: number;
    /** 图片缩放宽度 */
    IMAGE_WIDTH: number;
    /** 图片缩放高度 */
    IMAGE_HEIGHT: number;
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
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    /** 所有标注数据 */
    dataset: AllShape[];
    /** 背景图片 */
    image: HTMLImageElement;
    /** 当前行为 */
    currentMode: MarkMode;
    /** 控制点索引 */
    ctrlIndex: number;
    /** 当前鼠标位置 */
    currentMousePoint: Point;
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
    initSetting(): void;
    /**
       * 初始化事件
       */
    initEvents(): void;
    /**
       * 销毁
       */
    destroy(): void;
    handleLoad(): void;
    handleMouseDown(e: MouseEvent | TouchEvent): void;
    handelMouseMove(e: MouseEvent | TouchEvent): void;
    handelMouseUp(e: MouseEvent | TouchEvent): void;
    handelKeyup(e: KeyboardEvent): void;
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
       * 删除指定标注
       * @param index number
       */
    deleteByIndex(index: number): void;
    /**
       * 更新画布
       */
    update(): void;
    /**
       * 绘制标记的图形到 canvas 上
       * @returns
       */
    drawShapes(): void;
    /**
       * 绘制底图到 canvas 上
       * @returns
       */
    drawImg(): void;
    /**
       * 绘制矩形
       * @param shape 标注实例
       * @returns
       */
    drawRect(shape: Rect): void;
    /**
       * 绘制控制点列表
       * @param shape 标注实例
       */
    drawCtrlList(shape: AllShape): void;
    /**
       * 绘制控制点
       * @param point 坐标
       */
    drawCtrl(point: Point): void;
    /**
       * 添加/切换图片
       * @param url 图片链接
       */
    setImage(url: string): void;
    /**
       * 添加/切换图片
       * @param url 图片链接
       */
    exportImg(): string;
    /**
       * 合成事件
       * @param e
       * @returns
       */
    mergeEvent(e: TouchEvent | MouseEvent): {
        mouseX: number;
        mouseY: number;
        mouseCX: number;
        mouseCY: number;
        altKey: boolean;
        button: number;
        buttons: number;
        clientX: number;
        clientY: number;
        ctrlKey: boolean;
        metaKey: boolean;
        movementX: number;
        movementY: number;
        offsetX: number;
        offsetY: number;
        pageX: number;
        pageY: number;
        relatedTarget: EventTarget | null;
        screenX: number;
        screenY: number;
        shiftKey: boolean;
        x: number;
        y: number;
        getModifierState(keyArg: string): boolean;
        initMouseEvent(typeArg: string, canBubbleArg: boolean, cancelableArg: boolean, viewArg: Window, detailArg: number, screenXArg: number, screenYArg: number, clientXArg: number, clientYArg: number, ctrlKeyArg: boolean, altKeyArg: boolean, shiftKeyArg: boolean, metaKeyArg: boolean, buttonArg: number, relatedTargetArg: EventTarget | null): void;
        detail: number;
        view: Window | null;
        which: number;
        initUIEvent(typeArg: string, bubblesArg?: boolean | undefined, cancelableArg?: boolean | undefined, viewArg?: Window | null | undefined, detailArg?: number | undefined): void;
        bubbles: boolean;
        cancelBubble: boolean;
        cancelable: boolean;
        composed: boolean;
        currentTarget: EventTarget | null;
        defaultPrevented: boolean;
        eventPhase: number;
        isTrusted: boolean;
        returnValue: boolean;
        srcElement: EventTarget | null;
        target: EventTarget | null;
        timeStamp: number;
        type: string;
        composedPath(): EventTarget[];
        initEvent(type: string, bubbles?: boolean | undefined, cancelable?: boolean | undefined): void;
        preventDefault(): void;
        stopImmediatePropagation(): void;
        stopPropagation(): void;
        NONE: 0;
        CAPTURING_PHASE: 1;
        AT_TARGET: 2;
        BUBBLING_PHASE: 3;
    } | {
        mouseX: number;
        mouseY: number;
        mouseCX: number;
        mouseCY: number;
        altKey: boolean;
        changedTouches: TouchList;
        ctrlKey: boolean;
        metaKey: boolean;
        shiftKey: boolean;
        targetTouches: TouchList;
        touches: TouchList;
        detail: number;
        view: Window | null;
        which: number;
        initUIEvent(typeArg: string, bubblesArg?: boolean | undefined, cancelableArg?: boolean | undefined, viewArg?: Window | null | undefined, detailArg?: number | undefined): void;
        bubbles: boolean;
        cancelBubble: boolean;
        cancelable: boolean;
        composed: boolean;
        currentTarget: EventTarget | null;
        defaultPrevented: boolean;
        eventPhase: number;
        isTrusted: boolean;
        returnValue: boolean;
        srcElement: EventTarget | null;
        target: EventTarget | null;
        timeStamp: number;
        type: string;
        composedPath(): EventTarget[];
        initEvent(type: string, bubbles?: boolean | undefined, cancelable?: boolean | undefined): void;
        preventDefault(): void;
        stopImmediatePropagation(): void;
        stopPropagation(): void;
        NONE: 0;
        CAPTURING_PHASE: 1;
        AT_TARGET: 2;
        BUBBLING_PHASE: 3;
    };
    /**
       * 判断是否在圆内
       * @param point 坐标
       * @param center 圆心
       * @param r 半径
       * @param needScale 是否为圆形点击检测
       * @returns 布尔值
       */
    isPointInCircle(point: Point, center: Point, r: number): boolean;
    /**
       * 判断是否在矩形内
       * @param point 坐标
       * @param coor 区域坐标
       * @returns 布尔值
       */
    isPointInRect(point: Point, coor: Point[]): boolean;
    /**
       * 判断是否在标注实例上
       * @param mousePoint 点击位置
       * @returns
       */
    isHitOnShape(mousePoint: Point): {
        isOnShape: true;
        shape: AllShape;
        index: number;
    } | {
        isOnShape: false;
        index: -1;
        shape: null;
    };
    /**
       * 更改当前鼠标样式
       * @param cursor 鼠标样式
       * @returns
       */
    changeCursor(cursor: string): void;
}

export { MarkMode, ShapeType, ImgMarker as default };
