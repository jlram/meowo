import React from 'react'
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableHighlight,
  Image,
  ToastAndroid
} from 'react-native';

export default class App extends React.Component {
  static navigationOptions = {
    title: 'meowo - Signup',
    headerStyle: {
      backgroundColor: '#5ed8d1',
    },
    headerTintColor: '#124c49',
    headerTitleStyle: {
      flex: 1,
      textAlign: 'center',
      alignSelf: 'center',
    },
    headerBackTitle: null,
    headerTruncatedBackTitle: null,
    headerLeft: null,
  };
  
  constructor(props) {
    super(props);
    this.state = { text: '', data: [], pwd: '', pwd2: '', foto='' };
  }

  render() {
    return (
      <View style={styles.container}>
        <Image
          source={require('../assets/meowo.png')}
          style={{ width: 100, height: 100, marginBottom: 30 }}
        />
        <TextInput
          placeholder="Usuario"
          style={styles.textInput}
          underlineColorAndroid="black"
          onChangeText={text => this.setState({ text })}
          value={this.state.text}
        />
        <TextInput
          placeholder="Contraseña"
          style={styles.textInput}
          underlineColorAndroid="black"
          secureTextEntry={true}
          onChangeText={pwd => this.setState({ pwd })}
          value={this.state.pwd}
        />
        <TextInput
          placeholder="Repite tu contraseña"
          style={styles.textInput}
          underlineColorAndroid="black"
          secureTextEntry={true}
          onChangeText={pwd2 => this.setState({ pwd2 })}
          value={this.state.pwd2}
        />
        <TextInput
          placeholder="url de tu foto"
          style={styles.textInput}
          underlineColorAndroid="black"
          onChangeText={foto => this.setState({ foto })}
          value={this.state.foto}
        />

        <TouchableHighlight style={styles.button} onPress={() => navigate('Login')}>
          <Text style={styles.buttontext}>Registrarme</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 30,
    textAlign: 'left',
  },
  button: {
    backgroundColor: '#0D1E1D',
    borderColor: 'white',
    borderWidth: 1,
    color: 'white',
    overflow: 'hidden',
    paddingVertical: 12,
    paddingHorizontal: 50,
    textAlign: 'center',
    marginTop: 50,
    marginBottom: 50,
  },
  textInput: {
    height: 60,
    width: 200,
    fontSize: 16
  },
  buttontext: {
    color:'white',
    fontSize: 18,
  }
});
