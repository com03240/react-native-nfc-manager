import React from 'react';
import {
    View,
    Text,
    Button,
    Platform,
    TouchableOpacity,
    Linking,
    TextInput,
    ScrollView,
} from 'react-native';
import NfcManager, {Ndef} from '../NfcManager';

class AppIOS13 extends React.Component {
  componentDidMount() {
    NfcManager.start();
  }

  componentWillUnmount() {
    this._cleanUp();
  }

  render() {
    return (
      <View style={{padding: 20}}>
        <Text>NFC Demo on iOS13</Text>
        <TouchableOpacity 
          style={{padding: 10, width: 200, margin: 20, borderWidth: 1, borderColor: 'black'}}
          onPress={this._testMifare}
        >
          <Text>Test Mifare</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={{padding: 10, width: 200, margin: 20, borderWidth: 1, borderColor: 'black'}}
          onPress={this._cleanUp}
        >
          <Text>Cancel Test</Text>
        </TouchableOpacity>
      </View>
    )
  }

  _cleanUp = () => {
    NfcManager.cancelTechnologyRequest().catch(() => 0);
    NfcManager.unregisterTagEventExIOS().catch(() => 0);    
  }

  _testMifare = async () => {
    try {
      await NfcManager.registerTagEventExIOS()
      let resp = await NfcManager.requestTechnology('mifare');
      console.warn(resp);
      let tag = await NfcManager.getTag();
      console.warn(tag);
      // resp = await NfcManager.sendMifareCommandIOS([0x30, 0x00, 0xa2, 0xb6]);
      // console.warn(resp);
      this._cleanUp();
    } catch (ex) {
      console.warn('ex', ex);
      this._cleanUp();
    }
  }
}

export default AppIOS13;