import styled from "styled-components";

const DivCardClient = styled.div`
  background: none;
  
  border: 1px solid #bbb;
  margin: 15px 5px;
  padding: 7px;
  display: inline-block;
  borderRadius: 5px;
  wordWrap: break-word;
  width: 275px;
  
  img {
     border-radius: 50%;
     border:1px solid #ced;
   }
   
   ${p}::nth-child(1) {
     font-weight:bold;
   }
  
`;

export default DivCardClient;
