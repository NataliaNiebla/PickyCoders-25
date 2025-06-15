import React, { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

interface Cliente {
  _id: string;
  nombre: string;
}

interface DashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  cliente: Cliente;
}

export default function DashboardModal({ isOpen, onClose, cliente }: DashboardModalProps) {
  const [tab, setTab] = useState<'realtime' | 'history'>('realtime');
  const [datosTiempoReal, setDatosTiempoReal] = useState({
    temperatura: 0,
    corriente: 0,
    peso: 0,
    luz: 0
  });

  const chartRef = useRef<Chart | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Simulación de datos en tiempo real
  useEffect(() => {
    if (!isOpen) return;

    const intervalo = setInterval(() => {
      setDatosTiempoReal({
        temperatura: +(20 + Math.random() * 5).toFixed(1),
        corriente: +(1 + Math.random() * 2).toFixed(2),
        peso: +(5 + Math.random() * 10).toFixed(1),
        luz: +(200 + Math.random() * 100).toFixed(0)
      });
    }, 3000);

    return () => clearInterval(intervalo);
  }, [isOpen]);

  // Historial al cambiar a la pestaña "history"
  useEffect(() => {
    if (tab !== 'history' || !canvasRef.current) return;

    // Destruye el gráfico anterior si existe
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    chartRef.current = new Chart(canvasRef.current, {
      type: 'line',
      data: {
        labels: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'],
        datasets: [
          {
            label: 'Temperatura (°C)',
            data: [21, 22.5, 23, 22, 21.8, 22.2, 21.5],
            borderColor: '#0066FF',
            fill: false,
            tension: 0.4
          },
          {
            label: 'Corriente (A)',
            data: [1.1, 1.3, 1.5, 1.4, 1.2, 1.7, 1.6],
            borderColor: '#10B981',
            fill: false,
            tension: 0.4
          },
          {
            label: 'Peso (kg)',
            data: [7, 7.5, 8, 7.8, 8.2, 7.9, 8.1],
            borderColor: '#F59E0B',
            fill: false,
            tension: 0.4
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top'
          }
        }
      }
    });

    return () => {
      chartRef.current?.destroy();
    };
  }, [tab]);

  if (!isOpen) return null;

  return (
    <div className="modal active">
      <div className="modal-content dashboard-modal">
        {/* Header y Tabs */}
        <div className="dashboard-header">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-bold">
              Dashboard: {cliente.nombre}
            </h3>
            <button className="close-modal text-white" onClick={onClose}>
              &times;
            </button>
          </div>
          <div className="tab-container mt-4">
            <div
              className={`tab ${tab === 'realtime' ? 'active' : ''}`}
              onClick={() => setTab('realtime')}
            >
              Tiempo real
            </div>
            <div
              className={`tab ${tab === 'history' ? 'active' : ''}`}
              onClick={() => setTab('history')}
            >
              Historial
            </div>
          </div>
        </div>

        {/* Contenido por pestaña */}
        <div className="dashboard-body">
          {tab === 'realtime' && (
            <div className="tab-content active" id="realtime-tab">
              <div className="metric-card">
                <p><strong>Temperatura:</strong> {datosTiempoReal.temperatura} °C</p>
              </div>
              <div className="metric-card">
                <p><strong>Corriente:</strong> {datosTiempoReal.corriente} A</p>
              </div>
              <div className="metric-card">
                <p><strong>Peso:</strong> {datosTiempoReal.peso} kg</p>
              </div>
              <div className="metric-card">
                <p><strong>Luz:</strong> {datosTiempoReal.luz} lux</p>
              </div>
            </div>
          )}

          {tab === 'history' && (
            <div className="tab-content active" id="history-tab">
              <div className="chart-container">
                <canvas ref={canvasRef} width="100%" height="180"></canvas>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
