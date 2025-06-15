import { StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({
 
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    map: {
      flex: 1,
    },
    marker: {
      width: 18,
      height: 18,
      borderRadius: 9,
      borderWidth: 2,
      borderColor: 'white',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.3,
      shadowRadius: 2,
      elevation: 2,
    },
    markerOk: {
      backgroundColor: '#10B981',
    },
    markerWarning: {
      backgroundColor: '#F59E0B',
    },
    markerError: {
      backgroundColor: '#EF4444',
    },
    addButton: {
      position: 'absolute',
      bottom: 24,
      right: 16,
      width: 56,
      height: 56,
      borderRadius: 28,
      backgroundColor: '#DC2626',
      alignItems: 'center',
      justifyContent: 'center',
      shadowColor: '#DC2626',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 10,
      elevation: 5,
    },
    modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalContent: {
      width: '90%',
      maxWidth: 380,
      backgroundColor: 'white',
      borderRadius: 16,
      padding: 24,
      maxHeight: '80%',
    },
    dashboardModalContent: {
      width: '90%',
      maxWidth: 400,
      backgroundColor: 'white',
      borderRadius: 16,
      maxHeight: '80%',
      overflow: 'hidden',
    },
    modalHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 16,
    },
    modalTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#1F2937',
    },
    clientInfo: {
      marginBottom: 16,
    },
    clientName: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 4,
      color: '#1F2937',
    },
    clientAddress: {
      fontSize: 14,
      color: '#6B7280',
      marginBottom: 8,
    },
    statusContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    statusBadge: {
      paddingVertical: 4,
      paddingHorizontal: 10,
      borderRadius: 12,
      marginRight: 8,
    },
    statusBadgeSmall: {
      paddingVertical: 2,
      paddingHorizontal: 8,
      borderRadius: 12,
    },
    statusOk: {
      backgroundColor: '#E3FCF2',
    },
    statusWarning: {
      backgroundColor: '#FEF3C7',
    },
    statusError: {
      backgroundColor: '#FEE2E2',
    },
    statusText: {
      fontSize: 12,
      fontWeight: '600',
    },
    refrigeratorCount: {
      fontSize: 12,
      color: '#6B7280',
    },
    section: {
      borderTopWidth: 1,
      borderTopColor: '#E5E7EB',
      paddingTop: 16,
      marginBottom: 16,
    },
    sectionTitle: {
      fontWeight: '500',
      marginBottom: 12,
      color: '#1F2937',
    },
    refrigeratorList: {
      gap: 8,
    },
    refrigeratorItem: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#F9FAFB',
      borderRadius: 12,
      padding: 12,
    },
    refrigeratorIcon: {
      width: 32,
      height: 32,
      borderRadius: 16,
      backgroundColor: '#FEE2E2',
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 12,
    },
    refrigeratorInfo: {
      flex: 1,
    },
    refrigeratorName: {
      fontWeight: '500',
      fontSize: 14,
      color: '#1F2937',
    },
    refrigeratorModel: {
      fontSize: 12,
      color: '#6B7280',
    },
    buttonRow: {
      flexDirection: 'row',
      gap: 8,
      marginTop: 24,
    },
    button: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 10,
      paddingHorizontal: 16,
      borderRadius: 8,
    },
    primaryButton: {
      backgroundColor: '#DC2626',
    },
    secondaryButton: {
      backgroundColor: '#F3F4F6',
    },
    buttonText: {
      fontWeight: '500',
      fontSize: 14,
    },
    primaryButtonText: {
      color: 'white',
    },
    secondaryButtonText: {
      color: '#374151',
    },
    buttonIcon: {
      marginRight: 4,
    },
    dashboardHeader: {
      padding: 20,
      backgroundColor: '#DC2626',
    },
    headerRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    dashboardTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: 'white',
    },
    tabContainer: {
      flexDirection: 'row',
      borderBottomWidth: 1,
      borderBottomColor: 'rgba(255, 255, 255, 0.2)',
      marginTop: 16,
    },
    tab: {
      paddingVertical: 12,
      paddingHorizontal: 16,
    },
    activeTab: {
      borderBottomWidth: 2,
      borderBottomColor: 'white',
      marginBottom: -1,
    },
    tabText: {
      fontSize: 14,
      fontWeight: '500',
      color: 'rgba(255, 255, 255, 0.7)',
    },
    activeTabText: {
      color: 'white',
    },
    dashboardBody: {
      padding: 20,
      maxHeight: Dimensions.get('window').height * 0.6,
    },
    metricsRow: {
      flexDirection: 'row',
      gap: 12,
      marginBottom: 16,
    },
    metricCard: {
      flex: 1,
      backgroundColor: '#F9FAFB',
      borderRadius: 12,
      padding: 16,
    },
    metricLabel: {
      fontSize: 12,
      color: '#6B7280',
      marginBottom: 4,
    },
    metricValueContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    metricValue: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#1F2937',
    },
    metricPercentage: {
      fontSize: 12,
      color: '#10B981',
      fontWeight: '500',
    },
    metricAlert: {
      fontSize: 12,
      color: '#EF4444',
      fontWeight: '500',
    },
    chartContainer: {
      backgroundColor: 'white',
      borderRadius: 12,
      borderWidth: 1,
      borderColor: '#F3F4F6',
      padding: 16,
      marginBottom: 16,
    },
    chartHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 8,
    },
    chartTitle: {
      fontWeight: '500',
      color: '#1F2937',
    },
    chartSubtitle: {
      fontSize: 12,
      color: '#6B7280',
    },
    chart: {
      marginVertical: 8,
      borderRadius: 16,
    },
    doorContainer: {
      backgroundColor: 'white',
      borderRadius: 12,
      borderWidth: 1,
      borderColor: '#F3F4F6',
      padding: 16,
      marginBottom: 16,
    },
    doorGrid: {
      flexDirection: 'row',
      gap: 8,
      marginTop: 12,
    },
    doorItem: {
      flex: 1,
      backgroundColor: '#F9FAFB',
      borderRadius: 12,
      padding: 12,
      alignItems: 'center',
    },
    doorCount: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#1F2937',
    },
    doorLabel: {
      fontSize: 12,
      color: '#6B7280',
    },
    alertsContainer: {
      marginBottom: 16,
    },
    alertItem: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#F9FAFB',
      borderRadius: 12,
      padding: 12,
      marginBottom: 8,
    },
    alertIconContainer: {
      width: 40,
      height: 40,
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 12,
    },
    alertIconTemperature: {
      backgroundColor: '#FECACA',
    },
    alertIconDoor: {
      backgroundColor: '#FEF3C7',
    },
    alertIconError: {
      backgroundColor: '#FECACA',
    },
    alertInfo: {
      flex: 1,
    },
    alertMessage: {
      fontWeight: '500',
      fontSize: 14,
      color: '#1F2937',
    },
    alertDetails: {
      fontSize: 12,
      color: '#6B7280',
    },
    noAlerts: {
      backgroundColor: '#F9FAFB',
      borderRadius: 12,
      padding: 16,
      alignItems: 'center',
    },
    noAlertsText: {
      color: '#6B7280',
    },
    filterContainer: {
      marginBottom: 16,
    },
    filterLabel: {
      fontSize: 14,
      fontWeight: '500',
      color: '#374151',
      marginBottom: 8,
    },
    dateRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
      marginBottom: 16,
    },
    dateInput: {
      flex: 1,
      borderWidth: 1,
      borderColor: '#E5E7EB',
      borderRadius: 8,
      padding: 12,
    },
    datePlaceholder: {
      color: '#9CA3AF',
    },
    dateSeparator: {
      color: '#6B7280',
    },
    selectInput: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: '#E5E7EB',
      borderRadius: 8,
      padding: 12,
      marginBottom: 16,
    },
    selectText: {
      color: '#1F2937',
    },
    filterButton: {
      backgroundColor: '#DC2626',
      borderRadius: 8,
      padding: 12,
      alignItems: 'center',
    },
    filterButtonText: {
      color: 'white',
      fontWeight: '500',
    },
    historyList: {
      gap: 8,
    },
    historyItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: '#F9FAFB',
      borderRadius: 12,
      padding: 12,
    },
    historyDate: {
      fontWeight: '500',
      color: '#1F2937',
    },
    historyInfo: {
      fontSize: 12,
      color: '#6B7280',
    },
    historyButton: {
      color: '#DC2626',
      fontWeight: '500',
    },
});

export default styles;
