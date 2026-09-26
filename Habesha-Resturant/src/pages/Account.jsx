import { useState } from 'react';
import Header from '../components/Header';
import BottomNav from '../components/BottomNav';
import { IoLockClosedOutline, IoEyeOutline, IoEyeOffOutline, IoMailOutline, IoPhonePortraitOutline, IoArrowForward, IoClose, IoAlertCircle } from 'react-icons/io5';
import { loginPhoneSchema, loginEmailSchema, validateForm } from '../validation/schemas';
import mesobTableImg from '../assets/images/royal_platter.png';
import './Account.css';

export default function Account() {
  const [loginMethod, setLoginMethod] = useState('phone'); // 'phone' | 'email'
  const [phoneValue, setPhoneValue] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [shakeFields, setShakeFields] = useState({});

  const markTouched = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const doValidation = () => {
    const schema = loginMethod === 'phone' ? loginPhoneSchema : loginEmailSchema;
    const data = loginMethod === 'phone'
      ? { phone: phoneValue, password: passwordValue }
      : { email: emailValue, password: passwordValue };
    const result = validateForm(schema, data);
    setErrors(result.errors);
    return result;
  };

  const getError = (field) => {
    return touched[field] ? errors[field] : null;
  };

  const fieldClass = (field, base = 'account-input') => {
    const err = getError(field);
    const shake = shakeFields[field];
    return `${base} ${err ? 'input-error' : ''} ${shake ? 'shake' : ''}`;
  };

  const handleSignIn = (e) => {
    e.preventDefault();
    // Touch all fields
    if (loginMethod === 'phone') {
      setTouched({ phone: true, password: true });
    } else {
      setTouched({ email: true, password: true });
    }
    const result = doValidation();
    if (!result.success) {
      const newShake = {};
      Object.keys(result.errors).forEach((key) => { newShake[key] = true; });
      setShakeFields(newShake);
      setTimeout(() => setShakeFields({}), 600);
      return;
    }
    // Validation passed — would send to API
    alert('Login successful! 🎉 (Demo)');
  };

  // Clear errors when switching methods
  const switchMethod = (method) => {
    setLoginMethod(method);
    setErrors({});
    setTouched({});
  };

  return (
    <div className="account-page">
      <Header />
      
      <div className="account-container">
        
        <div className="welcome-section">
          <div className="welcome-text-area">
             <span className="enkuan-text">▪ ENKUAN DEHNA METACHU</span>
             <h1>Welcome to the Mesob Table</h1>
             <p>Sign in to manage your feasts, Telebirr rewards, and reserved dining mesobs.</p>
          </div>
          <div className="welcome-img-wrap">
             <img src={mesobTableImg} alt="Mesob Table" />
          </div>
        </div>

        <div className="quick-logins">
          <button className="telebirr-btn">
             <div className="telebirr-icon">
                <span role="img" aria-label="telebirr">💰</span>
             </div>
             <div className="telebirr-text">
               <h4>Telebirr SuperApp Fast Login</h4>
               <p>Instant one-tap verification via Ethio Telecom</p>
             </div>
          </button>
          
          <button className="google-btn">
             <svg width="18" height="18" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
             Continue with Google
          </button>
        </div>

        <div className="divider">
          <span>OR WITH PHONE / EMAIL</span>
        </div>

        <div className="login-tabs">
          <button 
            className={`login-tab ${loginMethod === 'phone' ? 'active' : ''}`}
            onClick={() => switchMethod('phone')}
          >
            <IoPhonePortraitOutline size={18} />
            Ethiopian Mobile (+251)
          </button>
          <button 
            className={`login-tab ${loginMethod === 'email' ? 'active' : ''}`}
            onClick={() => switchMethod('email')}
          >
            <IoMailOutline size={18} />
            Email Address
          </button>
        </div>

        <form onSubmit={handleSignIn} noValidate>
          <div className="form-group">
            <div className="label-row">
              <label>{loginMethod === 'phone' ? 'Mobile Number' : 'Email Address'}</label>
              {loginMethod === 'phone' && <span className="network-hint">Ethio Telecom / Safaricom</span>}
            </div>
            <div className="input-wrapper">
               {loginMethod === 'phone' && (
                 <div className="country-code">
                   <span className="flag">🇪🇹</span>
                   <span>+251</span>
                   <span className="dropdown-arrow">▼</span>
                 </div>
               )}
               <input 
                 type={loginMethod === 'phone' ? 'tel' : 'email'} 
                 placeholder={loginMethod === 'phone' ? '91123 4567' : 'name@example.com'} 
                 className={fieldClass(loginMethod === 'phone' ? 'phone' : 'email', '')}
                 value={loginMethod === 'phone' ? phoneValue : emailValue}
                 onChange={(e) => {
                   loginMethod === 'phone' ? setPhoneValue(e.target.value) : setEmailValue(e.target.value);
                 }}
                 onBlur={() => markTouched(loginMethod === 'phone' ? 'phone' : 'email')}
                 id="login-identity-input"
               />
            </div>
            {getError(loginMethod === 'phone' ? 'phone' : 'email') && (
              <span className="field-error">
                <IoAlertCircle size={13} /> {getError(loginMethod === 'phone' ? 'phone' : 'email')}
              </span>
            )}
          </div>

          <div className="form-group">
            <label>Secret Password / PIN</label>
            <div className="input-wrapper">
               <IoLockClosedOutline color="#A0988A" size={18} className="input-icon-left" />
               <input 
                 type={showPassword ? 'text' : 'password'} 
                 placeholder="••••••••" 
                 className={fieldClass('password', '')}
                 value={passwordValue}
                 onChange={(e) => setPasswordValue(e.target.value)}
                 onBlur={() => markTouched('password')}
                 id="login-password-input"
               />
               <button 
                 type="button"
                 className="password-toggle-btn"
                 onClick={() => setShowPassword(!showPassword)}
                 tabIndex={-1}
               >
                 {showPassword 
                   ? <IoEyeOffOutline color="#A0988A" size={18} /> 
                   : <IoEyeOutline color="#A0988A" size={18} />
                 }
               </button>
            </div>
            {getError('password') && (
              <span className="field-error">
                <IoAlertCircle size={13} /> {getError('password')}
              </span>
            )}
          </div>

          <div className="form-options">
            <label className="checkbox-label">
              <input type="checkbox" />
              <span className="checkmark"></span>
              Remember me on this phone
            </label>
            <a href="#" className="forgot-link">Forgot PIN?</a>
          </div>

          <div className="action-buttons">
            <button type="submit" className="sign-in-btn" id="sign-in-button">
              Sign In to Mesob House <IoArrowForward size={18} />
            </button>
            <button type="button" className="guest-btn">
              Continue as Guest <IoClose size={18} />
            </button>
          </div>
        </form>

        <div className="register-card">
           <div className="register-icon">🎉</div>
           <div className="register-info">
             <h4>New to our dining family?</h4>
             <p>Join the Mesob Table and get 50 ETB welcome credit.</p>
           </div>
           <a href="#" className="register-link">Register</a>
        </div>

        <div className="benefits-section">
          <div className="benefits-header">
             <h4><span className="star-icon">⭐</span> Mesob Member Benefits</h4>
             <span className="tier-badge">GURSHA TIER</span>
          </div>
          <div className="benefits-cards">
             <div className="benefit-card">
                <span className="benefit-icon">♾️</span>
                <h5>10 Gursha Pts</h5>
                <p>Per ETB 100 spent</p>
             </div>
             <div className="benefit-card">
                <span className="benefit-icon" style={{color:'#389E0D'}}>🛵</span>
                <h5>Free Bole Drop</h5>
                <p>Kazanchis & Bole zone</p>
             </div>
             <div className="benefit-card">
                <span className="benefit-icon" style={{color:'#F5A623'}}>☕</span>
                <h5>Jebena Buna</h5>
                <p>Sunday Roasting VIP</p>
             </div>
          </div>
        </div>

        <div className="footer-slogan">
          <span className="slogan-icon">⬡</span>
          One shared plate, infinite connections.
        </div>

      </div>

      <div className="bottom-spacer" />
      <BottomNav />
    </div>
  );
}
