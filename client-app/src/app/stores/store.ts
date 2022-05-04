import { useContext } from "react";
import { createContext } from "vm";
import ActivityStore from "./activityStore";


interface Store {
    activityStore: ActivityStore
}

export const store: Store = {
    activityStore: new ActivityStore()
}

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
} 
