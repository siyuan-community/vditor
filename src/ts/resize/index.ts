import resizeSVG from "../../assets/icons/resize.svg";

export class Resize {
    public element: HTMLElement;

    constructor(vditor: IVditor) {
        this.element = document.createElement("div");
        this.element.className = `vditor-resize vditor-resize--${vditor.options.resize.position}`;
        this.element.innerHTML = `<div>${resizeSVG}</div>`;

        this.bindEvent(vditor);
    }

    private bindEvent(vditor: IVditor) {
        this.element.addEventListener("mousedown", (event: MouseEvent) => {

            const documentSelf = document;
            const y = event.clientY;
            const height = vditor.el.offsetHeight;
            const minHeight = 63 + vditor.el.querySelector(".vditor-toolbar").clientHeight;
            documentSelf.ondragstart = () => false;

            if (window.captureEvents) {
                window.captureEvents();
            }

            this.element.classList.add("vditor-resize--selected");

            documentSelf.onmousemove = (moveEvent: MouseEvent) => {
                if (vditor.options.resize.position === "top") {
                    vditor.el.style.height = Math.max(minHeight, height + (y - moveEvent.clientY)) + "px";
                } else {
                    vditor.el.style.height = Math.max(minHeight, height + (moveEvent.clientY - y)) + "px";
                }
                if (vditor.options.typewriterMode) {
                    vditor.sv.element.style.paddingBottom =
                        vditor.sv.element.parentElement.offsetHeight / 2 + "px";
                }
            };

            documentSelf.onmouseup = () => {
                if (vditor.options.resize.after) {
                    vditor.options.resize.after(vditor.el.offsetHeight - height);
                }

                if (window.captureEvents) {
                    window.captureEvents();
                }
                documentSelf.onmousemove = null;
                documentSelf.onmouseup = null;
                documentSelf.ondragstart = null;
                documentSelf.onselectstart = null;
                documentSelf.onselect = null;
                this.element.classList.remove("vditor-resize--selected");
            };
        });
    }
}
