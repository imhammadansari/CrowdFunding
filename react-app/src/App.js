import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import HomePage from './Pages/HomePage'; 
import Dashboard from './Pages/Dashboard'; 
import DonorDashboard from './Pages/DonorDashboard'; 
import Login from './Pages/Login'; 
import PaymentForm from './Pages/PaymentForm'; 
import PostRequest from './Pages/PostRequest'; 
import Signup from './Pages/Signup'; 
import ViewHistory from './Pages/ViewHistory'; 
import Contact from './Pages/Contact'; 
import AdminDashboard from './Pages/AdminDashboard'; 
import FundingRequestDetail from './Pages/FundingRequestDetail'; 
import DonorFundingRequests from './Pages/DonorFundingRequests'; 
import PaymentSuccess from './Pages/PaymentSuccess'; 
import AllPayments from './Pages/AllPayments'; 
import AdminLogin from './Pages/AdminLogin';
import AdminSignup from './Pages/AdminSignup';
import ViewHistoryRequest from './Pages/ViewHistoryRequest';

function App() {
    return (
            <Routes>
                <Route path='/' element = {<Navigate to="/home" />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/donor_dashboard" element={<DonorDashboard />} />
                <Route path="/login" element={<Login />} />
                <Route path="/payment/:id" element={<PaymentForm />} />
                <Route path="/post_request" element={<PostRequest />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/view_history/:id" element={<ViewHistory />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/admin_dashboard" element={<AdminDashboard />} />
                <Route path="/requests/:id" element={<FundingRequestDetail />} />
                <Route path="/request/:id" element={<DonorFundingRequests />} />
                <Route path="/payment_success/:requestId" element={<PaymentSuccess />} />
                <Route path="/all_payments" element={<AllPayments />} />
                <Route path="/admin_login" element={<AdminLogin />} />
                <Route path="/admin_signup_safe" element={<AdminSignup />} />
                <Route path="/view_request/:id" element={<ViewHistoryRequest />} />

            </Routes>
    );
}

export default App;