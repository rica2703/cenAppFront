import './input.css';
function Input(props){
    return(
        <>
        <input type={props.type} onChange={props.onChange} onBlur={props.onBlur} className={props.className} name={props.name} placeholder={props.placeholder} value={props.value} id="" />
        </>
    );
}
export default Input;