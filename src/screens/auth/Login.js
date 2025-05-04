import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import {COLORS, IMAGES, SCREENS, SIZES, width} from '../../constants';
import {CustomButton, CustomHeader, CustomTextInput} from '../../components';
import { login } from '../../redux/slices';
import { useDispatch } from 'react-redux';
import utils from '../../utils';

export default function Login({navigation}) {
  const [email, setEmail] = useState(__DEV__ ? 'rider@hepta.com' : '');
  const [password, setPassword] = useState(__DEV__ ? 'password' : '');
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);

  const handleVerify = () => {
    setIsLoading(true);
    const postData = {
      email: email,
      password: password,
    };

    dispatch(login(postData))
      .unwrap()
      .then(response => {
        // console.log(response);
        setIsLoading(false);
      })
      .catch(err => {
        setIsLoading(false);
        // console.log(err);
        utils.errorAlert(err?.message || 'An error occurred');
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader title="Sign in" />
      <View style={styles.divider} />
      <KeyboardAvoidingView behavior="padding" style={styles.inner}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.content}>
            <View style={styles.formContainer}>

                 <Image
                          source={IMAGES.LogoPurple}
                                style={styles.logoImage}
                                resizeMode="contain"
                              />
              <CustomTextInput
                email
                value={email}
                label="Email"
                placeholder="name@example.com"
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                txtInputStyle={{color: COLORS.black}}
              />
              <CustomTextInput
                password
                value={password}
                label="Password"
                placeholder="Enter Password"
                onChangeText={setPassword} // Fixed typo (should set password, not email)
                keyboardType="default"
                secureTextEntry
                autoCapitalize="none"
                autoCorrect={false}
                txtInputStyle={{color: COLORS.black}}
              />
              <CustomButton
                title="LOGIN"
                btnStyle={styles.loginButton}
                loading={isLoading}

                onPress={() => {
                  // navigation.navigate(SCREENS.DrawerNavigator);
                  handleVerify()
                }}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  logoImage:{
width:width * 0.7,
height:width * 0.2,
alignSelf:'center'

  },
  container: {
    flex: 1,
    backgroundColor:COLORS.white
  },
  inner: {
    flex: 0.8,
    justifyContent: 'center',
    paddingHorizontal: SIZES.fifteen,
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    width: '100%',
  },
  divider: {
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
  formContainer: {
    width: '100%',
    marginVertical: SIZES.ten,
  },
  loginButton: {
    marginTop: SIZES.twentyFiveWidth,
  },
});
