import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import '../../../styles/features/DropZone.scss';

const DropZone: React.FC = () => {
  const { isOver, setNodeRef } = useDroppable({
    id: 'drop-zone',
  });

  return (
    <div
      ref={setNodeRef}
      className={`drop-zone ${isOver ? 'drag-over' : ''}`}
    >
      <div className="drop-zone-content">
        <p className="drop-text">Drag or Drop</p>
      </div>
    </div>
  );
};

export default DropZone;
