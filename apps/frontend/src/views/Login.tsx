import React from 'react';
import LoginForm from '../components/LoginForm';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

const Login = () => {
    return (
        <div>
            <Header />
            <main>
                <div className="wrapper">
                <div className="container w-50">
			</div>
                </div>
                <h2>Login</h2>
                <LoginForm />
                <Link to="/register">Need an account? Register here.</Link>
            </main>
            <Footer />
        </div>
    );
};

export default Login;
