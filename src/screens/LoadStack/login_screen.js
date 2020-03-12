import React from 'react'
import {View, Text, StyleSheet, BackHandler, TouchableOpacity, TextInput} from 'react-native'
import {connect} from "react-redux";
import LinearGradient from "react-native-linear-gradient";
import {BLACK, BLUE, DARK_PRIMARY_COLOR, GRAY, LIGHT_BACK, PRIMARY_COLOR, TEXT_COLOR} from "../../constants/colors";
import SearchInput from "../../components/search_input";
import EventCard from "../../components/event_card";
import {getEvents, logIn, setData} from "../../redux/actions";

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
    logIn: (data) => dispatch(logIn(data))
});

class LoginScreen extends React.Component {
    constructor() {
        super();

        this.state = {};
        this.data = [{name: 'aaa', id: 0, is_self_assignable: true}, {name: 'bbb', id: 1}, {name: 'aab', id: 2}]
    }

    componentDidMount() {
        this.setState({data: this.data});
    }

    shouldComponentUpdate(nextProps, nextState) {
        return true
    }

    render() {
        return (
            <LinearGradient colors={[DARK_PRIMARY_COLOR, PRIMARY_COLOR]} style={{flex: 1, alignItems: 'center',}}>
                <View style={{
                    flex: 1,
                    width: 225,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <Text style={[styles.text, {fontSize: 25, textAlign: 'center'}]}>Вход</Text>
                    <TextInput
                        style={[styles.text, {
                            backgroundColor: TEXT_COLOR,
                            color: BLACK,
                            paddingHorizontal: 8,
                            marginVertical: 25,
                            height: 35,
                            borderRadius: 15
                        }]}
                        placeholder={'Логин'}
                        onChangeText={text => this.setState({login: text})}
                        selectionColor={BLUE} tintColor={BLUE}/>
                    <TextInput
                        style={[styles.text, {
                            backgroundColor: TEXT_COLOR,
                            color: BLACK,
                            paddingHorizontal: 8,
                            height: 35,
                            marginBottom: 30,
                            borderRadius: 15
                        }]}
                        placeholder={'Пароль'}
                        onChangeText={text => this.setState({password: text})}
                        selectionColor={BLUE} tintColor={BLUE}/>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '100%'}}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('register')}>
                            <Text style={[styles.text, {fontSize: 20}]}>Регистрация</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => this.props.logIn({login: this.state.login, password: this.state.password})}
                            style={{backgroundColor: BLUE, borderRadius: 15, paddingHorizontal: 8}}>
                            <Text style={[styles.text, {fontSize: 20}]}>Войти</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </LinearGradient>
        )
    }
}

const styles = StyleSheet.create({
    text: {
        width: '100%',
        padding: 0,
        margin: 0,
        fontSize: 16,
        fontWeight: "400",
        color: TEXT_COLOR,
        textAlignVertical: 'center',
        opacity: 0.9
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)
