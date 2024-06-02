import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Card from './component/card'
import { AuthContextProvider } from './context/AuthContext';
import { CardContextProvider } from './context/CardContext';
import { NotificationContainer } from 'react-notifications';
import 'react-notifications/lib/notifications.css';

import { setupWorker } from 'msw/browser'
import { handlers } from './api_mock'
 
if (process.env.NODE_ENV === 'development') {
	console.log(process.env.NODE_ENV)
	const worker = setupWorker(...handlers)
	worker.start();
}

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
		<NotificationContainer/>
		</div>
  );
}

export default App;
