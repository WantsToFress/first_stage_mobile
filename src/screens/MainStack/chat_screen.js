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
    currentEvent: state.currentEvent,
    user: state.user || {}
});

const mapDispatchToProps = dispatch => ({
    setData: (data) => dispatch(setData(data))
});

class ChatScreen extends React.Component {
    constructor() {
        super();

        this.state = {
            height: 0
        };
        this.data = [{message: 'aaa', time: 54124634, full_name: 'Солнышков Андрей Дмитриевич', uid: 1, id: 1},
            {message: 'aadssdfgsfdga', time: 54124645, full_name: 'Солнышков Андрей Дмитриевич', uid: 1, id: 2},
            {message: 'vv', time: 54124683, full_name: 'Солнышков Андрей Дмитриевич', uid: 1, id: 3},
            {
                message: 'aeryy6uj 3rth4tyu4ty he tyu 4aa tsr nh4 tg wbktiohwuiogjergu0wgwerugh wioerjgi whtguj qiop wtughiqwjkergkeripg[ekr',
                time: 54124999,
                full_name: 'Бухтийчук Владимир Павлович',
                uid: 2,
                id: 4
            },
            {
                message: 'argw y weth rtherth erjaa',
                time: 54129634,
                full_name: 'Сосновский Роман Викторович',
                uid: 3,
                id: 5
            }
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
                <FlatList data={this.data} style={{marginHorizontal: 10}} inverted renderItem={({item, index}) => {
                    let inverted = item.uid === this.props.user.uid;
                    let margin = inverted ? {marginLeft: '25%'} : {marginRight: '25%'};
                    return (
                        <View style={[margin, {
                            marginVertical: 8
                        }]}>
                            <Text style={[styles.text, {
                                fontSize: 14,
                                color: BLUE,
                                textAlign: inverted ? 'right' : 'left'
                            }]}>{item.full_name}</Text>
                            <Text style={[styles.text, {textAlign: inverted ? 'right' : 'left'}]}>{item.message}</Text>
                            <Text style={[styles.text, {
                                fontSize: 12,
                                color: TEXT_COLOR_GRAY,
                                textAlign: inverted ? 'left' : 'right'
                            }]}>{moment(parseInt(item.time)).locale('ru').format("D MMM YY, hh:mm:ss")}</Text>
                        </View>
                    )
                }}/>
                <View style={[styles.container_input, {height: 12 + this.state.height,}]}>
                    <TextInput style={styles.text_input} selectionColor={BLUE} tintColor={BLUE} multiline
                               onLayout={(e) => this._onLayout(e)}
                               onChangeText={(text) => this.setState({text: text})}/>
                    <TouchableOpacity onPress={() => this.props.sendMessage({
                        message: this.state.text,
                        id: uuidv4(),
                        uid: this.props.user.id,
                        full_name: this.props.user.full_name,
                        time: moment().valueOf()
                    })}>
                        <Icon name={'ios-paper-plane'} size={25} color={BLUE} style={styles.image}/>
                    </TouchableOpacity>
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

export default connect(mapStateToProps, mapDispatchToProps)(ChatScreen)
