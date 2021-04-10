import './App.scss';
import React, { useCallback, useState } from 'react';
import { useRootDispatch, useRootState } from './RootContext';
import { Position } from './type';
import Header from './component/Header';
import Portals from './component/Portals';

function App() {
  const dispatch = useRootDispatch();
  const { portals } = useRootState();

  const [overworld, setOverworld] = useState<Position>({ x: 0, z: 0 });
  const [nether, setNether] = useState<Position>({ x: 0, z: 0 });

  const onClickHandler = useCallback(() => {
    dispatch({ type: 'ADD_PORTAL', coord: overworld });
  }, [dispatch, overworld]);

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const { name, parentElement } = event.target;
    const value = Number(event.target.value);

    if (parentElement?.className === 'overworld') {
      setOverworld((prev) => {
        return { ...prev, [name]: Math.round(value) };
      });
      setNether((prev) => {
        return { ...prev, [name]: Math.round(Number(value) / 8) };
      });
      return;
    }

    setNether((prev) => {
      return { ...prev, [name]: Math.round(value) };
    });
    setOverworld((prev) => {
      return { ...prev, [name]: Math.round(Number(value) * 8) };
    });
  };

  return (
    <div className="App">
      <Header />
      <div className="calculator">
        <div className="head">
          <span> </span>
          <span className="x">X</span>
          <span className="z">Z</span>
        </div>
        <div className="overworld">
          <span>Overwolrd</span>
          <input
            type="number"
            className="x"
            name="x"
            value={overworld.x.toString()}
            onChange={onChangeHandler}
          />
          <input
            type="number"
            className="z"
            name="z"
            value={overworld.z.toString()}
            onChange={onChangeHandler}
          />
        </div>
        <div className="nether">
          <span>Nether</span>
          <input
            type="number"
            className="x"
            name="x"
            value={nether.x.toString()}
            onChange={onChangeHandler}
          />
          <input
            type="number"
            className="z"
            name="z"
            value={nether.z.toString()}
            onChange={onChangeHandler}
          />
        </div>
        <div className="recoredBtn">
          <button type="button" onClick={onClickHandler}>
            Record
          </button>
        </div>
      </div>

      {portals.size > 0 ? <Portals /> : null}
    </div>
  );
}

export default App;
