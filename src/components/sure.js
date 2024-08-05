import { useClickAway } from "@uidotdev/usehooks";
import { useKey } from "react-use";

export function Sure({ msg, func, setState, state, extraInfo = [] }) {
    useKey('Escape', () => { setState(false); });

    const ref = useClickAway(() => {
        setState(false);
    });
    return (
        state === true &&

        <div className="sureContainer">
            <div ref={ref} className="flyBox">
                <p>{msg}</p>
                <div>
                    <button onClick={() => func(...extraInfo)} className="linkButton">Yes, continue</button>
                    <button className="SecundaryButton" onClick={() => setState(false)}>No, cancel</button>
                </div>
            </div>
        </div>

        // :
        // <></>
    )
}