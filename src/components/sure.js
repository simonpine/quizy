import { useClickAway } from "@uidotdev/usehooks";

export function Sure({ msg, func, setState, state }) {
    const ref = useClickAway(() => {
        setState(false);
    });
    return (
        state === true &&

        <div className="sureContainer">
            <div ref={ref} className="flyBox">
                <p>{msg}</p>
                <div>
                    <button onClick={func} className="linkButton">Yes, continue</button>
                    <button className="SecundaryButton" onClick={() => setState(false)}>No, cancel</button>
                </div>
            </div>
        </div>

        // :
        // <></>
    )
}