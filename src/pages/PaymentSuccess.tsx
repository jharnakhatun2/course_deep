import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router";

const PaymentSuccess = () => {
  const location = useLocation();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');

  useEffect(() => {
    // read success info from navigation state
    if (location.state && (location.state as any).success) {
      setStatus('success');
    } else {
      setStatus('error');
    }
  }, [location.state]);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="p-8 text-center">
        {status === 'loading' && (
          <>
            <div className="text-6xl mb-4">⏳</div>
            <h2 className="text-2xl font-bold mb-4">Processing Payment...</h2>
          </>
        )}
        {status === 'success' && (
          <>
            <div className="text-4xl mb-4 text-green-500">✅</div>
            <h2 className="text-2xl mb-4 text-green-500">Payment Successful!</h2>
            <p className="mb-4">Thank you for your purchase.</p>
            <Link
              to="/dashboard"
              className="bg-yellow-500 text-white px-6 py-2 rounded hover:bg-yellow-600 transition-colors"
            >
              Go to Dashboard
            </Link>
          </>
        )}
        {status === 'error' && (
          <>
            <div className="text-4xl mb-4 text-red-500">❌</div>
            <h2 className="text-2xl mb-4 text-red-500">Payment Failed</h2>
            <p className="mb-4">Please try again.</p>
            <Link
              to="/cart"
              className="bg-yellow-500 text-white px-6 py-2 rounded hover:bg-yellow-600 transition-colors"
            >
              Back to Cart
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default PaymentSuccess;
