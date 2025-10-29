import React, { useState } from 'react';
import { Provider } from 'react-redux';
import { store } from './shared/store';
import { Header, Sidebar, Builder } from './features';
// import { Footer } from './features/layout/components';
import './styles/global/App.scss';

function App() {
  const [activeTab, setActiveTab] = useState('Builder');
  const [activeSection, setActiveSection] = useState(1);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const handleSectionChange = (section: number) => {
    setActiveSection(section);
  };

  return (
    <Provider store={store}>
      <div className="App">
        <Sidebar activeSection={activeSection} onSectionChange={handleSectionChange} />
        <div className="main-layout">
          <Header activeTab={activeTab} onTabChange={handleTabChange} />
          <main className={`main-content ${activeTab !== 'Builder' ? 'first-page' : ''}`}>
            {activeTab === 'Builder' ? (
              <Builder />
            ) : (
              <div className="content-area">
                <h2>Welcome to the Student Leave Request Form</h2>
                <p>Current active tab: {activeTab}</p>
                <p>Current active section: {activeSection}</p>
              </div>
            )}
          </main>
          {/* <Footer /> */}
        </div>
      </div>
    </Provider>
  );
}

export default App;
