import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import DashboardScreen from "../screens/DashboardScreen";
import CoolersListScreen from "../screens/CoolersListScreen";
import MaintenanceScreen from "../screens/MaintenanceScreen";
import HelpScreen from "../screens/HelpScreen";
import ProfileScreen from "../screens/ProfileScreen";


const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator initialRouteName="Dashboard">
        <Drawer.Screen name="Dashboard" component={DashboardScreen} />
        <Drawer.Screen name="Coolers" component={CoolersListScreen} />
        <Drawer.Screen name="Mantenimiento" component={MaintenanceScreen} />
        <Drawer.Screen name="Ayuda" component={HelpScreen} />
        <Drawer.Screen name="Perfil" component={ProfileScreen} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
