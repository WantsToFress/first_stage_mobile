import React from 'react'
import {Text, StyleSheet, ScrollView, TouchableOpacity, View, TextInput, BackHandler} from 'react-native'
import {BLACK, BLUE, GRAY, TEXT_COLOR, TEXT_COLOR_GRAY, WHITE} from "../constants/colors";
import Icon from "react-native-vector-icons/Ionicons";
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment'
import 'moment/locale/ru'

class Input extends React.Component {
    state = {
        date: 0,
        time: 0,
        show: false,
        height: 12
    };

    _onLayout(e) {
        if (e.nativeEvent.layout.height <= 56) {
            this.setState({height: e.nativeEvent.layout.height});
        }
    }

    render() {
        return (
            <View style={{marginTop: 10,}}>
                <Text style={styles.text}>{this.props.name}</Text>
                {this.props.type === 'text' ?
                    <TextInput style={[styles.text_input, {height: 12 + this.state.height}]} placeholder={'Печатайте здесь'}
                               onLayout={(e) => this._onLayout(e)}
                               multiline
                               onChangeText={text => this.props.onChange(text)}
                               placeholderTextColor={TEXT_COLOR_GRAY}/> :
                    this.props.type === 'date' &&
                    <View style={{flexDirection: 'row'}}>
                        <TouchableOpacity onPress={() => this.setState({showDate: true})} style={{marginRight: 30}}>
                            <Text style={styles.text}>{this.state.date ? moment(this.state.date).format('D MMM YYYY') : 'Дата'}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.setState({showTime: true})}>
                            <Text style={styles.text}>{this.state.time ? moment(this.state.time).format('hh:mm') : 'Время'}</Text>
                        </TouchableOpacity>
                    </View>}
                {this.state.showDate &&
                <DateTimePicker
                    timeZoneOffsetInMinutes={0}
                    value={this.state.date ? moment(this.state.date).toDate() : moment().toDate()}
                    mode='date'
                    is24Hour={true}
                    display="spinner"
                    onChange={e => {
                        this.setState({
                            date: moment(e.nativeEvent.timestamp).startOf('day').valueOf(),
                            showDate: false
                        })
                    }}/>}
                {this.state.showTime &&
                <DateTimePicker
                    timeZoneOffsetInMinutes={0}
                    value={moment(this.state.time).toDate()}
                    mode='time'
                    is24Hour={true}
                    display="default"
                    onChange={e => {
                        this.setState({
                            time: this.state.date + e.nativeEvent.timestamp - moment().startOf('day').valueOf(),
                            showTime: false
                        })
                    }}/>}
            </View>
        )
    }
}

Input.defaultProps = {
    name: 'NoName parameter',
    onChange: (text) => 1,
    type: 'text'
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: WHITE,
        flexDirection: 'row',
        marginVertical: 10,
        borderRadius: 8,
        paddingBottom: 5,
        paddingHorizontal: 8
    },
    text: {
        padding: 0,
        margin: 0,
        fontSize: 16,
        fontWeight: "400",
        color: TEXT_COLOR,
        textAlignVertical: 'center',
        opacity: 0.9,
    },
    text_input: {
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

export default Input;
