import { useState } from "react";
import { Path } from "../constants/constants";

export default function usePersistedState(key, defaultValue){
    const [state, setState] = useState(() => {
        const persistedState = localStorage.getItem(key);

        if(persistedState){
            return JSON.parse(persistedState);
        }

        return defaultValue;
    });

    const setPersistedState = (value) => {
        let serializedValue;

        setState(value);

        if(typeof value === 'function'){
            serializedValue = JSON.stringify(value(state));
        } else {
            serializedValue = JSON.stringify(value);
        }

        localStorage.setItem(key, serializedValue);
    }

    return [
        state,
        setPersistedState
    ];
}

// export const useLocalStorage = (key, initialValue) => {
//     // const key = useId();
//     const [state, setState] = useState(() => {
//         const persistedStateSerialized = localStorage.getItem(key);
//         if (persistedStateSerialized) {
//             const persistedState = JSON.parse(persistedStateSerialized);

//            return persistedState;
//         }

//         return initialValue;
//     });

//     const setLocalStorageState = (value) => {
//         setState(value);

//         localStorage.setItem(key, JSON.stringify(value));
//     };

//     return [
//         state,
//         setLocalStorageState,
//     ];
// };
