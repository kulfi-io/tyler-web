import { IValidKey } from '@/models/interfaces';



export class ReadyToSubmit {
    public validated: IValidKey[];
    public submitter?: Element;
    public max: number;


    constructor(submitter?: Element, max: number = 1) {
        this.validated = [];
        this.submitter = submitter;
        this.max = max;
    }

    public muted = (): void => {
        if (this.submitter) {
            var _classes = this.submitter.classList;
            var _passed = _classes.contains("bg-passed");
            var _muted = _classes.contains("bg-muted");

            if (_passed)
                _classes.remove('bg-passed');

            if (!_muted)
                _classes.add('bg-muted');

        }
    }

    public passed = (): void => {
        if (this.submitter) {
            var _classes = this.submitter.classList;
            var _passed = _classes.contains("bg-passed");
            var _muted = _classes.contains("bg-muted");

            if (!_passed)
                _classes.add('bg-passed');

            if (_muted)
                _classes.remove('bg-muted');

        }
    }

    public notifySubmitter = (submitter: Element, originalValue: string) => {
        if (submitter.textContent !== originalValue) {
            const _reset = () => {
                submitter.textContent = originalValue;
                this.muted;
            }
            setTimeout(_reset, 2000);
        }
    }

}