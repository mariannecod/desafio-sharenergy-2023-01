import create from 'zustand';
import {persist} from "zustand/middleware";

type State = {
  token: string
};

let store = (set,get) => ({
  token: ""
});

// persist the created state

store = persist(store, {name: "TokenStore"})

// create the store

const TokenStore = create<State>(store);

export default TokenStore;
