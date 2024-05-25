import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Card from './component/card'
import { AuthContextProvider } from './context/AuthContext';
import { CardContextProvider } from './context/CardContext';

function App() {
  return (
    	<div className='App'>
		<CardContextProvider>
		<AuthContextProvider>
			<BrowserRouter>
				<Routes>
				<Route
					path="/*" 
					element={<Card/>} />
				</Routes>
			</BrowserRouter>
		</AuthContextProvider>
		</CardContextProvider>

		</div>
  );
}

export default App;
