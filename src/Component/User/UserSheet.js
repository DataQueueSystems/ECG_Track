import React, {useCallback} from 'react';
import {View, StyleSheet, Image, Appearance, Alert} from 'react-native';
import BottomSheet, {BottomSheetBackdrop} from '@gorhom/bottom-sheet';
import {useTheme, Portal} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import CustomText from '../../customText/CustomText';
import {fonts} from '../../customText/fonts';
import {Iconify} from 'react-native-iconify';

const UserSheet = ({bottomSheetRef, user}) => {
  const snapPoints = ['50%', '70%'];
  const theme = useTheme();

  const renderBackdrop = useCallback(
    props => (
      <BottomSheetBackdrop
        {...props}
        style={{backgroundColor: 'rgba(0, 0, 0, 0.5)'}}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
      />
    ),
    [],
  );

  let themeColor = Appearance.getColorScheme();
  let iconColor = themeColor == 'dark' ? '#fff' : 'black';
  let navigation = useNavigation();
  const handleEdit = () => {
    console.log('fdsbjk');
    bottomSheetRef.current.close();
    navigation.navigate('ControlUser', {
      screenName: 'Edit User',
      userData: user,
    });
  };

  return (
    <Portal>
      <BottomSheet
        ref={bottomSheetRef}
        enablePanDownToClose={true}
        index={-1} // Initially closed
        snapPoints={snapPoints}
        backdropComponent={renderBackdrop}
        backgroundStyle={{
          backgroundColor: theme.colors.background,
        }}
        handleIndicatorStyle={{backgroundColor: theme.colors.onBackground}}>
        <View
          style={[
            styles.bottomModelDiv,
            {backgroundColor: theme.colors.background},
          ]}>
          {/* action Icon */}
          <View style={styles.actionView}>
            <Iconify
              onPress={handleEdit}
              icon="mynaui:edit"
              size={27}
              color={theme.colors.error}
            />
          </View>

          {/* user Details */}
          <View style={styles.profileContainer}>
            <View
              style={[
                styles.iconView,
                {backgroundColor: theme.colors.background},
              ]}>
              <Iconify icon="solar:user-outline" size={80} color={iconColor} />
            </View>

            <CustomText
              style={[
                styles.userName,
                {color: theme.colors.onBackground, fontFamily: fonts.Bold},
              ]}>
              {user?.name}
            </CustomText>
          </View>

          {/* Additional Information */}
          <View style={styles.infoContainer}>
            <CustomText
              style={[
                styles.infoLabel,
                {color: theme.colors.onBackground, fontFamily: fonts.SemiBold},
              ]}>
              Contact:
            </CustomText>
            <CustomText
              style={[
                styles.infoValue,
                {color: theme.colors.onBackground, fontFamily: fonts.Regular},
              ]}>
              {user?.contact || '+1 234 567 890'}
            </CustomText>
            <CustomText
              style={[
                styles.infoLabel,
                {color: theme.colors.onBackground, fontFamily: fonts.SemiBold},
              ]}>
              Email:
            </CustomText>
            <CustomText
              style={[
                styles.infoValue,
                {color: theme.colors.onBackground, fontFamily: fonts.Regular},
              ]}>
              {user?.email}
            </CustomText>

            <CustomText
              style={[
                styles.infoLabel,
                {color: theme.colors.onBackground, fontFamily: fonts.SemiBold},
              ]}>
              Address:
            </CustomText>
            <CustomText
              style={[
                styles.infoValue,
                {color: theme.colors.onBackground, fontFamily: fonts.Regular},
              ]}>
              {user?.address || '123 Clinic Street, New York, NY'}
            </CustomText>
          </View>
        </View>
      </BottomSheet>
    </Portal>
  );
};

export default UserSheet;

const styles = StyleSheet.create({
  bottomModelDiv: {
    padding: 20,
    flex: 1,
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  iconView: {
    paddingVertical: 10,
  },

  userName: {
    fontSize: 20,
  },
  userSpecialty: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 5,
  },
  infoContainer: {
    marginTop: 4,
  },
  infoLabel: {
    fontSize: 16,
    marginTop: 10,
  },
  infoValue: {
    fontSize: 14,
    marginTop: 5,
  },
  actionView: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 6,
  },
});
