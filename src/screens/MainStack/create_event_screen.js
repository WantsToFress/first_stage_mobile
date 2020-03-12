import React from 'react'
import {View, Text, StyleSheet, TouchableOpacity, FlatList, TextInput} from 'react-native'
import {connect} from "react-redux";
import LinearGradient from "react-native-linear-gradient";
import {
    BLACK,
    BLUE,
    DARK_PRIMARY_COLOR,
    GRAY,
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

const mapStateToProps = state => ({
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
                <View>
                    <Text>xxx</Text>
                </View>
            </LinearGradient>
        )
    }
}

const styles = StyleSheet.create({
    text: {
        flex: 1,
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

export default connect(mapStateToProps, mapDispatchToProps)(CreateEventScreen)
