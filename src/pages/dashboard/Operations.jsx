import { useState, useEffect } from 'react';
import ClientLayout from '../../components/ClientLayout';

export default function Operations() {
  const [operations, setOperations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchOperations();
  }, []);

  const fetchOperations = async () => {
    try {
      // TODO: Replace with real API call
      // const token = localStorage.getItem('accessToken');
      // const response = await fetch('http://localhost:3000/v1/operations', {
      //   headers: { 'Authorization': `Bearer ${token}` }
      // });
      // const data = await response.json();
      // setOperations(data.operations || []);
      
      setOperations([]);
    } catch (error) {
      console.error('Failed to fetch operations:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <ClientLayout>
        <div style={{ padding: '2rem', color: '#FFF' }}>
          <div style={{ textAlign: 'center' }}>Loading...</div>
        </div>
      </ClientLayout>
    );
  }

  return (
    <ClientLayout>
      <div style={{ padding: '2rem', color: '#FFF' }}>
        <div style={{ marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.5rem', textTransform: 'uppercase' }}>
            Operations
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.7)' }}>
            Maker-Checker workflow for token operations
          </p>
        </div>

        {/* Workflow Explanation */}
        <div style={{ 
          marginBottom: '2rem', 
          padding: '1.5rem', 
          border: '1px solid #FFF',
          backgroundColor: 'rgba(255,255,255,0.1)'
        }}>
          <h3 style={{ fontWeight: 'bold', marginBottom: '1rem' }}>Maker-Checker Workflow</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', fontSize: '0.875rem' }}>
            <div>
              <div style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>1️⃣ Maker Creates</div>
              <div style={{ color: 'rgba(255,255,255,0.7)' }}>
                API key with MAKER role creates operation (mint, withdraw, burn)
              </div>
            </div>
            <div>
              <div style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>2️⃣ Checker Reviews</div>
              <div style={{ color: 'rgba(255,255,255,0.7)' }}>
                API key with CHECKER role approves or rejects the operation
              </div>
            </div>
            <div>
              <div style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>3️⃣ System Executes</div>
              <div style={{ color: 'rgba(255,255,255,0.7)' }}>
                Approved operations are automatically executed on blockchain
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
          {['all', 'pending', 'approved', 'rejected'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                padding: '0.5rem 1rem',
                border: '1px solid #FFF',
                backgroundColor: filter === f ? '#FFF' : 'transparent',
                color: filter === f ? '#000' : '#FFF',
                cursor: 'pointer',
                textTransform: 'uppercase',
                fontSize: '0.875rem'
              }}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Operations List */}
        {operations.length === 0 ? (
          <div style={{ 
            textAlign: 'center', 
            padding: '3rem', 
            border: '2px dashed rgba(255,255,255,0.3)'
          }}>
            <p style={{ color: 'rgba(255,255,255,0.7)' }}>No operations found</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gap: '1.5rem' }}>
            {operations.map((op) => (
              <div key={op.id} style={{ border: '1px solid #FFF', padding: '1.5rem' }}>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{op.type}</h3>
              </div>
            ))}
          </div>
        )}
      </div>
    </ClientLayout>
  );
}
