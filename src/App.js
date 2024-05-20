import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Login from './component/login';
import Frame from './frame';

function App() {
  return (
    <div className='App'>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Login />}></Route>
					<Route path="/frame/*" element={<Frame />}></Route>
					{/* 상단에 위치하는 라우트들의 규칙을 모두 확인, 일치하는 라우트가 없는경우 처리 */}
					{/* <Route path="*" element={<NotFound />}></Route> */}
				</Routes>
			</BrowserRouter>
		</div>
  );
}

export default App;
