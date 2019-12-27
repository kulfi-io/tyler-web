import lottie,{ AnimationItem }  from "lottie-web";

export class AfterAnime {
    private target?: HTMLElement;
    public animationItem?: AnimationItem
    private loop: boolean;
    private autoPlay: boolean;
    private data: Object;
    public name: string;
    
    constructor(name:string, data: Object, loop: boolean=false, autoPlay: boolean = false) {
        this.name = name;
        this.loop = loop;
        this.autoPlay = autoPlay;
        this.data = data;
    }

    public init = (target: HTMLElement) => {
        this.target = target;
        this.animationItem = lottie.loadAnimation({
            container: this.target,
            loop: this.loop,
            autoplay: this.autoPlay,
            renderer: 'svg',
            animationData:  this.data,
        });
    }
}

export default AfterAnime;