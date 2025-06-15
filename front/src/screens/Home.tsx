import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Modal, Dimensions, Platform } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import { LineChart } from 'react-native-chart-kit';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from '../styles/clientDashboard.styles';


type Refrigerator = {
  id: number;
  model: string;
  status: string;
};

type AlertData = {
  type: string;
  message: string;
  location: string;
  time: string;
};

type Client = {
  id: number;
  name: string;
  address: string;
  lat: number;
  lng: number;
  refrigerators: number;
  status: string;
  alerts: number;
  refrigeratorData: Refrigerator[];
  alertsData: AlertData[];
};

const ClientDashboard = () => {
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [showClientDetail, setShowClientDetail] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);
  const [activeTab, setActiveTab] = useState('realtime');
  
  // Sample client data
  const clients: Client[] = [
    { 
      id: 1, 
      name: "Tienda Don Pedro", 
      address: "Av. Insurgentes Sur 1234, Col. Del Valle", 
      lat: 19.423, 
      lng: -99.173, 
      refrigerators: 3, 
      status: "warning",
      alerts: 1,
      refrigeratorData: [
        { id: 1, model: "CR-400", status: "ok" },
        { id: 2, model: "CR-400", status: "warning" },
        { id: 3, model: "CR-500", status: "ok" }
      ],
      alertsData: [
        { type: "temperature", message: "Temperatura alta", location: "Refrigerador #2", time: "10 min atrás" }
      ]
    },
    { 
      id: 2, 
      name: "Abarrotes La Esquina", 
      address: "Calle Félix Cuevas 567, Col. Del Valle", 
      lat: 19.427, 
      lng: -99.177, 
      refrigerators: 2, 
      status: "ok",
      alerts: 0,
      refrigeratorData: [
        { id: 1, model: "CR-400", status: "ok" },
        { id: 2, model: "CR-500", status: "ok" }
      ],
      alertsData: []
    },
    { 
      id: 3, 
      name: "Minisuper 24/7", 
      address: "Av. Universidad 890, Col. Narvarte", 
      lat: 19.421, 
      lng: -99.169, 
      refrigerators: 1, 
      status: "error",
      alerts: 2,
      refrigeratorData: [
        { id: 1, model: "CR-300", status: "error" }
      ],
      alertsData: [
        { type: "error", message: "Falla en compresor", location: "Refrigerador #1", time: "2 horas atrás" },
        { type: "door", message: "Puerta abierta por tiempo prolongado", location: "Refrigerador #1", time: "30 min atrás" }
      ]
    },
    { 
      id: 4, 
      name: "Farmacia del Ahorro", 
      address: "Av. Coyoacán 456, Col. Del Valle", 
      lat: 19.429, 
      lng: -99.172, 
      refrigerators: 4, 
      status: "ok",
      alerts: 0,
      refrigeratorData: [
        { id: 1, model: "CR-400", status: "ok" },
        { id: 2, model: "CR-400", status: "ok" },
        { id: 3, model: "CR-500", status: "ok" },
        { id: 4, model: "CR-500", status: "ok" }
      ],
      alertsData: []
    }
  ];

  const handleMarkerPress = (client: Client) => {
    setSelectedClient(client);
    setShowClientDetail(true);
  };

  const openDashboard = () => {
    setShowClientDetail(false);
    setShowDashboard(true);
  };

  const closeAllModals = () => {
    setShowClientDetail(false);
    setShowDashboard(false);
    setSelectedClient(null);
  };

  // Chart data
  const tempChartData = {
    labels: ['8am', '10am', '12pm', '2pm', '4pm', '6pm', '8pm'],
    datasets: [
      {
        data: [4.2, 4.5, 5.1, 5.3, 4.9, 4.6, 4.3],
        color: (opacity = 1) => `rgba(0, 102, 255, ${opacity})`,
        strokeWidth: 2
      }
    ],
  };

  const energyChartData = {
    labels: ['8am', '10am', '12pm', '2pm', '4pm', '6pm', '8pm'],
    datasets: [
      {
        data: [0.8, 0.9, 1.2, 1.3, 1.1, 0.9, 0.8],
        color: (opacity = 1) => `rgba(16, 185, 129, ${opacity})`,
        strokeWidth: 2
      }
    ],
  };

  const historyChartData = {
    labels: ['1 Jun', '5 Jun', '10 Jun', '15 Jun', '20 Jun', '25 Jun', '30 Jun'],
    datasets: [
      {
        data: [4.3, 4.4, 4.2, 4.7, 4.9, 4.5, 4.3],
        color: (opacity = 1) => `rgba(0, 102, 255, ${opacity})`,
        strokeWidth: 2
      }
    ],
  };

  const chartConfig = {
    backgroundColor: '#ffffff',
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    decimalPlaces: 1,
    color: (opacity = 1) => `rgba(107, 114, 128, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(107, 114, 128, ${opacity})`,
    style: {
      borderRadius: 16
    },
    propsForDots: {
      r: '3',
      strokeWidth: '2',
      stroke: '#0066FF'
    }
  };

  return (
    <View style={styles.container}>
      {/* Map View */}
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 19.425,
          longitude: -99.175,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
        maxZoomLevel={15}
      >
        {clients.map(client => (
          <Marker
            key={client.id}
            coordinate={{ latitude: client.lat, longitude: client.lng }}
            onPress={() => handleMarkerPress(client)}
          >
            <View style={[
              styles.marker, 
              client.status === 'ok' && styles.markerOk,
              client.status === 'warning' && styles.markerWarning,
              client.status === 'error' && styles.markerError
            ]} />
          </Marker>
        ))}
      </MapView>

      {/* Add Client Button */}
      <TouchableOpacity style={styles.addButton} onPress={() => console.log('Add client')}>
        <Icon name="add" size={24} color="white" />
      </TouchableOpacity>

      {/* Client Detail Modal */}
      <Modal
        visible={showClientDetail}
        animationType="slide"
        transparent={true}
        onRequestClose={closeAllModals}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Detalles del Cliente</Text>
              <TouchableOpacity onPress={closeAllModals}>
                <Icon name="close" size={24} color="#4B5563" />
              </TouchableOpacity>
            </View>
            
            {selectedClient && (
              <ScrollView>
                <View style={styles.clientInfo}>
                  <Text style={styles.clientName}>{selectedClient.name}</Text>
                  <Text style={styles.clientAddress}>{selectedClient.address}</Text>
                  <View style={styles.statusContainer}>
                    <View style={[
                      styles.statusBadge,
                      selectedClient.status === 'ok' && styles.statusOk,
                      selectedClient.status === 'warning' && styles.statusWarning,
                      selectedClient.status === 'error' && styles.statusError
                    ]}>
                      <Text style={styles.statusText}>
                        {selectedClient.status === 'ok' ? 'Normal' : 
                         selectedClient.status === 'warning' ? `${selectedClient.alerts} Alerta` : 
                         `${selectedClient.alerts} Alertas`}
                      </Text>
                    </View>
                    <Text style={styles.refrigeratorCount}>{selectedClient.refrigerators} Refrigeradores</Text>
                  </View>
                </View>
                
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>Estado de refrigeradores</Text>
                  <View style={styles.refrigeratorList}>
                    {selectedClient.refrigeratorData.map((refrigerator, index) => (
                      <View key={refrigerator.id} style={styles.refrigeratorItem}>
                        <View style={styles.refrigeratorIcon}>
                          <Icon name="kitchen" size={20} color="#3B82F6" />
                        </View>
                        <View style={styles.refrigeratorInfo}>
                          <Text style={styles.refrigeratorName}>Refrigerador #{index + 1}</Text>
                          <Text style={styles.refrigeratorModel}>Modelo {refrigerator.model}</Text>
                        </View>
                        <View style={[
                          styles.statusBadgeSmall,
                          refrigerator.status === 'ok' && styles.statusOk,
                          refrigerator.status === 'warning' && styles.statusWarning,
                          refrigerator.status === 'error' && styles.statusError
                        ]}>
                          <Text style={styles.statusText}>
                            {refrigerator.status === 'ok' ? 'Normal' : 
                             refrigerator.status === 'warning' ? 'Alerta' : 'Falla'}
                          </Text>
                        </View>
                      </View>
                    ))}
                  </View>
                </View>
                
                <View style={styles.buttonRow}>
                  <TouchableOpacity 
                    style={[styles.button, styles.secondaryButton]}
                    onPress={openDashboard}
                  >
                    <Icon name="dashboard" size={16} color="#374151" style={styles.buttonIcon} />
                    <Text style={[styles.buttonText, styles.secondaryButtonText]}>Ver dashboard</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.button, styles.primaryButton]}>
                    <Icon name="description" size={16} color="white" style={styles.buttonIcon} />
                    <Text style={[styles.buttonText, styles.primaryButtonText]}>Generar reporte</Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            )}
          </View>
        </View>
      </Modal>

      {/* Dashboard Modal */}
      <Modal
        visible={showDashboard}
        animationType="slide"
        transparent={true}
        onRequestClose={closeAllModals}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.dashboardModalContent}>
            <View style={styles.dashboardHeader}>
              <View style={styles.headerRow}>
                <Text style={styles.dashboardTitle}>Dashboard - {selectedClient?.name}</Text>
                <TouchableOpacity onPress={closeAllModals}>
                  <Icon name="close" size={24} color="white" />
                </TouchableOpacity>
              </View>
              
              <View style={styles.tabContainer}>
                <TouchableOpacity 
                  style={[styles.tab, activeTab === 'realtime' && styles.activeTab]}
                  onPress={() => setActiveTab('realtime')}
                >
                  <Text style={[styles.tabText, activeTab === 'realtime' && styles.activeTabText]}>Tiempo real</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[styles.tab, activeTab === 'history' && styles.activeTab]}
                  onPress={() => setActiveTab('history')}
                >
                  <Text style={[styles.tabText, activeTab === 'history' && styles.activeTabText]}>Historial</Text>
                </TouchableOpacity>
              </View>
            </View>
            
            <ScrollView style={styles.dashboardBody}>
              {activeTab === 'realtime' ? (
                <>
                  {/* Metrics Summary */}
                  <View style={styles.metricsRow}>
                    <View style={styles.metricCard}>
                      <Text style={styles.metricLabel}>Refrigeradores activos</Text>
                      <View style={styles.metricValueContainer}>
                        <Text style={styles.metricValue}>{selectedClient?.refrigerators}</Text>
                        <Text style={styles.metricPercentage}>100%</Text>
                      </View>
                    </View>
                    
                    <View style={styles.metricCard}>
                      <Text style={styles.metricLabel}>Alertas activas</Text>
                      <View style={styles.metricValueContainer}>
                        <Text style={styles.metricValue}>{selectedClient?.alerts}</Text>
                        <Text style={styles.metricAlert}>↑ {selectedClient?.alerts}</Text>
                      </View>
                    </View>
                  </View>
                  
                  {/* Temperature Chart */}
                  <View style={styles.chartContainer}>
                    <View style={styles.chartHeader}>
                      <Text style={styles.chartTitle}>Temperatura promedio</Text>
                      <Text style={styles.chartSubtitle}>Últimas 24h</Text>
                    </View>
                    <LineChart
                      data={tempChartData}
                      width={Dimensions.get('window').width * 0.85}
                      height={180}
                      chartConfig={chartConfig}
                      bezier
                      style={styles.chart}
                    />
                  </View>
                  
                  {/* Energy Chart */}
                  <View style={styles.chartContainer}>
                    <View style={styles.chartHeader}>
                      <Text style={styles.chartTitle}>Consumo energético</Text>
                      <Text style={styles.chartSubtitle}>Últimas 24h</Text>
                    </View>
                    <LineChart
                      data={energyChartData}
                      width={Dimensions.get('window').width * 0.85}
                      height={180}
                      chartConfig={chartConfig}
                      bezier
                      style={styles.chart}
                    />
                  </View>
                  
                  {/* Door Openings */}
                  <View style={styles.doorContainer}>
                    <View style={styles.chartHeader}>
                      <Text style={styles.chartTitle}>Aperturas de puerta</Text>
                      <Text style={styles.chartSubtitle}>Hoy</Text>
                    </View>
                    <View style={styles.doorGrid}>
                      {selectedClient?.refrigeratorData.map((refrigerator, index) => (
                        <View key={refrigerator.id} style={styles.doorItem}>
                          <Text style={styles.doorCount}>12</Text>
                          <Text style={styles.doorLabel}>Refri #{index + 1}</Text>
                        </View>
                      ))}
                    </View>
                  </View>
                  
                  {/* Recent Alerts */}
                  <View style={styles.alertsContainer}>
                    <Text style={styles.sectionTitle}>Alertas recientes</Text>
                    {selectedClient?.alertsData.length > 0 ? (
                      selectedClient.alertsData.map((alert, index) => (
                        <View key={index} style={styles.alertItem}>
                          <View style={[
                            styles.alertIconContainer,
                            alert.type === 'temperature' && styles.alertIconTemperature,
                            alert.type === 'door' && styles.alertIconDoor,
                            alert.type === 'error' && styles.alertIconError
                          ]}>
                            <Icon name="warning" size={20} color="white" />
                          </View>
                          <View style={styles.alertInfo}>
                            <Text style={styles.alertMessage}>{alert.message}</Text>
                            <Text style={styles.alertDetails}>{alert.location} • {alert.time}</Text>
                          </View>
                        </View>
                      ))
                    ) : (
                      <View style={styles.noAlerts}>
                        <Text style={styles.noAlertsText}>No hay alertas activas</Text>
                      </View>
                    )}
                  </View>
                </>
              ) : (
                <>
                  {/* History Tab */}
                  <View style={styles.filterContainer}>
                    <Text style={styles.filterLabel}>Filtrar por fecha</Text>
                    <View style={styles.dateRow}>
                      <View style={styles.dateInput}>
                        <Text style={styles.datePlaceholder}>2023-06-01</Text>
                      </View>
                      <Text style={styles.dateSeparator}>a</Text>
                      <View style={styles.dateInput}>
                        <Text style={styles.datePlaceholder}>2023-06-30</Text>
                      </View>
                    </View>
                    
                    <Text style={styles.filterLabel}>Tipo de datos</Text>
                    <View style={styles.selectInput}>
                      <Text style={styles.selectText}>Temperatura</Text>
                      <Icon name="arrow-drop-down" size={24} color="#6B7280" />
                    </View>
                    
                    <TouchableOpacity style={styles.filterButton}>
                      <Text style={styles.filterButtonText}>Aplicar filtros</Text>
                    </TouchableOpacity>
                  </View>
                  
                  <View style={styles.chartContainer}>
                    <View style={styles.chartHeader}>
                      <Text style={styles.chartTitle}>Historial de temperatura</Text>
                      <Text style={styles.chartSubtitle}>Junio 2023</Text>
                    </View>
                    <LineChart
                      data={historyChartData}
                      width={Dimensions.get('window').width * 0.85}
                      height={180}
                      chartConfig={chartConfig}
                      bezier
                      style={styles.chart}
                    />
                  </View>
                  
                  <View style={styles.historyList}>
                    {[1, 2, 3].map((item) => (
                      <View key={item} style={styles.historyItem}>
                        <View>
                          <Text style={styles.historyDate}>30 de junio, 2023</Text>
                          <Text style={styles.historyInfo}>Temperatura promedio: 4.5°C</Text>
                        </View>
                        <TouchableOpacity>
                          <Text style={styles.historyButton}>Ver</Text>
                        </TouchableOpacity>
                      </View>
                    ))}
                  </View>
                </>
              )}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
};



export default ClientDashboard;