import ButtonsMenu from "./stylus";

interface Btn {
  text: string;
}

function ButtonMenu(props: Btn) {
  return (
    <ButtonsMenu>
    {props.text}
    </ButtonsMenu>
  )
}

export default ButtonMenu;
