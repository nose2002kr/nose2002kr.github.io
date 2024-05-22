import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Frame from './frame';
import Login from './component/login';
import { AuthContextProvider } from './AuthContext';
import myInitObject from './testest'

function App() {
  return (
    	<div className='App'>
		<AuthContextProvider>
			<BrowserRouter>
				<Routes>
					{/* <Route path="/login" element={<Login />}></Route> */}
					
				<Route
					path="/*" 
					element={ console.log('hello ' + myInitObject.login) ? <Login /> : <Frame />}
				/>
					{/* 상단에 위치하는 라우트들의 규칙을 모두 확인, 일치하는 라우트가 없는경우 처리 */}
					{/* <Route path="*" element={<NotFound />}></Route> */}
				</Routes>
			</BrowserRouter>
		</AuthContextProvider>

		</div>
  );
}

export default App;
