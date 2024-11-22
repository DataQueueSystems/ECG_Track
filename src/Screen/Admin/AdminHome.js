import {BackHandler, Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useRef} from 'react';
import {useIsFocused} from '@react-navigation/native';
import {showToast} from '../../../utils/Toast';
import {useTheme} from 'react-native-paper';
import CustomText from '../../customText/CustomText';
import {fonts} from '../../customText/fonts';
import {Iconify} from 'react-native-iconify';
import GradientCards from '../../Component/Admin/GradientCards';
import {useAuthContext} from '../../context/GlobaContext';
import moment from 'moment';

export default function Home() {
  let theme = useTheme();
  const {handleLogout, userDetail} = useAuthContext();
  const isFocused = useIsFocused();
  const backPressedOnce = useRef(false);
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        if (isFocused) {
          if (!backPressedOnce.current) {
            backPressedOnce.current = true;
            showToast("Tap again if you're ready to exit.");
            setTimeout(() => {
              backPressedOnce.current = false;
            }, 2000); // Reset backPressedOnce after 2 seconds
            return true;
          } else {
            BackHandler.exitApp();
            return true;
          }
        }
        return false;
      },
    );
    return () => backHandler.remove();
  }, []);

  let todaysDate = moment().format('ddd ,DD MMM');

  return (
    <>
      <View
        style={[
          styles.maincontainer,
          {backgroundColor: theme.colors.background},
        ]}>
        {/* Header */}
        <View style={styles.headerView}>
          {/* ProfileDetail */}
          <View style={styles.userProfile}>
            <View style={styles.profileImage}>
              <Iconify
                icon="fa-solid:user"
                size={35}
                color={theme.colors.onBackground}
              />
            </View>

            <View style={styles.NameDate}>
              <CustomText
                style={[
                  {
                    fontFamily: fonts.SemiBold,
                    fontSize: 14,
                  },
                ]}>
                Hi,{userDetail?.name}
              </CustomText>
              <CustomText
                style={[
                  {
                    fontFamily: fonts.Regular,
                    fontSize: 13,
                  },
                ]}>
                {todaysDate}
              </CustomText>
            </View>
          </View>

          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Iconify
              icon="majesticons:logout-half-circle-line"
              size={37}
              color={theme.colors.onBackground}
              onPress={handleLogout}
            />
          </View>
        </View>

        {/* MainHead Text */}
        <View style={styles.manageView}>
          <View style={styles.manageExplore}>
            <CustomText style={[styles.manageText, {fontFamily: fonts.Bold}]}>
              Explore
            </CustomText>
            <Iconify
              icon="fluent-mdl2:recruitment-management"
              size={30}
              color={theme.colors.onBackground}
            />
          </View>
          <CustomText
            style={[
              styles.manageText,
              {fontFamily: fonts.Bold, lineHeight: 35},
            ]}>
            User & Doctor
          </CustomText>
        </View>

        {/* Manage Card */}

        <GradientCards />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  maincontainer: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 10,
    // backgroundColor:'green'
  },
  headerView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  userProfile: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10,
  },
  profileImage: {
    padding: 10,
    borderRadius: 100,
    height: 55,
    width: 55,
    alignItems: 'center',
    borderWidth: 0.4,
    borderColor: 'grey',
  },
  manageView: {
    marginTop: 20,
    marginBottom: 10,
  },
  manageExplore: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  manageText: {
    fontSize: 30,
  },
});
