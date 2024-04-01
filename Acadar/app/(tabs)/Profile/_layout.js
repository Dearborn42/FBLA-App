import { Drawer } from "expo-router/drawer";
import { GestureHandlerRootView } from 'react-native-gesture-handler';


export default function DrawerLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
        <Drawer>
          <Drawer.Screen name="Account" />
          <Drawer.Screen name="Classes" />
          <Drawer.Screen name="Clubs" />
          <Drawer.Screen name="Arts" />
          <Drawer.Screen name="Sports" />
          <Drawer.Screen name="Community-service-Jobs" />
        </Drawer>
    </GestureHandlerRootView>
  );
}