import React, { useCallback } from 'react';
import { StyleSheet, View, Text, Button} from 'react-native';
import PropTypes from 'prop-types';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useDispatch, useSelector } from 'react-redux';
import $t from 'i18n';
import { login, facebookLogin, googleLogin, getUser, logout } from '../../store/actions/UserActions';
import { SignInForm } from '../../components/auth/SignInForm';
import { signInErrorSelector } from '../../store/selectors/ErrorSelector';
import { userSelector } from '../../store/selectors/UserSelector';

const SignInScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const handleLogin = useCallback(data => dispatch(login(data)));
  const handleFacebookLogin = data => dispatch(facebookLogin(data));
  const handleGoogleLogin = data => dispatch(googleLogin(data));

  const handleLogout = useCallback(data => dispatch(logout(data)));

  const user = useSelector(userSelector());
  const signInError = useSelector(signInErrorSelector());
  const goToSignUp = () => {
    navigation.navigate('SignUp');
  };

  const goToForgotPassword = () => {
    navigation.navigate('ForgotPassword');
  };

  const _signOutAsync = async () => {
    handleLogout();
  };

  return (
    <View style={styles.container}>
      {Object.keys(user).length === 0 ? (<KeyboardAwareScrollView enableOnAndroid>
        <SignInForm onSubmit={handleLogin} signInError={signInError} />

        {/* <Button title="Sign in with Facebook!" onPress={handleFacebookLogin} /> */}
        {/* <Button title="Sign in with Google!" onPress={handleGoogleLogin} /> */}
        {/* <Button title="Sign up!" onPress={goToSignUp} /> */}
        {/* <Button title="Forgot password" onPress={goToForgotPassword} /> */}
      </KeyboardAwareScrollView>) :(<View><Text>You are logged in as {user.email}</Text><Button title="Sign out!" onPress={_signOutAsync} /></View>)}
    </View>
  );
};

SignInScreen.propTypes = {
  navigation: PropTypes.object
};

SignInScreen.navigationOptions = {
  title: $t('auth.signIn')
};

export default SignInScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1
  }
});
