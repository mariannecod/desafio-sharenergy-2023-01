import { useRouteError } from "react-router-dom";


function Erros() {
  const error:any = useRouteError();
  console.error(error);

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
      <img src="https://http.cat/404"/>
    </div>
  );
}
 
export default Erros;
