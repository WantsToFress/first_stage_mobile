import React from 'react'
import {View, Text, StyleSheet, TouchableOpacity, Picker, TextInput} from 'react-native'
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
import {getEvents, setData} from "../../redux/actions";
import moment from 'moment'
import 'moment/locale/ru'
import Icon from "react-native-vector-icons/Ionicons";
import {v4 as uuidv4} from 'uuid';
import Input from "../../components/input";
import {mergeRight, objOf} from "ramda";
import mergeAll from "ramda/src/mergeAll";

const mapStateToProps = state => ({
    user: state.user,
    groups: [
        {id: 0, name: 'aaa'},
        {id: 1, name: 'bbb'},
        {id: 2, name: 'ccc'},
    ],
    currentMembers: state.currentMembers
});

const mapDispatchToProps = dispatch => ({
    setData: (data) => dispatch(setData(data))
});

class CreateEventScreen extends React.Component {
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
            {
                name: 'Начало',
                value: '',
                key: 'start',
                type: 'date'
            },
            {
                name: 'Окончание',
                value: '',
                key: 'end',
                type: 'date'
            }
        ]
    }

    componentDidMount() { //TODO load messages data
        this.setState({data: this.data});
    }

    shouldComponentUpdate(nextProps, nextState) {
        return true
    }

    render() {
        return (
            <LinearGradient colors={[DARK_PRIMARY_COLOR, PRIMARY_COLOR]} style={{flex: 1}}>
                <Text style={[styles.text, {fontSize: 22, textAlign: 'center'}]}>Создание события</Text>
                <View style={{margin: 10}}>
                    {this.inputs.map((e, i) => {
                        return (<Input type={e.type} name={e.name} onChange={text => e.value = text}/>)
                    })}
                    <View style={{justifyContent: 'center', marginVertical: 10}}>
                        <Picker
                            selectedValue={this.state.type}
                            style={[styles.text, {height: 50, width: 250,}]}
                            onValueChange={(itemValue, itemIndex) =>
                                this.setState({type: itemValue})
                            }>
                            <Picker.Item label="Общее событие" value="OPENED"/>
                            <Picker.Item label="Групповое событие" value="GROUP"/>
                            <Picker.Item label="Закрытое событие" value="CLOSED"/>
                        </Picker>
                        {this.state.type === 'GROUP' &&
                        <Picker
                            selectedValue={this.state.group}
                            style={[styles.text, {height: 50, width: 250,}]}
                            onValueChange={(itemValue, itemIndex) =>
                                this.setState({group: itemValue})
                            }>
                            {this.props.groups.map((e, i) => (
                                <Picker.Item label={e.name} value={e}/>
                            ))}
                        </Picker>}
                    </View>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('add_user')}>
                        <Text style={[styles.text, {fontSize: 18}]}>Добавить участников</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={async () => {
                        await this.props.sendNewEvent(mergeRight(
                            mergeAll(this.inputs.map(e => objOf(e.key, e.value))),
                            {
                                type: this.state.type,
                                group: this.state.group,
                                members: this.props.currentMembers
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
        fontSize: 13,
        fontWeight: "400",
        color: TEXT_COLOR,
        textAlignVertical: 'bottom',
        opacity: 0.9
    },
    text_input: {
        padding: 0,
        margin: 0,
        fontSize: 19,
        fontWeight: "400",
        color: TEXT_COLOR,
        textAlignVertical: 'center',
        opacity: 0.9,
    },
    image: {
        marginLeft: 7
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateEventScreen)
