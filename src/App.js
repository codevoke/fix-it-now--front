// React imports
import * as React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { BrowserView, MobileView } from 'react-device-detect';

// axios
import axios from 'axios';

// Pages import: desktop
import LendingPage from './desktop/LendingPage.js';
import LoginPage from './desktop/LoginPage.js';
import MainPage	from './desktop/MainPage.js';
import ProfilePage from './desktop/ProfilePage.js';
import TicketCreatePage from './desktop/TicketCreatePage.js';
import TicketViewPage	from './desktop/TicketViewPage.js';
// Pages import: mobile
import LendingPage_m from './mobile/LendingPage_m.js';
import LoginPage_m from './mobile/LoginPage_m.js';
import MainPage_m	from './mobile/MainPage_m.js';
import ProfilePage_m from './mobile/ProfilePage_m.js';
import TicketCreatePage_m from './mobile/TicketCreatePage_m.js';
import TicketViewPage_m	from './mobile/TicketViewPage_m.js';
import Header from "./desktop/components/Header";

// import custom components


export default function App() {
	axios.defaults.baseURL = 'https://fix-it-now.onrender.com';

	React.useEffect(()=>{
    if(localStorage.getItem('isLogin') === 'true')
      axios.post('/login', { 
        'username': localStorage.getItem('username'),
        'password': localStorage.getItem('password')
    	})
      .then(res=>{})
      .catch((error) => {
        localStorage.setItem('isLogin', 'false');
        localStorage.setItem('username', '');
        localStorage.setItem('password', '');
        localStorage.setItem('userId', '');
        window.location.reload();
			});
  }, [])

	return (
		<>
			<BrowserView>
				{/*// Browser pages:*/}
				<BrowserRouter>
				  <Header />
					<Routes>
		    	  <Route path="*" element={<LendingPage />} />
		      	<Route path="/login" element={<LoginPage />} />
		      	<Route path="/dashboard" element={<MainPage />} />
		      	<Route path="/account/:id" element={<ProfilePage />} />
		      	<Route path="/ticket/new" element={<TicketCreatePage />} />
		      	<Route path="/ticket/:id" element={<TicketViewPage />} />
		    	</Routes>
		  	</BrowserRouter>

				{/*// notifications:*/}
		  	<ToastContainer 
			  	position="bottom-right"
	  			autoClose={5000}
			  	hideProgressBar={false}
			  	newestOnTop={false}
			  	closeOnClick
			  	rtl={false}
			  	pauseOnFocusLoss
			  	draggable
			  	pauseOnHover
			  	theme="colored" />
			</BrowserView>

			<MobileView>
				{/*// Mobile pages:*/}
				<BrowserRouter>
			 		{/*<Header />*/}
					<Routes>                    // __m == mobile
		    	 		<Route path="*" element={<LendingPage_m />} />
		    	 		<Route path="/login" element={<LoginPage_m />} />
		    	 		<Route path="/dashboard" element={<MainPage_m />} />
		    	 		<Route path="/account" element={<ProfilePage_m />} />
		    	 		<Route path="/ticket/new" element={<TicketCreatePage_m />} />
		    	 		<Route path="/ticket/:id" element={<TicketViewPage_m />} />
		   			</Routes>
		  		</BrowserRouter>
				{/*// notifications:*/}
	  			<ToastContainer
      				position="top-right"
      				autoClose={5000}
      				hideProgressBar={false}
      				newestOnTop={false}
      				closeOnClick
      				rtl={false}
      				pauseOnFocusLoss
      				draggable
      				pauseOnHover
      				theme="colored"/>
			</MobileView>
		</>
	);
}