import DivCardPeople from "./stylus";

interface Card {
  imgsrc: string;
  name: string;
  user: string;
  email: string;
  age: number;
}

function CardPeople(props: Card) {
  return (
    <DivCardPeople>
    <div>
    <img src={props.imgsrc} alt="picture-user" />
    </div>
    <div>
    <p><b>{props.name}</b></p>
    <p>{props.user}</p>
    <p>{props.email}</p>
    <p>{props.age}</p>
    </div>
    </DivCardPeople>
  )
}

export default CardPeople;
