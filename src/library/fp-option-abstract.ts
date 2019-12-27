import Config from '../config/config.json';
import '../../public/sass/fullpage-override.scss';
import 'fullpage.js/vendors/scrolloverflow';
import { NavHelper } from './nav-helper';

export abstract class FPOptions extends NavHelper{
    protected fullpageLicenseKey: string;
    protected fullpageScrollOverflow: boolean;
    protected fullpageScrollBar: boolean;
    protected fullpageMenu: string;
    protected fullpageSectionsColor: string[];
    protected options?: Object;
    protected fullpageAnchors: string[];

    constructor(
        protected anchors: string[], protected sectionsColor:string[]
        , protected overflow: boolean=false, protected scrollBar: boolean=false
        , protected menu: string='#menu') {
        
        super();
        this.fullpageAnchors = anchors;
        this.fullpageMenu = menu;
        this.fullpageLicenseKey = Config.fullpage.key;
        this.fullpageScrollOverflow = overflow;
        this.fullpageScrollBar = scrollBar;
        this.fullpageSectionsColor = sectionsColor;
    }

    // protected AttachNavEventListener = () => {
    //     this.attachNavEvents();
    // }

    abstract initOptions(): Object;
}