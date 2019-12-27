import { FPOptions } from './fp-option-abstract';

export default class FPOption extends FPOptions {

    constructor(anchors: string[], sectionsColor: string[]
        , overflow: boolean = false, scrollBar: boolean = true
        , menu: string = '#menu') {

        super(anchors, sectionsColor, overflow
            , scrollBar, menu);
        this.options = this.initOptions();

    }

    // public start = () => {
    //     this.attachNavEvents();
    //     this.displayloggedItems();
    // }

    public get Option(): Object {
        return <Object>this.options;
    }

    initOptions = (): Object => {
        const options = {
            scrollOverflow: this.fullpageScrollOverflow,
            scrollBar: this.fullpageScrollBar,
            menu: this.fullpageMenu,
            anchors: this.fullpageAnchors,
            sectionsColor: this.fullpageSectionsColor,
            licenseKey: this.fullpageLicenseKey,
            autoScrolling: false,
            afterLoad: (origin: Object, destination: Object) => {
                const _stringified = JSON.stringify(destination);
                const _parsed = JSON.parse(_stringified);

                if (!_parsed.anchor) {
                    this.setActiveNavItem('schedule');
                } else {

                    this.setActiveNavItem(_parsed.anchor);
                }

            },
        }

        return options;
    }


}