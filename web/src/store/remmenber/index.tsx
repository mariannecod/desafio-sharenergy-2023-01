import create from 'zustand';
import {persist} from "zustand/middleware";

type State = {
  user: string,
  psd: string
};

let store = (set,get) => ({
  user: "",
  psd: ""

});

// persist the created state

store = persist(store, {name: "UseLogStore"})

// create the store

const UseLogStore = create<State>(store);

export default UseLogStore;
