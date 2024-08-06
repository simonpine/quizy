import { useClickAway } from "@uidotdev/usehooks";
import { useKey } from "react-use";

export function Sure({ msg, func, setState, state, extraInfo = [], disabled = false }) {
    useKey('Escape', () => { setState(false); });

    const ref = useClickAway(() => {
        if (!disabled) setState(false);
    });
    return (
        state === true &&

        <div className="sureContainer">
            <div ref={ref} className="flyBox">
                <p>{msg}</p>
                <div>
                    <button disabled={disabled} onClick={() => func(...extraInfo)} className="linkButton">Yes, continue</button>
                    <button disabled={disabled} className="SecundaryButton" onClick={() => {if (!disabled) setState(false)}}>No, cancel</button>
                </div>
            </div>
        </div>

        // :
        // <></>
    )
}