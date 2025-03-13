// SignaturePad.js
import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  SafeAreaView,
  Image,
} from 'react-native';
import SignatureScreen from 'react-native-signature-canvas';

// SignaturePad Component
const SignaturePad = ({onSubmit, onClear}) => {
  const [signature, setSignature] = useState(null); // To store the signature
  const signatureRef = useRef(); // To reference the signature pad

  // Handle the signature output
  const handleSignature = signature => {
    setSignature(signature); // Set the captured signature (base64)
  };

  // Handle Clear action
  const handleClear = () => {
    signatureRef.current.clearSignature(); // Clear the signature
    setSignature(null); // Reset the signature state
    if (onClear) onClear(); // Call optional onClear callback
  };

  // Handle Submit action
  const handleSubmit = () => {
    if (signature) {
      if (onSubmit) onSubmit(signature); // Call onSubmit with the captured signature
    } else {
      alert('Please sign before submitting!');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>Sign Your Name</Text>

      {/* Signature Pad */}
      <View style={styles.signatureContainer}>
        <SignatureScreen
          ref={signatureRef}
          onOK={handleSignature} // Trigger when signature is captured
          onClear={handleClear} // Trigger when cleared
          descriptionText="Sign above"
          clearText="Clear"
          confirmText="Submit"
          webStyle={styles.signatureWebStyle}
        />
      </View>

      {/* Display the captured signature */}
      {signature && (
        <View style={styles.signaturePreview}>
          <Text style={styles.signaturePreviewText}>Signature Preview:</Text>
          <Image source={{uri: signature}} style={styles.signatureImage} />
        </View>
      )}

      {/* Clear and Submit Buttons */}
      <View style={styles.buttonContainer}>
        <Button title="Clear" onPress={handleClear} color="#ff4d4d" />
        <Button title="Submit" onPress={handleSubmit} color="#4CAF50" />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 20,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  signatureContainer: {
    height: 300,
    width: '100%',
    borderWidth: 1,
    borderColor: '#000',
    marginBottom: 20,
  },
  signatureWebStyle: {
    backgroundColor: 'transparent',
    borderColor: '#000',
    borderWidth: 1,
  },
  signaturePreview: {
    marginTop: 20,
    marginBottom: 20,
  },
  signaturePreviewText: {
    fontSize: 16,
    marginBottom: 10,
    color: '#333',
  },
  signatureImage: {
    width: 300,
    height: 100,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  buttonContainer: {
    width: '100%',
    marginTop: 20,
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
});

export default SignaturePad;
