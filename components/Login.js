import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableHighlight,
  Image,
  ToastAndroid,
} from 'react-native';

global.logged_cat = '';
global.gatos = '';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = { text: '', data: [], pwd: '' };
  }
  static navigationOptions = {
    title: 'meowo',
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
  };

  fetchData = async () => {
    const { params } = this.props.navigation.state;
    const response = await fetch('https://jlram.github.io/cats.json');
    const cats = await response.json(); // products have array data
    this.setState({ data: cats }); // filled data with dynamic array
    global.gatos = this.state.data;
  };
  componentDidMount() {
    this.fetchData();
  }
  _onRefresh() {
    this.setState({ refreshing: true });
    this.fetchData().then(() => {
      this.setState({ refreshing: false });
    });
  }

  login = () => {
    let loginCorrecto = false;
    for (let cat of global.gatos) {
      if (this.state.text.valueOf() == cat.username.valueOf()) {
        if (cat.password.valueOf() == this.state.pwd.valueOf())
          loginCorrecto = true;
        global.logged_cat = cat;
      }
    }

    if (loginCorrecto) {
      ToastAndroid.show(
        '¡Hola, ' + global.logged_cat.username + '!',
        ToastAndroid.SHORT
      );
      this.props.navigation.navigate('Main');
    } else {
      ToastAndroid.show('Revisa tus datos de login', ToastAndroid.SHORT);
    }
  };
  render() {
    const { navigate } = this.props.navigation;
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

        <TouchableHighlight style={styles.button} onPress={this.login}>
          <Text style={styles.buttontext}>Entrar</Text>
        </TouchableHighlight>

        <Text>
          Aún no tienes cuenta?{' '}
          <Text
            style={{ color: 'blue', fontWeight: 'bold' }}
            onPress={() => navigate('Signup')}>
            Regístrate
          </Text>
        </Text>
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
    fontSize: 16,
  },
  buttontext: {
    color: 'white',
    fontSize: 18,
  },
});
