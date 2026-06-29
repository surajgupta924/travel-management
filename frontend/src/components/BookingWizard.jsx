import { useState } from 'react';
import { FiCheck, FiCreditCard, FiCalendar } from 'react-icons/fi';
import toast from 'react-hot-toast';
import API from '../services/api';
import { getErrorMessage } from '../utils/getErrorMessage';

const STEPS = ['Trip Details', 'Traveler Info', 'Payment'];

const BookingWizard = ({ pkg, onClose, onSuccess }) => {
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [bookingId, setBookingId] = useState(null);
  const [form, setForm] = useState({
    travelDate: '',
    numberOfTravelers: 1,
    specialRequests: '',
    travelers: [{ name: '', age: '', passportNumber: '' }],
    paymentMethod: 'card',
    cardNumber: '',
    cardName: '',
  });

  const total = pkg.price * form.numberOfTravelers;

  const updateTravelers = (count) => {
    const travelers = Array.from({ length: count }, (_, i) => form.travelers[i] || { name: '', age: '', passportNumber: '' });
    setForm({ ...form, numberOfTravelers: count, travelers });
  };

  const handleCreateBooking = async () => {
    setLoading(true);
    try {
      const res = await API.post('/bookings', {
        tourPackage: pkg._id,
        travelDate: form.travelDate,
        numberOfTravelers: form.numberOfTravelers,
        specialRequests: form.specialRequests,
        travelers: form.travelers.filter((t) => t.name),
      });
      setBookingId(res.data.data._id);
      setStep(2);
      toast.success('Booking reserved! Complete payment to confirm.');
    } catch (err) {
      toast.error(getErrorMessage(err, 'Booking failed'));
    } finally {
      setLoading(false);
    }
  };

  const handlePayment = async () => {
    if (!form.cardName || form.cardNumber.length < 8) {
      toast.error('Enter valid payment details');
      return;
    }
    setLoading(true);
    try {
      const res = await API.post(`/bookings/${bookingId}/pay`, { paymentMethod: form.paymentMethod });
      toast.success(`Payment successful! Ref: ${res.data.transactionId}`);
      onSuccess?.(res.data.data);
      onClose();
    } catch (err) {
      toast.error(getErrorMessage(err, 'Payment failed'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal booking-wizard" onClick={(e) => e.stopPropagation()}>
        <div className="wizard-header">
          <h2>Book: {pkg.title}</h2>
          <div className="wizard-steps">
            {STEPS.map((s, i) => (
              <div key={s} className={`wizard-step ${i <= step ? 'active' : ''} ${i < step ? 'done' : ''}`}>
                <span className="wizard-step-num">{i < step ? <FiCheck /> : i + 1}</span>
                <span>{s}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="wizard-body">
          {step === 0 && (
            <>
              <div className="form-group">
                <label><FiCalendar /> Travel Date</label>
                <input type="date" className="form-control" required min={new Date().toISOString().split('T')[0]} value={form.travelDate} onChange={(e) => setForm({ ...form, travelDate: e.target.value })} />
              </div>
              <div className="form-group">
                <label>Number of Travelers</label>
                <input type="number" className="form-control" min={1} max={pkg.maxGroupSize} value={form.numberOfTravelers} onChange={(e) => updateTravelers(Number(e.target.value))} />
              </div>
              <div className="form-group">
                <label>Special Requests</label>
                <textarea className="form-control" rows={3} value={form.specialRequests} onChange={(e) => setForm({ ...form, specialRequests: e.target.value })} placeholder="Dietary needs, accessibility..." />
              </div>
              <div className="wizard-summary">
                <span>Total</span>
                <strong>${total}</strong>
              </div>
            </>
          )}

          {step === 1 && (
            <>
              <p className="muted" style={{ marginBottom: 16 }}>Enter details for each traveler</p>
              {form.travelers.map((t, i) => (
                <div key={i} className="traveler-block">
                  <h4>Traveler {i + 1}</h4>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Full Name</label>
                      <input className="form-control" value={t.name} onChange={(e) => {
                        const travelers = [...form.travelers];
                        travelers[i] = { ...travelers[i], name: e.target.value };
                        setForm({ ...form, travelers });
                      }} />
                    </div>
                    <div className="form-group">
                      <label>Age</label>
                      <input type="number" className="form-control" value={t.age} onChange={(e) => {
                        const travelers = [...form.travelers];
                        travelers[i] = { ...travelers[i], age: e.target.value };
                        setForm({ ...form, travelers });
                      }} />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Passport Number</label>
                    <input className="form-control" value={t.passportNumber} onChange={(e) => {
                      const travelers = [...form.travelers];
                      travelers[i] = { ...travelers[i], passportNumber: e.target.value };
                      setForm({ ...form, travelers });
                    }} />
                  </div>
                </div>
              ))}
            </>
          )}

          {step === 2 && (
            <>
              <div className="payment-summary card card-body">
                <h4>Order Summary</h4>
                <div className="summary-row"><span>{pkg.title}</span><span>${pkg.price} × {form.numberOfTravelers}</span></div>
                <div className="summary-row total"><span>Total</span><strong>${total}</strong></div>
              </div>
              <div className="form-group">
                <label><FiCreditCard /> Payment Method</label>
                <select className="form-control" value={form.paymentMethod} onChange={(e) => setForm({ ...form, paymentMethod: e.target.value })}>
                  <option value="card">Credit / Debit Card</option>
                  <option value="paypal">PayPal</option>
                  <option value="bank">Bank Transfer</option>
                </select>
              </div>
              <div className="form-group">
                <label>Cardholder Name</label>
                <input className="form-control" placeholder="John Doe" value={form.cardName} onChange={(e) => setForm({ ...form, cardName: e.target.value })} />
              </div>
              <div className="form-group">
                <label>Card Number</label>
                <input className="form-control" placeholder="4242 4242 4242 4242" maxLength={19} value={form.cardNumber} onChange={(e) => setForm({ ...form, cardNumber: e.target.value })} />
              </div>
              <p className="payment-note">🔒 Demo payment — no real charges. Use any card number.</p>
            </>
          )}
        </div>

        <div className="wizard-footer">
          {step > 0 && step < 2 && (
            <button type="button" className="btn btn-outline" onClick={() => setStep(step - 1)}>Back</button>
          )}
          <button type="button" className="btn btn-outline" onClick={onClose}>Cancel</button>
          {step === 0 && (
            <button type="button" className="btn btn-primary" disabled={!form.travelDate || loading} onClick={() => setStep(1)}>
              Continue
            </button>
          )}
          {step === 1 && (
            <button type="button" className="btn btn-primary" disabled={loading} onClick={handleCreateBooking}>
              {loading ? 'Reserving...' : 'Reserve & Pay'}
            </button>
          )}
          {step === 2 && (
            <button type="button" className="btn btn-primary btn-lg" disabled={loading} onClick={handlePayment}>
              {loading ? 'Processing...' : `Pay $${total}`}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingWizard;
