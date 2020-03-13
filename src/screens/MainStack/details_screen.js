import React from 'react'
import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native'
import {connect} from "react-redux";
import LinearGradient from "react-native-linear-gradient";
import {
    BLACK,
    BLUE,
    DARK_PRIMARY_COLOR,
    GREEN,
    PRIMARY_COLOR,
    RED,
    TEXT_COLOR,
    TEXT_COLOR_GRAY
} from "../../constants/colors";
import SearchInput from "../../components/search_input";
import EventCard from "../../components/event_card";
import Icon from "react-native-vector-icons/Ionicons";
import {setData} from "../../redux/actions";

const mapStateToProps = state => ({
    currentEvent: state.currentEvent
});

const mapDispatchToProps = dispatch => ({
    setData: (data) => dispatch(setData(data))
});

class DetailsScreen extends React.Component {
    componentDidMount() {
        //
    }

    typeToString = (type) => {
        switch (type) {
            case 'GROUP':
                return 'Групповое событие';
            case 'CLOSED':
                return 'Закрытое событие';
            default:
                return 'Открытое событие';
        }
    };

    render() {
        return (
            <LinearGradient colors={[DARK_PRIMARY_COLOR, PRIMARY_COLOR]} style={{flex: 1}}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 10}}>
                    <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                        <Icon name={'ios-arrow-back'} color={'#fff'} size={25} style={{margin: 10}}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('chat')}>
                        <Text style={styles.text}>Чат</Text>
                        <Icon name={'ios-paper-plane'} color={'#fff'} size={16} style={{marginLeft: 3}}/>
                    </TouchableOpacity>
                </View>
                <View style={{marginHorizontal: 10, height: 150}}>
                    <Text style={[styles.text, {
                        fontSize: 25,
                        marginBottom: 5,
                        height: 30,
                        textAlign: 'center'
                    }]}>{this.props.currentEvent.name || 'No name event'}</Text>
                    <Text style={
                        [styles.text, {
                            color: TEXT_COLOR_GRAY,
                            fontSize: 16,
                            textAlignVertical: 'top'
                        }
                        ]}>{this.props.currentEvent.description || 'No description event'}</Text>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        flex: 1,
                        alignItems: 'center',
                        marginTop: 5
                    }}>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            flex: 1,
                            alignItems: 'center'
                        }}>
                            <Icon name={'md-time'} color={TEXT_COLOR} size={16} style={{marginRight: 5}}/>
                            <Text
                                style={styles.text}>{
                                ((e = (this.props.currentEvent.start || '') +
                                (!!this.props.currentEvent.start && !!this.props.currentEvent.end ? ' - ' : '') +
                                (this.props.currentEvent.end || '')) => !!e ? e : 'Some time event')()}</Text>
                        </View>
                        <Text
                            style={[styles.text, {textAlign: 'right'}]}>{this.props.currentEvent.group || 'Общее событие'}</Text>
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        flex: 1,
                        alignItems: 'center',
                        marginTop: 5
                    }}>
                        <TouchableOpacity onPress={() => alert('Функционал недоступен')}
                                          style={{
                                              backgroundColor: this.props.currentEvent.is_self_assignable ? RED : GREEN,
                                              paddingHorizontal: 8,
                                              borderRadius: 15
                                          }}>
                            <Text style={styles.text}>
                                {this.props.currentEvent.is_self_assignable ? 'Покинуть событие' : 'Присоединиться'}
                            </Text>
                        </TouchableOpacity>
                        <Text style={[styles.text, {textAlign: 'right'}]}>
                            {this.typeToString(this.props.currentEvent.type)}
                        </Text>
                    </View>
                </View>
                <FlatList data={this.props.currentEvent.members}
                          style={{marginTop: 20, paddingBottom: 30}}
                          ItemSeparatorComponent={() => (
                              <View style={{width: '100%', height: 1, backgroundColor: '#576469'}}/>)}
                          renderItem={({item, index}) => (
                              <View key={item.uid} style={{
                                  flexDirection: 'row',
                                  justifyContent: 'space-between',
                                  alignItems: 'center',
                                  marginHorizontal: 10,
                                  paddingVertical: 5
                              }}>
                                  <Text style={styles.text}>{item.full_name}</Text>
                                  <Text style={[styles.text, {textAlign: 'right'}]}>{'@' + item.login}</Text>
                              </View>)
                          }/>
            </LinearGradient>
        )
    }
}

const styles = StyleSheet.create({
    button: {
        margin: 10,
        paddingHorizontal: 8,
        borderRadius: 15,
        flexDirection: 'row',
        width: 63,
        alignItems: 'center',
        backgroundColor: BLUE
    },
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
});

export default connect(mapStateToProps, mapDispatchToProps)(DetailsScreen)
