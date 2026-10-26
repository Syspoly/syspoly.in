import React from 'react';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft } from 'lucide-react';
import Container from '../components/Container';
import Button from '../components/Button';

const NotFoundPage = () => {
  return (
    <>
      <Helmet>
        <title>404 - Page Not Found | System Polygon</title>
      </Helmet>

      <div className="min-h-screen pt-36 pb-20 flex items-center justify-center text-center">
        <Container>
          <div className="glass-card rounded-3xl p-12 max-w-lg mx-auto space-y-6">
            <h1 className="text-6xl font-extrabold text-electric-400">404</h1>
            <h2 className="text-2xl font-bold text-white">Page Not Found</h2>
            <p className="text-slate-400 text-sm">
              The page you are looking for does not exist or has been relocated.
            </p>
            <Button to="/" variant="primary" icon={ArrowLeft}>
              Return to Homepage
            </Button>
          </div>
        </Container>
      </div>
    </>
  );
};

export default NotFoundPage;
