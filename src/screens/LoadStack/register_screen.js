import React from 'react'
import {View, Text, StyleSheet, BackHandler, TouchableOpacity, TextInput} from 'react-native'
import {connect} from "react-redux";
import LinearGradient from "react-native-linear-gradient";
import {BLACK, BLUE, DARK_PRIMARY_COLOR, GRAY, LIGHT_BACK, PRIMARY_COLOR, TEXT_COLOR} from "../../constants/colors";
import SearchInput from "../../components/search_input";
import EventCard from "../../components/event_card";
import {getUser, register} from "../../redux/actions";

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
    register: (data) => dispatch(register(data)),
    getUser: () => dispatch(getUser())
});

class RegisterScreen extends React.Component {
    constructor() {
        super();

        this.state = {};
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
                    <Text style={[styles.text, {fontSize: 25, textAlign: 'center'}]}>Регистрация</Text>
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
                    <TextInput
                        style={[styles.text, {
                            backgroundColor: TEXT_COLOR,
                            color: BLACK,
                            paddingHorizontal: 8,
                            height: 35,
                            marginBottom: 30,
                            borderRadius: 15
                        }]}
                        placeholder={'ФИО'}
                        onChangeText={text => this.setState({snp: text})}
                        selectionColor={BLUE} tintColor={BLUE}/>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '100%'}}>
                        <TouchableOpacity
                            onPress={async () => {
                                await this.props.register({
                                        login: this.state.login,
                                        password: this.state.password,
                                        full_name: this.state.snp
                                    })
                                await this.props.getUser();
                                this.props.navigation.replace('MainStack')
                            }}
                        style={{width: '100%'}}>
                            <Text style={[styles.text, {fontSize: 20, textAlign: 'center'}]}>Зарегистрироваться</Text>
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

export default connect(mapStateToProps, mapDispatchToProps)(RegisterScreen)
