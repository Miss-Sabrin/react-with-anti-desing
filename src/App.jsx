import { BrowserRouter } from 'react-router-dom';
import AppFooter from './components/AppFooter';
import AppHeader from './components/AppHeader';
import PageContent from './components/PageContent';
function App() {
 

  return (
    <div className="App">
      <BrowserRouter>
      
   
      <AppHeader/>
      <PageContent/>
      <AppFooter/>  
      
       </BrowserRouter>

      
    </div>
  )
}

export default App
