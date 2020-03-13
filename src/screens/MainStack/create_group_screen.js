import React from 'react'
import {View, Text, StyleSheet, TouchableOpacity, FlatList, TextInput, Picker} from 'react-native'
import {connect} from "react-redux";
import LinearGradient from "react-native-linear-gradient";
import {
    BLACK,
    BLUE,
    DARK_PRIMARY_COLOR,
    GRAY, GREEN,
    LIGHT_BACK,
    PRIMARY_COLOR,
    TEXT_COLOR,
    TEXT_COLOR_GRAY, WHITE
} from "../../constants/colors";
import {getEvents, sendNewEvent, sendNewGroup, setData} from "../../redux/actions";
import moment from 'moment'
import 'moment/locale/ru'
import Icon from "react-native-vector-icons/Ionicons";
import {v4 as uuidv4} from 'uuid';
import Input from "../../components/input";
import {mergeRight, objOf} from "ramda";
import mergeAll from "ramda/src/mergeAll";

const mapStateToProps = state => ({
    currentAdmins: state.currentAdmins
});

const mapDispatchToProps = dispatch => ({
    setData: (data) => dispatch(setData(data)),
    sendNewGroup: (data) => dispatch(sendNewGroup(data))
});

class CreateGroupScreen extends React.Component {
    constructor() {
        super();

        this.state = {
            height: 0
        };

        this.inputs = [
            {
                name: 'Название события',
                value: '',
                key: 'name'
            },
            {
                name: 'Описание',
                value: '',
                key: 'description'
            },
        ]
    }

    componentDidMount() { //TODO load messages data
        this.setState({data: this.data});
    }

    shouldComponentUpdate(nextProps, nextState) {
        return true
    }

    _onLayout(e) {
        if (e.nativeEvent.layout.height <= 56) {
            this.setState({height: e.nativeEvent.layout.height});
        }
    }

    render() {
        return (
            <LinearGradient colors={[DARK_PRIMARY_COLOR, PRIMARY_COLOR]} style={{flex: 1}}>
                <Text style={[styles.text, {fontSize: 22, textAlign: 'center'}]}>Создание события</Text>
                <View style={{margin: 10}}>
                    {this.inputs.map((e, i) => {
                        return (<Input type={e.type} name={e.name} onChange={text => e.value = text}/>)
                    })}
                    <TouchableOpacity onPress={async () => {
                        await this.props.setData({is_admins: true});
                        this.props.navigation.navigate('add_user')
                    }} style={{marginTop: 15}}>
                        <Text style={[styles.text, {fontSize: 18}]}>Добавить администраторов</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={async () => {
                        await this.props.setData({is_admins: false});
                        this.props.navigation.navigate('add_user')
                    }} style={{marginTop: 15}}>
                        <Text style={[styles.text, {fontSize: 18}]}>Добавить участников</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={async () => {
                        await this.props.sendNewGroup(mergeRight(
                            mergeAll(this.inputs.map(e => objOf(e.key, e.value))),
                            {
                                type: this.state.type,
                                group: this.state.group,
                                member_ids: this.props.currentMembers.map(e => e.uid),
                                admin_ids: this.props.currentAdmins.map(e => e.uid)
                            }));
                        this.props.navigation.goBack()
                    }}>
                        <Text style={[styles.text, {
                            fontSize: 22,
                            backgroundColor: GREEN,
                            width: '50%',
                            color: PRIMARY_COLOR,
                            textAlign: 'center',
                            borderRadius: 15,
                            marginTop: 20
                        }]}>Сохранить</Text>
                    </TouchableOpacity>
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
    container_input: {
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: WHITE,
        flexDirection: 'row',
        marginVertical: 10,
        borderRadius: 8,
        paddingHorizontal: 8
    },
    text_input: {
        flex: 1,
        padding: 0,
        margin: 0,
        fontSize: 18,
        fontWeight: "400",
        color: TEXT_COLOR,
        textAlignVertical: 'center',
        opacity: 0.9,
    },
    image: {
        marginLeft: 7
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateGroupScreen)
