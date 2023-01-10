import create from 'zustand';
import {persist} from "zustand/middleware";

type State = {
  log: boolean
};

let store = () => ({
  log: false
});

// persist the created state

store = persist(store, {name: "LogStore"})

// create the store

const LogStore = create<State>(store);

export default LogStore;
