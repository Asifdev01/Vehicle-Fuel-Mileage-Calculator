import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import {
  Alert,
  Modal,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useLanguage } from '../../context/LanguageContext';
import i18n from '../../translation';

const APP_VERSION = '1.0.2';

const LANGUAGES = [
  { code: 'en', label: 'English' },
  { code: 'hi', label: 'हिन्दी (Hindi)' },
  { code: 'od', label: 'ଓଡ଼ିଆ (Odia)' },
  { code: 'malayalam', label: 'മലയാളം (Malayalam)' },
  { code: 'bengali', label: 'বাংলা (Bengali)' },
  { code: 'marathi', label: 'मराठी (Marathi)' },
  { code: 'tamil', label: 'தமிழ் (Tamil)' },
  { code: 'telugu', label: 'తెలుగు (Telugu)' },
];

export default function SettingsScreen() {
  const router = useRouter();
  const { locale, changeLanguage } = useLanguage();
  const [modalVisible, setModalVisible] = React.useState(false);

  const handleShare = async () => {
    try {
      await Share.share({
        message: i18n.t("shareWithFriends") || '', 
      });
    } catch (e) {
      Alert.alert(i18n.t("error"), i18n.t("couldNotShare"));
    }
  };

  const handleLanguage = () => {
    setModalVisible(true);
  };

  const handleSelectLanguage = (code: string) => {
    changeLanguage(code);
    setModalVisible(false);
  };

  const MENU_ITEMS = [
    {
      icon: 'language-outline' as const,
      label: i18n.t("language"),
      sub: i18n.t("changeAppLanguage"),
      onPress: handleLanguage,
    },
    {
      icon: 'share-social-outline' as const,
      label: i18n.t("shareWithFriends"),
      sub: i18n.t("spreadTheWord"),
      onPress: handleShare,
    },
    {
      icon: 'information-circle-outline' as const,
      label: i18n.t("aboutUs"),
      sub: i18n.t("learnMoreAboutUs"),
      onPress: () => router.push('/about' as any),
    },
    {
      icon: 'shield-checkmark-outline' as const,
      label: i18n.t("privacyPolicy"),
      sub: i18n.t("readOurPolicy"),
      onPress: () => router.push('/privacy' as any),
    },
  ];

  return (
    <View style={styles.root}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <Text style={styles.header}>{i18n.t("settings")}</Text>

        {/* Menu Card */}
        <View style={styles.card}>
          {MENU_ITEMS.map((item, i) => (
            <TouchableOpacity
              key={item.label}
              style={[styles.row, i < MENU_ITEMS.length - 1 && styles.rowBorder]}
              onPress={item.onPress}
              activeOpacity={0.65}
            >
              <View style={styles.iconCircle}>
                <Ionicons name={item.icon} size={22} color="#7c3aed" />
              </View>
              <View style={styles.rowText}>
                <Text style={styles.rowLabel}>{item.label}</Text>
                <Text style={styles.rowSub}>{item.sub}</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#c4b5fd" />
            </TouchableOpacity>
          ))}
        </View>

        {/* Version Footer */}
        <Text style={styles.version}>{i18n.t("appVersion", { version: APP_VERSION })}</Text>
      </ScrollView>

      {/* Language Modal */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPress={() => setModalVisible(false)}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>{i18n.t("selectLanguage")}</Text>
            <Text style={styles.modalSub}>{i18n.t("choosePreferredLanguage")}</Text>
            
            <ScrollView style={styles.languageList}>
              {LANGUAGES.map((lang, index) => {
                const isSelected = locale === lang.code;
                return (
                  <TouchableOpacity
                    key={lang.code}
                    style={[styles.languageOption, index < LANGUAGES.length - 1 && styles.rowBorder]}
                    onPress={() => handleSelectLanguage(lang.code)}
                  >
                    <Text style={[styles.languageText, isSelected && styles.languageTextSelected]}>
                      {lang.label}
                    </Text>
                    {isSelected && <Ionicons name="checkmark-circle" size={24} color="#7c3aed" />}
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
            
            <TouchableOpacity style={styles.modalCloseButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.modalCloseText}>{i18n.t("cancel")}</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#f3f0fa',
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 22,
    paddingTop: 80,
    paddingBottom: 130,
  },
  header: {
    fontSize: 28,
    fontWeight: '800',
    color: '#1a1033',
    marginBottom: 30,
    letterSpacing: -0.3,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    shadowColor: '#7c3aed',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 4,
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 18,
    paddingHorizontal: 18,
  },
  rowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#f0ecf7',
  },
  iconCircle: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#f3f0fa',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  rowText: {
    flex: 1,
  },
  rowLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1a1033',
  },
  rowSub: {
    fontSize: 12,
    color: '#9588b8',
    marginTop: 2,
  },
  version: {
    textAlign: 'center',
    color: '#c4b5fd',
    fontSize: 13,
    fontWeight: '600',
    marginTop: 40,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContainer: {
    width: '100%',
    maxHeight: '80%',
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 24,
    shadowColor: '#7c3aed',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 10,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#1a1033',
    marginBottom: 4,
  },
  modalSub: {
    fontSize: 14,
    color: '#9588b8',
    marginBottom: 20,
  },
  languageList: {
    maxHeight: 300,
  },
  languageOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
  },
  languageText: {
    fontSize: 16,
    color: '#1a1033',
    fontWeight: '500',
  },
  languageTextSelected: {
    fontWeight: '700',
    color: '#7c3aed',
  },
  modalCloseButton: {
    marginTop: 20,
    backgroundColor: '#f3f0fa',
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
  },
  modalCloseText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#7c3aed',
  },
});
