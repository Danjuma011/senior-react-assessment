import React from 'react';
import '../../../styles/features/GroupConnector.scss';

interface GroupConnectorProps {
  onAddGroup?: () => void;
}

const GroupConnector: React.FC<GroupConnectorProps> = ({ onAddGroup }) => {
  return (
    <div className="group-connector">
      <div className="connector-line">
        <div className="connector-start"></div>
        <div className="connector-middle" onClick={onAddGroup}>
          <div className="add-button">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="12" y1="5" x2="12" y2="19"/>
              <line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
          </div>
        </div>
        <div className="connector-end">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 9l6 6 6-6"/>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default GroupConnector;
