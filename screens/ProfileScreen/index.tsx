import React from 'react';
import {
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  StyleSheet,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import { Text } from '@rneui/themed';
import { MaterialIcons, Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const Profile = () => {
  const navigation = useNavigation<any>();

  const menuItems = [
    { icon: 'shopping-bag', label: 'My Orders', disabled: true },
    { icon: 'heart', label: 'Wishlist', disabled: true },
    { icon: 'credit-card', label: 'Payment Methods', disabled: true },
    { icon: 'settings', label: 'Settings', disabled: true },
    { icon: 'help-circle', label: 'Help & Support', disabled: true },
    { icon: 'log-out', label: 'Logout', color: '#DB3022', disabled: false },
  ];

  const handlePress = (label: string) => {
    if (label === 'Logout') {
      navigation.navigate('Login');
    } else {
      console.log(`${label} is disabled for now.`);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#d32f2f"
        animated={true}
      />

      <Text style={styles.header}>My Profile</Text>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.profileCard}>
          <Image
            source={{ uri: 'https://i.pravatar.cc/150?img=12' }}
            style={styles.avatar}
          />
          <View style={styles.userInfo}>
            <Text style={styles.userName}>James Ugbanu</Text>
            <Text style={styles.userEmail}>james.ugbanu@example.com</Text>
          </View>
        </View>

        {/* ✅ Menu Section */}
        <View style={styles.menuSection}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.menuItem,
                item.disabled && { opacity: 0.5 }, // gray out disabled items
              ]}
              activeOpacity={0.7}
              onPress={() => handlePress(item.label)}
              disabled={item.disabled}
            >
              <Feather
                name={item.icon as any}
                size={22}
                color={item.color || '#DB3022'}
              />
              <Text
                style={[
                  styles.menuLabel,
                  item.color ? { color: item.color } : {},
                ]}
              >
                {item.label}
              </Text>
              <MaterialIcons
                name="keyboard-arrow-right"
                size={22}
                color="#999"
                style={{ marginLeft: 'auto' }}
              />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingHorizontal: 10 },

  header: {
    marginTop:50,
    fontSize: 22,
    fontWeight: '700',
    color: '#d32f2f',
    marginVertical: 15,
    textAlign: 'center',
  },
  profileCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    marginBottom: 25,
    shadowColor: '#DB3022',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 3,
    borderColor: '#DB3022',
    marginBottom: 12,
  },
  userInfo: { alignItems: 'center' },
  userName: { fontSize: 20, fontWeight: '700', color: '#222' },
  userEmail: { fontSize: 14, color: '#888', marginTop: 4 },
  menuSection: {
    backgroundColor: '#fff',
    borderRadius: 16,
    shadowColor: '#DB3022',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    paddingVertical: 10,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderColor: '#f2f2f2',
  },
  menuLabel: {
    fontSize: 16,
    color: '#222',
    marginLeft: 14,
    fontWeight: '500',
  },
});
