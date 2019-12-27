import { FPOptions } from './fp-option-abstract';
import AfterAnime from './after-anime';
import SplashBottomData from '../assets/animations/intro-banner.json';
import SplashTopData from '../assets/animations/splash-top.json';
import TableSketchData from '../assets/animations/table-sketch-red.json';
import CollageHeadingData from '../assets/animations/healing.json';
import ContactData from '../assets/animations/contact.json';

export default class FPOptionHome extends FPOptions {
    public animations: AfterAnime[];

    constructor(anchors: string[], sectionsColor: string[]
        , overflow: boolean = false, scrollBar: boolean = false
        , menu: string = '#menu') {

        super(anchors, sectionsColor, overflow
            , scrollBar, menu);
        this.options = this.initOptions();
        this.animations = this.initAnimations();

    }

    public start = () => {
        this.playFirst();
    }

    private playFirst = () => {
        if (this.animations[0].animationItem
            && this.animations[1].animationItem) {
            this.animations[0].animationItem.goToAndPlay(4, true);
            this.animations[1].animationItem.goToAndPlay(4, true);
        }
    }

    public get Option(): Object {
        return <Object>this.options;
    }

    public get Anchors(): string[] {
        return this.fullpageAnchors;
    }

    initOptions = (): Object => {
        const options = {
            scrollOverflow: this.fullpageScrollOverflow,
            scrollBar: this.fullpageScrollBar,
            menu: this.fullpageMenu,
            anchors: this.fullpageAnchors,
            sectionsColor: this.fullpageSectionsColor,
            licenseKey: this.fullpageLicenseKey,
            afterLoad: (origin: Object, destination: Object) => {
                this.afterLoad(JSON.stringify(origin)
                    , JSON.stringify(destination));
            },
        }
        return options;
    }

    private afterLoad = (origin: string, destination: string) => {

        if (destination) {

            const _destination = JSON.parse(destination);
            const _destTargets = this.containsAnimation(_destination.anchor);
            _destTargets.forEach((anime: AfterAnime) => {
                if (anime.animationItem) {
                    anime.animationItem.goToAndPlay(4, true);
                }
            });

            this.setActiveNavItem(_destination.anchor);
        }

        if (origin) {
            const _origin = JSON.parse(origin);
            if (_origin) {
                const _origTragets = this.containsAnimation(_origin.anchor);
                _origTragets.forEach((anime: AfterAnime) => {
                    if (anime.animationItem) {
                        anime.animationItem.goToAndStop(2, true);
                    }
                });
            }
        }
    }

    private initAnimations = (): AfterAnime[] => {

        const _animations: AfterAnime[] = [];
        _animations.push(this.createAnimation('home-top', SplashTopData));
        _animations.push(this.createAnimation('home-bottom', SplashBottomData));
        _animations.push(this.createAnimation('vision-top', CollageHeadingData));
        _animations.push(this.createAnimation('vision-bottom', TableSketchData));
        _animations.push(this.createAnimation('contact-top', ContactData));

        return _animations;
    }

    private createAnimation = (name: string, data: Object): AfterAnime => {
        return new AfterAnime(name, data);
    }

    public findAnimation = (name: string): AfterAnime => {
        return this.animations[this.animations.findIndex(x => x.name === name)]
    }

    public containsAnimation = (name: string): AfterAnime[] => {
        return this.animations.filter(x => x.name.indexOf(name) >= 0);
    }

}