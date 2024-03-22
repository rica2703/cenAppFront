function Link(props){
    return(
        <>
        <a onClick={props.onClick}>{props.textoA}</a>
        </>
    );
}
export default Link;