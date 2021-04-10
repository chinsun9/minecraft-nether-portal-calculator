import './Portals.scss';
import React from 'react';
import { useRootDispatch, useRootState } from '../RootContext';

export default function Portals() {
  const { portals } = useRootState();
  const dispatch = useRootDispatch();

  return (
    <div className="portals">
      <div className="item">
        <span>name</span>
        <span className="coord">overworld</span>
        <span className="coord">nether</span>
        <span>insertDate</span>
      </div>

      {Array.from(portals).map(([, { id, title, coord, insertDate }]) => {
        return (
          <div className="item" key={id}>
            <input
              type="text"
              value={title}
              onChange={(e) => {
                const { value } = e.target;
                dispatch({ type: 'EDIT_PORTAL', id, title: value });
              }}
            />
            <span className="coord">{`${coord.x}, ${coord.z}`}</span>
            <span className="coord">
              {`${Math.round(coord.x / 8)}, ${Math.round(coord.z / 8)}`}
            </span>
            <span className="date">
              <span>{insertDate.format('HH:mm:ss')}</span>
              <span className="yymmdd">{insertDate.format('YYMMDD')}</span>
            </span>
            <div className="delete">
              <button
                className="delete"
                type="button"
                onClick={() => dispatch({ type: 'DEL_PORTAL', id })}
              >
                x
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
