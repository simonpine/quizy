export function Sure({msg, func, setState, state}){
    console.log(state)
    return (
        state === true &&
        
            <div onClick={()=>setState(false)} className="sureContainer"><div>Hola</div></div>
        
        // :
        // <></>
    )
}