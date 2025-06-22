// src/routes/DeliveryRoutes.jsx
import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import DeliveryLayout from '../components/delivery/DeliveryLayout';
import Loading from '../components/Loading';

// Lazy load delivery pages
const DeliveryDashboard = lazy(() => import('../pages/delivery/DeliveryDashboard'));
const DeliveryOrdersPage = lazy(() => import('../pages/delivery/DeliveryOrdersPage'));
const DeliveryTrackingPage = lazy(() => import('../pages/delivery/DeliveryTrackingPage'));
const DeliveryEarningsPage = lazy(() => import('../pages/delivery/DeliveryEarningsPage'));

export default function DeliveryRoutes() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route element={<DeliveryLayout />}>
          <Route index element={<DeliveryDashboard />} />
          <Route path="orders" element={<DeliveryOrdersPage />} />
          <Route path="tracking" element={<DeliveryTrackingPage />} />
          <Route path="earnings" element={<DeliveryEarningsPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
}