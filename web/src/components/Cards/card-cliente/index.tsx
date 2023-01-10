import DivCardClient from "./stylus";

interface Card {
  imgsrc: string;
  name: string;
  user: string;
  email: string;
  age: number;
}

function CardClient(props: Card) {
  return (
    <DivCardClient>
    <div>
    <img src={props.imgsrc} alt="picture-user" />
    </div>
    <div>
    <p><b>{props.name}</b></p>
    <p>{props.user}</p>
    <p>{props.email}</p>
    <p>{props.age}</p>
    </div>
    </DivCardClient>
  )
}

export default CardClient;
