import React from 'react';
import { TouchableOpacity, View, Button, StyleSheet } from 'react-native';
import { Formik, Field } from 'formik';
import PropTypes from 'prop-types';

import { TextInputField } from '../shared/FormFields';
import { signInValidationRules } from '../../validation/auth';
import $t from 'i18n';
import ErrorText from '../shared/Text/ErrorText';

export const SignInForm = ({ onSubmit, signInError }) => (
  <Formik
    initialValues={{ email: '', password: '' }}
    onSubmit={onSubmit}
    validationSchema={signInValidationRules}
  >
    {({ handleSubmit }) => (
      <View style={styles.wrapper}>
        <Field
          style={styles.input}
          name="email"
          component={TextInputField}
          placeholder={$t('auth.enterEmail')}
        />
        <Field
          style={styles.input}
          name="password"
          component={TextInputField}
          secureTextEntry
          placeholder={$t('auth.enterPassword')}
        />
        <ErrorText
          error={!!signInError}
          message={$t('auth.invalidCredentials')}
        />
        <TouchableOpacity onPress={handleSubmit}>
          <Button title="Sign In" onPress={handleSubmit} />
        </TouchableOpacity>
      </View>
    )}
  </Formik>
);

SignInForm.propTypes = {
  onSubmit: PropTypes.func,
  signInError: PropTypes.bool
};

const styles = StyleSheet.create({
  input: {
    width: 150
  }
});
