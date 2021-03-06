import React from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  Share,
  Clipboard
} from 'react-native';
import { Colors } from '~/theme';
import { getHeight, getWidth, Metrics } from '~/utils/pixelResolver';
import { NavigationService, routes } from '~/navigation/helpers';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo';
import { DEVICE_WIDTH, DEVICE_HEIGHT } from '~/common/constants';
import styles from './styles';
// import QRCode from 'react-native-qrcode';
import { QRCode } from 'react-native-custom-qr-codes';
import { connect } from 'react-redux';
import { setDopdownAlert as setDopdownAlertAction } from '~/redux/notification/actions';

const colorTheme = Colors.royalBlue; // Color theme can be 16 color palette themes

const ReceiveMyQcCode = (props: TReceiveQcCode) => {
  const { setDopdownAlert } = props;
  const { currentWallet } = props;
  const publicKey = currentWallet && currentWallet.publicKey;

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: publicKey
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };
  const copyToClipboard = publicKey => {
    Clipboard.setString(publicKey);
    setDopdownAlert('custom', 'COPIED');
  };
  return (
    <View
      style={{
        ...styles.containerStyle,
        backgroundColor: colorTheme
      }}
    >
      <StatusBar
        barStyle={
          colorTheme === Colors.royalBlue ||
          colorTheme === '#8959DD' ||
          colorTheme === '#A650A6' ||
          colorTheme === '#4649FD' ||
          colorTheme === '#E32C2C' ||
          colorTheme === '#5F5F7C'
            ? 'light-content'
            : 'dark-content'
        }
      />
      <SafeAreaView
        style={{
          ...styles.safeAreaView,
          marginBottom:
            Metrics.getiPhoneX_Dimensions().height === DEVICE_HEIGHT &&
            Metrics.getiPhoneX_Dimensions().width === DEVICE_WIDTH
              ? getHeight(60)
              : getHeight(48)
        }}
      >
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => {
            NavigationService.pop();
          }}
        >
          <Ionicons name="ios-arrow-back" size={25} color={Colors.white} />
        </TouchableOpacity>
        <View style={styles.qrContainer}>
          <View style={styles.qrWrapper}>
            <QRCode
              content={publicKey}
              ecl="M"
              backgroundColor="white"
              color="black"
              size={230}
            />
          </View>
          <View style={styles.textWrapper}>
            <Text style={styles.qrText}>{publicKey}</Text>
          </View>
        </View>
        <View style={styles.actionsView}>
          <View style={styles.actionsWrapper}>
            <TouchableOpacity
              style={styles.actionItemWrapper}
              onPress={() => copyToClipboard(publicKey)}
            >
              <View style={styles.actionIconBackground}>
                <FontAwesome5 name="copy" size={20} color={Colors.white} />
              </View>
              <Text style={styles.actionText}>Copy</Text>
            </TouchableOpacity>
            {/* <TouchableOpacity
                style={{
                  ...styles.actionItemWrapper,
                  marginHorizontal: getWidth(28)
                }}
                onPress={() =>
                  NavigationService.pop()
                }
              >
                <View style={styles.actionIconBackground}>
                  <Feather name="edit" size={20} color={Colors.white} />
                </View>
                <Text style={styles.actionText}>Set Amount</Text>
              </TouchableOpacity> */}
            <TouchableOpacity
              style={styles.actionItemWrapper}
              onPress={() => onShare()}
            >
              <View style={styles.actionIconBackground}>
                <Entypo name="share" size={20} color={Colors.white} />
              </View>
              <Text style={styles.actionText}>Share</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};
const mapStateToProps = state => ({
  currentWallet: state.wallet.currentWallet
});

const mapDispatchToProps = {
  setDopdownAlert: setDopdownAlertAction
};

export default connect(mapStateToProps, mapDispatchToProps)(ReceiveMyQcCode);
