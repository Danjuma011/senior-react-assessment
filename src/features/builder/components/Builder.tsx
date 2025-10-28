import React, { useEffect } from 'react';
import { RootState } from '../../../shared/store';
import { Group as GroupType } from '../../../shared/types';
import {
  DndContext,
  DragStartEvent,
  DragEndEvent,
  DragOverEvent,
  useSensor,
  useSensors,
  PointerSensor,
  KeyboardSensor,
  closestCenter,
} from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { useAppDispatch, useAppSelector } from '../../../shared/store/hooks';
import {
  setDropped,
  setSidebarOpen,
  setActiveId,
  // updateSectionTitle,
  updateGroupTitle,
  updateGroupRequired,
  toggleGroupMinimize,
  addGroup,
  addFieldToGroup,
  reorderGroups,
} from '../../../shared/store/slices/builderSlice';
import { saveToLocalStorage, saveToSessionStorage, loadFromLocalStorage, loadFromSessionStorage } from '../../../shared/store/persistence';
import DraggableSection from './DraggableSection';
import DropZone from './DropZone';
// import SectionHeader from './SectionHeader';
import Group from './Group';
import GroupConnector from './GroupConnector';
import AddElementsSidebar from './AddElementsSidebar';
import ElementsSidebar from './ElementsSidebar';
import '../../../styles/features/Builder.scss';

const Builder: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isDropped, isSidebarOpen, currentSection, activeId } = useAppSelector((state: RootState) => state.builder);

  // Load state from storage on component mount
  useEffect(() => {
    const savedState = loadFromLocalStorage();
    const sessionState = loadFromSessionStorage();
    
    if (savedState.builder) {
      // Restore builder state from localStorage
      dispatch(setDropped(savedState.builder.isDropped));
      dispatch(setSidebarOpen(savedState.builder.isSidebarOpen || false));
      if (savedState.builder.currentSection) {
        // Update current section if it exists
        // Note: We'll need to add a setCurrentSection action
      }
    }
    
    if (sessionState) {
      // Restore session-specific state
      dispatch(setDropped(sessionState.isDropped));
      dispatch(setSidebarOpen(sessionState.isSidebarOpen));
      dispatch(setActiveId(sessionState.activeId));
    }
  }, [dispatch]);

  // Save state to storage whenever it changes
  useEffect(() => {
    saveToLocalStorage({ builder: { isDropped, isSidebarOpen, currentSection, activeId }, form: { activeTab: 'standard', searchTerm: '', sections: [] } });
    saveToSessionStorage({ builder: { isDropped, isSidebarOpen, currentSection, activeId }, form: { activeTab: 'standard', searchTerm: '', sections: [] } });
  }, [isDropped, isSidebarOpen, currentSection, activeId]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor)
  );

  const handleDragStart = (event: DragStartEvent) => {
    console.log('Drag started:', event.active.id);
    dispatch(setActiveId(event.active.id as string));
  };

  const handleDragOver = (event: DragOverEvent) => {
    // Handle drag over logic if needed
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    console.log('Drag ended:', { activeId: active.id, overId: over?.id });
    console.log('Active data:', active.data.current);
    dispatch(setActiveId(null));

    if (!over) {
      console.log('No drop target');
      return;
    }

    const activeId = active.id as string;
    const overId = over.id as string;
    console.log('Processing drop:', { activeId, overId });

    // If dropping section on drop zone
    if (overId === 'drop-zone' && activeId === 'section-1') {
      dispatch(setDropped(true));
      return;
    }

    // If dropping field into a group
    if (activeId.startsWith('field-') && overId.startsWith('group-')) {
      console.log('Dropping field into group');
      const fieldData = active.data.current;
      console.log('Field data:', fieldData);
      
      if (fieldData?.type === 'field') {
        const newField = {
          id: `${fieldData.fieldId}-${Date.now()}`,
          type: getFieldType(fieldData.fieldName),
          label: fieldData.fieldName,
          placeholder: fieldData.fieldName === 'Email Address' ? 'Select Title Here' : undefined,
          options: getFieldOptions(fieldData.fieldName),
          required: false,
          fullWidth: false,
        };

        console.log('Creating new field:', newField);
        console.log('Adding to group:', overId);

        dispatch(addFieldToGroup({ groupId: overId, field: newField }));
      }
      return;
    }

    // If reordering groups within the section
    if (activeId.startsWith('group-') && overId.startsWith('group-')) {
      const oldIndex = currentSection.groups.findIndex((group: GroupType) => group.id === activeId);
      const newIndex = currentSection.groups.findIndex((group: GroupType) => group.id === overId);
      dispatch(reorderGroups({ oldIndex, newIndex }));
    }
  };

  const getFieldType = (fieldName: string): 'text' | 'radio' | 'checkbox' | 'photo' => {
    switch (fieldName) {
      case 'Last Name':
      case 'Email Address':
      case 'First Name':
      case 'Mobile Number':
      case 'State':
      case 'Gender':
      case 'Date of Birth':
        return 'text';
      case 'Do you have residency?':
        return 'radio';
      case 'Salutation':
        return 'checkbox';
      case 'Photo':
        return 'photo';
      default:
        return 'text';
    }
  };

  const getFieldOptions = (fieldName: string): string[] => {
    switch (fieldName) {
      case 'Do you have residency?':
        return ['Yes', 'No'];
      case 'Salutation':
        return ['Mr', 'Mrs', 'Alhaji', 'Dr'];
      case 'State':
        return ['Lagos', 'Abuja', 'Kano', 'Rivers', 'Ogun'];
      case 'Gender':
        return ['Male', 'Female', 'Other'];
      default:
        return [];
    }
  };

  // const handleSectionTitleChange = (title: string) => {
  //   dispatch(updateSectionTitle(title));
  // };

  const handleGroupTitleChange = (groupId: string, title: string) => {
    dispatch(updateGroupTitle({ groupId, title }));
  };

  const handleGroupRequiredChange = (groupId: string, required: boolean) => {
    dispatch(updateGroupRequired({ groupId, required }));
  };

  const handleAddGroup = () => {
    dispatch(addGroup());
  };

  const handleGroupMinimize = (groupId: string) => {
    dispatch(toggleGroupMinimize(groupId));
  };

  return (
    <div className={`builder ${isSidebarOpen ? 'sidebar-open' : ''}`}>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <div className="builder-content">
          {!isDropped ? (
            // Stage 1: Initial drag and drop state
            <>
              <div className="sections-panel">
               
                <DraggableSection
                  id="section-1"
                  title="Section 1"
                  content="Title Here"
                  required={false}
                />
              </div>
              <div className="drop-area">
                <DropZone />
              </div>
            </>
          ) : (
            // Stage 2: After drop - Section with Groups
            <div className="main-builder-area">
              <SortableContext items={currentSection.groups.map((g: GroupType) => g.id)} strategy={verticalListSortingStrategy}>
                {currentSection.groups.map((group: GroupType, index: number) => (
                  <React.Fragment key={group.id}>
                    <Group
                      id={group.id}
                      title={group.title}
                      required={group.required}
                      isMinimized={group.isMinimized}
                      fields={group.fields}
                      onTitleChange={(title) => handleGroupTitleChange(group.id, title)}
                      onRequiredChange={(required) => handleGroupRequiredChange(group.id, required)}
                      onDuplicate={() => console.log('Duplicate group:', group.id)}
                      onLink={() => console.log('Link group:', group.id)}
                      onMoreOptions={() => console.log('More options for group:', group.id)}
                      onMinimize={() => handleGroupMinimize(group.id)}
                      onFieldAdd={(field) => console.log('Add field:', field)}
                      onFieldUpdate={(fieldId, updates) => console.log('Update field:', fieldId, updates)}
                      onFieldRemove={(fieldId) => console.log('Remove field:', fieldId)}
                    />
                    {index < currentSection.groups.length - 1 && (
                      <GroupConnector onAddGroup={handleAddGroup} />
                    )}
                  </React.Fragment>
                ))}
              </SortableContext>

              {/* Add Group Button */}
              <div className="add-group-container">
                <button className="add-group-button" onClick={handleAddGroup}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="12" y1="5" x2="12" y2="19"/>
                    <line x1="5" y1="12" x2="19" y2="12"/>
                  </svg>
                </button>
              </div>

              {/* End Components */}
              <div className="end-components">
                <div className="end-component">End</div>
                <div className="end-component">End</div>
              </div>
            </div>
          )}

          {/* Right sidebar - Add Elements - Only show after section is dropped */}
          {isDropped && !isSidebarOpen && <AddElementsSidebar onSidebarToggle={() => dispatch(setSidebarOpen(true))} />}
        </div>

        {/* ElementsSidebar - Must be inside DndContext for drag and drop */}
        <ElementsSidebar 
          isOpen={isSidebarOpen} 
          onClose={() => dispatch(setSidebarOpen(false))} 
        />
      </DndContext>
    </div>
  );
};

export default Builder;
