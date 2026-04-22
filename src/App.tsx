import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Send, CheckCircle, Pill, DollarSign, Calendar, Clock, AlertTriangle, 
  Lock, User, LogOut, FileText, Search, LayoutDashboard, Users, 
  Settings, MessageSquare, Activity, Mail, PieChart, TrendingUp, Sun, Moon
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';
import './index.css';

interface PrescriptionData {
  medicineName: string;
  quantity: string;
  months: string;
  sideEffects: string;
  whenToTake: string;
  mrpPrice: string;
  givenPrice: string;
}

interface Patient {
  id: string;
  name: string;
  status: 'pending' | 'completed';
  prescription?: PrescriptionData;
}

// Initial mock data
const initialPatients: Patient[] = [
  { id: 'PAT-1029', name: 'Jane Doe', status: 'pending' },
  { 
    id: 'PAT-1088', name: 'John Smith', status: 'completed',
    prescription: {
      medicineName: 'Amoxicillin & Clavulanate', quantity: '30 Tablets', months: '2 Months',
      sideEffects: 'May cause mild nausea or dizziness.', whenToTake: '1 tablet twice a day after meals',
      mrpPrice: '150', givenPrice: '120'
    }
  },
  { id: 'PAT-1102', name: 'Alice Johnson', status: 'pending' },
  { id: 'PAT-1144', name: 'Bob Williams', status: 'pending' },
  { id: 'PAT-1150', name: 'Eva Green', status: 'completed', 
    prescription: {
      medicineName: 'Lisinopril 10mg', quantity: '60 Tablets', months: '2 Months',
      sideEffects: 'Dry cough, dizziness.', whenToTake: '1 tablet daily in the morning',
      mrpPrice: '80', givenPrice: '45'
    }
  }
];

const chartData = [
  { name: 'Mon', revenue: 4000, prescriptions: 24 },
  { name: 'Tue', revenue: 3000, prescriptions: 18 },
  { name: 'Wed', revenue: 5000, prescriptions: 35 },
  { name: 'Thu', revenue: 4200, prescriptions: 29 },
  { name: 'Fri', revenue: 6000, prescriptions: 42 },
  { name: 'Sat', revenue: 8000, prescriptions: 55 },
  { name: 'Sun', revenue: 7500, prescriptions: 48 },
];

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginCreds, setLoginCreds] = useState({ id: '', password: '' });
  
  const [currentView, setCurrentView] = useState<'dashboard' | 'patients'>('dashboard');
  
  const [patients, setPatients] = useState<Patient[]>(initialPatients);
  const [selectedPatientId, setSelectedPatientId] = useState<string>('PAT-1029');
  
  const [formData, setFormData] = useState<PrescriptionData>({
    medicineName: '', quantity: '', months: '', sideEffects: '',
    whenToTake: '', mrpPrice: '', givenPrice: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [theme, setTheme] = useState<'dark'|'light'>('dark');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const selectedPatient = patients.find(p => p.id === selectedPatientId);

  const pendingCount = patients.filter(p => p.status === 'pending').length;
  const completedCount = patients.filter(p => p.status === 'completed').length;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if(loginCreds.id && loginCreds.password) {
      setIsLoggedIn(true);
    }
  };

  const handleSelectPatient = (id: string) => {
    setSelectedPatientId(id);
    setSubmitted(false);
    setFormData({
      medicineName: '', quantity: '', months: '', sideEffects: '',
      whenToTake: '', mrpPrice: '', givenPrice: ''
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPatients(prev => prev.map(p => {
      if(p.id === selectedPatientId) {
        return { ...p, status: 'completed', prescription: { ...formData } };
      }
      return p;
    }));
    setTimeout(() => { setSubmitted(true); }, 500);
  };

  if (!isLoggedIn) {
    return (
      <div className="login-container">
        {/* Theme Toggle */}
        <button className="theme-toggle" onClick={() => setTheme(t => t === 'dark' ? 'light' : 'dark')}>
          {theme === 'dark' ? <Sun size={15}/> : <Moon size={15}/>}
          {theme === 'dark' ? 'Light' : 'Dark'}
        </button>
        <motion.div 
          className="login-card"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
        >
          <img src="/favicon.svg" alt="Logo" className="logo" />
          <h1>Supplier Login</h1>
          <p className="subtitle" style={{marginBottom: '2.5rem'}}>Secure Portal for Medical Suppliers</p>
          
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label><User size={14} /> Supplier ID</label>
              <input 
                type="text" className="input-field" placeholder="e.g. SUP-990"
                value={loginCreds.id} onChange={e => setLoginCreds({...loginCreds, id: e.target.value})} required
              />
            </div>
            <div className="form-group" style={{marginBottom: '2.5rem'}}>
              <label><Lock size={14} /> Password</label>
              <input 
                type="password" className="input-field" placeholder="Enter password"
                value={loginCreds.password} onChange={e => setLoginCreds({...loginCreds, password: e.target.value})} required
              />
            </div>
            <button type="submit" className="btn-primary" style={{padding: '1.2rem'}}>
              Continue to Dashboard
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="app-layout">
      {/* Theme Toggle */}
      <button className="theme-toggle" onClick={() => setTheme(t => t === 'dark' ? 'light' : 'dark')}>
        {theme === 'dark' ? <Sun size={15}/> : <Moon size={15}/>}
        {theme === 'dark' ? 'Light' : 'Dark'}
      </button>
      {/* MAIN LEFT NAVIGATION BAR */}
      <nav className="main-nav">
        <img src="/favicon.svg" alt="Logo" className="nav-logo" />
        
        <div 
          className={`nav-item ${currentView === 'dashboard' ? 'active' : ''}`}
          onClick={() => setCurrentView('dashboard')}
          title="Dashboard"
        >
          <LayoutDashboard size={22} />
        </div>
        <div 
          className={`nav-item ${currentView === 'patients' ? 'active' : ''}`}
          onClick={() => setCurrentView('patients')}
          title="Patients & Prescriptions"
        >
          <Users size={22} />
        </div>
        <div className="nav-item" title="Messages">
          <MessageSquare size={22} />
        </div>
        <div className="nav-item" title="Analytics">
          <PieChart size={22} />
        </div>
        
        <div className="nav-spacer" />
        
        <div className="nav-item" title="Settings">
          <Settings size={22} />
        </div>
        <div className="nav-item" onClick={() => setIsLoggedIn(false)} title="Logout">
          <LogOut size={22} />
        </div>
      </nav>

      {/* DASHBOARD VIEW */}
      {currentView === 'dashboard' && (
        <motion.div 
          className="main-content"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        >
          <div className="dashboard-header">
            <div className="header-greeting">
              <h1>Overview</h1>
              <p>Welcome back, Supplier 990. Here's your weekly performance.</p>
            </div>
            <div className="header-profile">
              <div style={{ textAlign: 'right' }}>
                <div style={{fontWeight: 600, color: 'white'}}>Dr. Supplier Network</div>
                <div style={{fontSize: '0.85rem', color: 'var(--text-muted)'}}>Premium Account</div>
              </div>
              <img src="/favicon.svg" alt="Profile" className="profile-img" style={{background: '#6366F1'}} />
            </div>
          </div>

          <div className="kpi-grid">
            <div className="kpi-card">
              <div className="kpi-header">
                <span className="kpi-title">Total Patients</span>
                <div className="kpi-icon blue"><Users size={20} /></div>
              </div>
              <div className="kpi-value">{patients.length}</div>
              <div className="kpi-trend up"><TrendingUp size={14}/> +12% this week</div>
            </div>
            <div className="kpi-card">
              <div className="kpi-header">
                <span className="kpi-title">Pending Action</span>
                <div className="kpi-icon yellow"><AlertTriangle size={20} /></div>
              </div>
              <div className="kpi-value">{pendingCount}</div>
              <div className="kpi-trend down" style={{color: 'var(--text-muted)'}}>-2 since yesterday</div>
            </div>
            <div className="kpi-card">
              <div className="kpi-header">
                <span className="kpi-title">Prescriptions Sent</span>
                <div className="kpi-icon green"><FileText size={20} /></div>
              </div>
              <div className="kpi-value">{completedCount}</div>
              <div className="kpi-trend up"><TrendingUp size={14}/> +4% this week</div>
            </div>
            <div className="kpi-card">
              <div className="kpi-header">
                <span className="kpi-title">Estimated Revenue</span>
                <div className="kpi-icon red"><DollarSign size={20} /></div>
              </div>
              <div className="kpi-value">$2,450</div>
              <div className="kpi-trend up"><TrendingUp size={14}/> +$340 this week</div>
            </div>
          </div>

          <div className="dashboard-grid">
            {/* Chart Widget */}
            <div className="widget-card">
              <div className="widget-header">
                <div className="widget-title">Prescription Volume (Weekly)</div>
                <select style={{background: 'transparent', color: 'var(--text-muted)', border: 'none', outline: 'none'}}>
                  <option>This Week</option>
                  <option>Last Week</option>
                </select>
              </div>
              <div style={{ height: 300, width: '100%' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6366F1" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#6366F1" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#374151" />
                    <XAxis dataKey="name" stroke="#9CA3AF" tick={{fontSize: 12}} axisLine={false} tickLine={false} />
                    <YAxis stroke="#9CA3AF" tick={{fontSize: 12}} axisLine={false} tickLine={false} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#1F2937', borderColor: '#374151', borderRadius: '8px' }}
                      itemStyle={{ color: '#F9FAFB' }}
                    />
                    <Area type="monotone" dataKey="prescriptions" stroke="#6366F1" strokeWidth={3} fillOpacity={1} fill="url(#colorPv)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Recent Activity Widget */}
            <div className="widget-card">
              <div className="widget-header">
                <div className="widget-title">Recent Dispatches</div>
                <div style={{color: 'var(--primary)', fontSize: '0.9rem', cursor: 'pointer', fontWeight: 500}}>View All</div>
              </div>
              <div className="activity-list">
                {patients.filter(p => p.status === 'completed').map((p, idx) => (
                  <div className="activity-item" key={idx}>
                    <div className="activity-icon"><CheckCircle size={20} /></div>
                    <div className="activity-details">
                      <div className="activity-title">Prescription sent to {p.name}</div>
                      <div className="activity-time">ID: {p.id}</div>
                    </div>
                    <div className="activity-amount">${p.prescription?.givenPrice}</div>
                  </div>
                ))}
                <div className="activity-item">
                  <div className="activity-icon" style={{color: 'var(--secondary)'}}><Activity size={20} /></div>
                  <div className="activity-details">
                    <div className="activity-title">Database Sync</div>
                    <div className="activity-time">2 hours ago</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* PATIENTS VIEW (Split View) */}
      {currentView === 'patients' && (
        <>
          <div className="sidebar">
            <div className="sidebar-header">
              <div className="sidebar-title">Manage Patients</div>
              <div style={{fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.2rem'}}>Add or review prescriptions</div>
            </div>

            <div style={{padding: '1rem', borderBottom: '1px solid var(--border)'}}>
              <div style={{position: 'relative'}}>
                <Search size={16} style={{position: 'absolute', top: '12px', left: '12px', color: 'var(--text-muted)'}} />
                <input 
                  type="text" className="input-field" placeholder="Search patients..."
                  style={{paddingLeft: '2.5rem', fontSize: '0.9rem', padding: '0.6rem 2.5rem', borderRadius: '8px'}}
                />
              </div>
            </div>

            <div className="patient-list">
              <h3 style={{fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '1rem', letterSpacing: '0.05em'}}>
                Patient Queue
              </h3>
              
              {patients.map(p => (
                <div 
                  key={p.id} 
                  className={`patient-card ${selectedPatientId === p.id ? 'active' : ''}`}
                  onClick={() => handleSelectPatient(p.id)}
                >
                  <div className="patient-name">
                    {p.name}
                    <span className={`badge ${p.status === 'completed' ? 'done' : ''}`}>
                      {p.status === 'completed' ? 'Prescribed' : 'Action Required'}
                    </span>
                  </div>
                  <div style={{fontSize: '0.8rem', color: 'var(--text-muted)'}}>ID: {p.id}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="main-content" style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <AnimatePresence mode="wait">
              {selectedPatient && selectedPatient.status === 'completed' && !submitted ? (
                <motion.div 
                  key="view" className="view-panel"
                  initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.3 }}
                >
                  <div style={{display: 'flex', alignItems: 'center', gap: '1.2rem', marginBottom: '2.5rem'}}>
                    <div style={{background: 'rgba(99, 102, 241, 0.1)', padding: '1.2rem', borderRadius: '16px'}}>
                      <FileText size={32} color="var(--primary)" />
                    </div>
                    <div>
                      <h1 style={{fontSize: '1.6rem', marginBottom: '0.2rem', color: 'white'}}>Prescription Profile</h1>
                      <p style={{color: 'var(--text-muted)', margin: 0}}>Viewing dispatched data for {selectedPatient.name}</p>
                    </div>
                  </div>

                  <div style={{display: 'flex', flexDirection: 'column', gap: '0.2rem'}}>
                    <div className="view-row">
                      <span className="view-label">Medicine</span>
                      <span className="view-value">{selectedPatient.prescription?.medicineName}</span>
                    </div>
                    <div className="view-row">
                      <span className="view-label">Quantity</span>
                      <span className="view-value">{selectedPatient.prescription?.quantity}</span>
                    </div>
                    <div className="view-row">
                      <span className="view-label">Course Duration</span>
                      <span className="view-value">{selectedPatient.prescription?.months}</span>
                    </div>
                    <div className="view-row">
                      <span className="view-label">Regimen</span>
                      <span className="view-value">{selectedPatient.prescription?.whenToTake}</span>
                    </div>
                    <div className="view-row">
                      <span className="view-label">Side Effects Warning</span>
                      <span className="view-value" style={{color: '#F87171'}}>{selectedPatient.prescription?.sideEffects}</span>
                    </div>
                    <div className="view-row">
                      <span className="view-label">Market Price</span>
                      <span className="view-value" style={{textDecoration: 'line-through', color: 'var(--text-muted)'}}>${selectedPatient.prescription?.mrpPrice}</span>
                    </div>
                    <div className="view-row" style={{border: 'none', paddingBottom: 0, paddingTop: '1.5rem'}}>
                      <span className="view-label" style={{alignSelf: 'flex-end'}}>Supplier Price</span>
                      <span className="view-value" style={{color: 'var(--secondary)', fontSize: '1.8rem', fontWeight: 700}}>${selectedPatient.prescription?.givenPrice}</span>
                    </div>
                  </div>
                </motion.div>
              ) : !submitted ? (
                <motion.div 
                  key="form" className="form-panel"
                  initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.3 }}
                >
                  <h1 style={{fontSize: '1.6rem', color: 'white'}}>Create Prescription</h1>
                  <p className="subtitle">Entering details for Patient <strong>{selectedPatient?.name}</strong>.</p>

                  <form onSubmit={handleSubmit}>
                    <div className="grid-2">
                      <div className="form-group full">
                        <label><Pill size={14} /> Medicine Name & Dosage</label>
                        <input 
                          type="text" className="input-field" 
                          value={formData.medicineName} onChange={e => setFormData({...formData, medicineName: e.target.value})}
                          placeholder="e.g. Amoxicillin 500mg" required
                        />
                      </div>

                      <div className="form-group">
                        <label>Quantity</label>
                        <input 
                          type="text" className="input-field" 
                          value={formData.quantity} onChange={e => setFormData({...formData, quantity: e.target.value})}
                          placeholder="e.g. 30 Tablets" required
                        />
                      </div>
                      <div className="form-group">
                        <label><Calendar size={14} /> Course Duration</label>
                        <input 
                          type="text" className="input-field" 
                          value={formData.months} onChange={e => setFormData({...formData, months: e.target.value})}
                          placeholder="e.g. 2 Months" required
                        />
                      </div>

                      <div className="form-group">
                        <label><DollarSign size={14} /> Market Price (MRP)</label>
                        <input 
                          type="number" className="input-field" 
                          value={formData.mrpPrice} onChange={e => setFormData({...formData, mrpPrice: e.target.value})}
                          placeholder="e.g. 150" required
                        />
                      </div>
                      <div className="form-group">
                        <label><DollarSign size={14} /> Supplier Price</label>
                        <input 
                          type="number" className="input-field" 
                          value={formData.givenPrice} onChange={e => setFormData({...formData, givenPrice: e.target.value})}
                          placeholder="e.g. 120" required
                        />
                      </div>

                      <div className="form-group full">
                        <label><Clock size={14} /> Usage Regimen</label>
                        <input 
                          type="text" className="input-field" 
                          value={formData.whenToTake} onChange={e => setFormData({...formData, whenToTake: e.target.value})}
                          placeholder="e.g. 1 tablet twice a day after meals" required
                        />
                      </div>

                      <div className="form-group full" style={{marginBottom: '0'}}>
                        <label><AlertTriangle size={14} /> Side Effects & Warnings</label>
                        <textarea 
                          className="input-field" 
                          value={formData.sideEffects} onChange={e => setFormData({...formData, sideEffects: e.target.value})}
                          placeholder="List potential side effects like nausea, dizziness..." required
                        />
                      </div>
                    </div>

                    <div style={{marginTop: '2.5rem'}}>
                      <button type="submit" className="btn-primary">
                        <Send size={18} /> Push Prescription to Patient API
                      </button>
                    </div>
                  </form>
                </motion.div>
              ) : (
                <motion.div 
                  key="success" className="view-panel success-message"
                  initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: "spring", stiffness: 200, damping: 15 }}
                >
                  <CheckCircle className="success-icon" style={{width: 64, height: 64}} />
                  <h1 style={{fontSize: '1.8rem', color: 'white'}}>Data Dispatched!</h1>
                  <p className="subtitle" style={{marginTop: '0.5rem'}}>
                    Prescription securely forwarded to Patient {selectedPatient?.name} ({selectedPatient?.id}). The patient app will now accurately display everything at checkout.
                  </p>
                  
                  <button 
                    onClick={() => setSubmitted(false)} 
                    className="btn-primary" 
                    style={{ background: 'transparent', border: '1px solid var(--border)', boxShadow: 'none' }}
                  >
                    View Active Record
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </>
      )}
    </div>
  );
};

export default App;
