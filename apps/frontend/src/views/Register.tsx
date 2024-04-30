import React from 'react';
import RegisterForm from '../components/RegisterForm';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

const Register = () => {
    return (
        <div>
            <Header />
            <main>
                <h2>Register</h2>
                <RegisterForm />
                <Link to="/login">Already have an account? Login here.</Link>
            </main>
            <Footer />
        </div>
    );
};

export default Register;
