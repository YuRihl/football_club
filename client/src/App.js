import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Header from './Header/Header';
import { HomePage, ResultsPage, SquadPage, EmployeesPage } from './pages';

import './App.css';
import FootballerPage from './pages/FootballerPage';
import TrainersPage from './pages/TrainersPage';
import ContractList from './pages/ContractList';
import TransferList from './pages/TransferList';

function App() {
	return (
		<Router>
			<div className="App">
				<Header />
				<Routes>
					<Route path='/' element={<HomePage />} />
					<Route path='squad'>
						<Route index element={<SquadPage />} />
						<Route path=':id'>
							<Route index element={<FootballerPage />} />
							<Route path='contracts' element={<ContractList />}/>
							<Route path='transfer' element={<TransferList/>}/>
						</Route>
					</Route>

					<Route path='/results' element={<ResultsPage />}/>
					<Route path='/employees' element={<EmployeesPage />}/>
					<Route path='/trainers' element={<TrainersPage />}/>
				</Routes>
			</div>
		</Router>
	);
}

export default App;
