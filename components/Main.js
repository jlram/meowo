import React from 'react';
import {
  Text,
  View,
  RouteConfigs,
  MaterialBottomTabNavigatorConfig,
  StyleSheet,
  ImageBackground,
  Button,
  Linking,
  WebView,
  Image,
  TouchableOpacity,
  TextInput,
  TouchableHighlight
} from 'react-native';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
//IMPORTACION DEL COMPONENTE MAPA PARA PODER USARLO
import MapView from 'react-native-maps';
import call from 'react-native-phone-call';
//IMPORTACION DE LOS CARDSTACKS
import CardStack from './CardStack';
import { Card } from 'react-native-card-stack-swiper';

class Datos extends React.Component {
  llamar = () => {
    const args = {
      number: '958453465',
      prompt: false,
    };
    call(args).catch(console.error);
  };
  email = () => {
    Linking.openURL('mailto:support@example.com');
  };
  render() {
    return (
      <View style={styles.fondo}>
          <Text style={styles.titulo}>Datos de contacto</Text>
          <Text style={styles.texto} onPress={this.llamar}>
            <Ionicons name={'ios-phone-portrait'} size={25} />{' '}
            958452312
          </Text>
          <Text style={styles.texto} onPress={this.email}>
            <Ionicons name={'ios-at'} size={25}/>{' '}
            info@meowo.com
          </Text>
          <Text style={styles.texto}>
            <Ionicons name={'ios-mail'} size={25}/> Av. Doctor
            Oloriz, 11
          </Text>
          <Text style={styles.texto}>18008, Granada</Text>
          <Text style={styles.texto}>España</Text>
      </View>
    );
  }
}

//DECLARACION DEL MAPA Y DEL MARCADOR
class EditProfile extends React.Component {

  constructor(props) {
    super(props);
    this.state = { text: '', data: [], pwd: '', pwd2: '', foto:'' };
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.containeredit}>
        <Image
          source={require('../assets/meowo.png')}
          style={{ width: 100, height: 100, marginBottom: 30 }}
        />
        <TextInput
          placeholder="Usuario"
          style={styles.textInputedit}
          underlineColorAndroid="black"
          onChangeText={text => this.setState({ text })}
          value={this.state.text}
        />
        <TextInput
          placeholder="Contraseña"
          style={styles.textInputedit}
          underlineColorAndroid="black"
          secureTextEntry={true}
          onChangeText={pwd => this.setState({ pwd })}
          value={this.state.pwd}
        />
        <TextInput
          placeholder="Repite tu contraseña"
          style={styles.textInputedit}
          underlineColorAndroid="black"
          secureTextEntry={true}
          onChangeText={pwd2 => this.setState({ pwd2 })}
          value={this.state.pwd2}
        />
        <TextInput
          placeholder="url de tu foto"
          style={styles.textInputedit}
          underlineColorAndroid="black"
          onChangeText={foto => this.setState({ foto })}
          value={this.state.foto}
        />

        <TouchableHighlight style={styles.buttonedit} onPress={() => navigate('Cards')}>
          <Text style={styles.buttontextedit}>Editar Perfil</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

class Cards extends React.Component {
  renderCats() {
    var contenido  = []    
      var gatos = global.gatos;
      for(let cat of gatos) {
        console.log(cat.img);
        if(cat.username != global.logged_cat.username) {
          contenido.push(
            <Card style={[styles.card]}>
              <ImageBackground
                source={{uri: cat.img}}
                style={{ width: '100%', height: '100%', borderRadius: 255 }}
              />
              <Text style={styles.labelcards}>{cat.username}, {cat.age}</Text>
            </Card>
        );
        }
      }
      return contenido;
  }



  render() {  
    let cartas = this.renderCats();

    return (
      <View style={{ flex: 1 }}>
        <CardStack
          style={styles.contentcards}
          ref={swiper => {
            this.swiper = swiper;
          }}>
          {cartas}
        </CardStack>

        <View style={styles.footercards}>
          <View style={styles.buttonContainercards}>
            <TouchableOpacity
              style={[styles.button, styles.red]}
              onPress={() => {
                this.swiper.swipeLeft();
              }}>
              <Image
                source={require('../assets/red.png')}
                resizeMode={'contain'}
                style={{ height: 62, width: 62 }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.green]}
              onPress={() => {
                this.swiper.swipeRight();
              }}>
              <Image
                source={require('../assets/green.png')}
                resizeMode={'contain'}
                style={{ height: 62, width: 62 }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const TabNavigator = createBottomTabNavigator({
  Cards: {
    screen: Cards,
    path: '/',
    navigationOptions: {
      title: 'Cards',
      tabBarIcon: ({ tintColor }) => (
        <Ionicons name="ios-flame" color={tintColor} size={25} />
        
      ),
      tabBarOptions: { activeTintColor: 'red' },
    },
  },
  EditProfile: {
    screen: EditProfile,
    path: '/',
    navigationOptions: {
      title: 'Editar Perfil',
      tabBarIcon: ({ tintColor }) => (
        <Ionicons name="ios-settings" color={tintColor} size={25} />
      ),
      tabBarOptions: { activeTintColor: 'red' },
    },
  },
    Datos: {
    screen: Datos,
    path: '/',
    navigationOptions: {
      title: 'Contacto',
      tabBarIcon: ({ tintColor }) => (
        <Ionicons name="ios-information-circle" color={tintColor} size={25} />
      ),
      tabBarOptions: { activeTintColor: 'red' },
    },
  },
});

const AppContainer = createAppContainer(TabNavigator);

export default class App extends React.Component {
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
    headerLeft: null,
  };
  render() {
    return <AppContainer />;
  }
}

const styles = StyleSheet.create({
  containeredit: {
    flex: 1,
    alignItems: 'center',
    marginTop: 30,
    textAlign: 'left',
  },
  buttonedit: {
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
  textInputedit: {
    height: 60,
    width: 200,
    fontSize: 16
  },
  buttontextedit: {
    color:'white',
    fontSize: 18,
  },
  fondo: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
  texto: {
    color: 'black',
    marginTop: 10,
    fontSize: 15,
    textAlign: 'center'
  },
  titulo: {
    color: 'black',
    fontWeight: 'bold',
    marginTop: 10,
    fontSize: 20,
  },
    contentcards: {
    flex: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    width: 320,
    height: 450,
    backgroundColor: '#FE474C',
    borderRadius: 5,
    shadowColor: 'rgba(0,0,0,0.5)',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.5,
  },
  labelcards: {
    lineHeight: 50,
    textAlign: 'center',
    marginVertical: -75,
    fontSize: 30,
    fontFamily: 'System',
    color: '#ffffff',
    backgroundColor: 'black',
    borderRadius: 25,
  },
  footercards: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainercards: {
    width: 220,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    shadowColor: 'rgba(0,0,0,0.3)',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.5,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 0,
  },
  green: {
    width: 75,
    height: 75,
    backgroundColor: '#fff',
    borderRadius: 75,
    borderWidth: 6,
    borderColor: '#01df8a',
  },
  red: {
    width: 75,
    height: 75,
    backgroundColor: '#fff',
    borderRadius: 75,
    borderWidth: 6,
    borderColor: '#fd267d',
  },
});

//export default createAppContainer(TabNavigator);
