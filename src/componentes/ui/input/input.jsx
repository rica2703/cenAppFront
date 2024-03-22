import './input.css';
function Input(props){
    return(
        <>
        <input type={props.type} onBlur={props.onBlur} className={props.className} placeholder={props.placeholder} id="" />
        </>
    );
}
export default Input;