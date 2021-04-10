/* eslint-disable no-case-declarations */
import React, { createContext, Dispatch, useContext, useReducer } from 'react';
import dayjs from 'dayjs';
import { Action } from './actions';
import { State } from './types';
import { Portal } from '../type';

const initialState: State = {
  portals: new Map<number, Portal>([]),
};

const StateContext = createContext<State>(initialState);
const DispatchContext = createContext<Dispatch<Action>>(() => null);

let newKey = 0;

function reducer(state: State, action: Action): State {
  let newPortals = new Map(state.portals);
  switch (action.type) {
    case 'ADD_PORTAL':
      newPortals = new Map(state.portals);
      newKey += 1;
      newPortals.set(newKey, {
        id: newKey,
        title: 'new portal',
        coord: action.coord,
        insertDate: dayjs(),
      });

      return {
        ...state,
        portals: newPortals,
      };

    case 'DEL_PORTAL':
      newPortals = new Map(state.portals);
      newPortals.delete(action.id);

      return {
        ...state,
        portals: newPortals,
      };

    case 'EDIT_PORTAL':
      newPortals = new Map<number, Portal>(state.portals);

      const oldInfo = newPortals.get(action.id) as Portal;
      newPortals.set(action.id, { ...oldInfo, title: action.title });

      return {
        ...state,
        portals: newPortals,
      };

    default:
      throw new Error('Unhandled action');
  }
}

export default ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
};

export const useRootState = () => {
  return useContext(StateContext);
};

export const useRootDispatch = () => {
  return useContext(DispatchContext);
};
