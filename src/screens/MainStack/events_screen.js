import React from 'react'
import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native'
import {connect} from "react-redux";
import LinearGradient from "react-native-linear-gradient";
import {
    BLACK, BLUE,
    DARK_PRIMARY_COLOR,
    GRAY,
    GREEN,
    LIGHT_BACK,
    PRIMARY_COLOR, TEXT_COLOR,
    TEXT_COLOR_GRAY
} from "../../constants/colors";
import SearchInput from "../../components/search_input";
import EventCard from "../../components/event_card";
import {getEvents, setData} from "../../redux/actions";
import moment from "moment";

const mapStateToProps = state => ({
    events: state.events,
    user: {role: 'admin'}//state.user
});

const mapDispatchToProps = dispatch => ({
    getEvents: () => dispatch(getEvents()),
    setData: (data) => dispatch(setData(data))
});

class EventsScreen extends React.Component {
    constructor() {
        super();

        this.state = {
            filter: '',
            data: []
        };
    }

    componentDidMount() {
        this.props.getEvents();
        this.setState({data: this.props.events});
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextState.filter !== this.state.filter) {
            this.setState({data: this.props.events.filter(e => e.name.toLowerCase().includes(nextState.filter.toLowerCase()))})
        }
        if (nextProps.events !== this.props.events) {
            this.setState({data: nextProps.events.filter(e => e.name.toLowerCase().includes(nextState.filter.toLowerCase()))})
        }

        return true
    }

    render() {
        return (
            <LinearGradient colors={[DARK_PRIMARY_COLOR, PRIMARY_COLOR]} style={{flex: 1}}>
                {this.props.user.role === 'group_admin' || this.props.user.role === 'admin' &&
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    marginHorizontal: 10,
                    height: 30,
                    marginTop: 5
                }}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('create_event')}
                                      style={{backgroundColor: GREEN, borderRadius: 15, paddingHorizontal: 5}}>
                        <Text style={styles.text}>+ мероприятие</Text>
                    </TouchableOpacity>
                    {this.props.user.role === 'admin' &&
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('create_group')} style={{
                        backgroundColor: BLUE,
                        borderRadius: 15,
                        paddingHorizontal: 5,
                        marginLeft: 10
                    }}>
                        <Text style={styles.text}>+ группу</Text>
                    </TouchableOpacity>}
                </View>}
                <SearchInput onChange={(text) => this.setState({filter: text})}/>
                <FlatList data={this.state.data}
                          ItemSeparatorComponent={(item) => (
                              <View style={{width: '100%', height: 1, backgroundColor: TEXT_COLOR_GRAY}}/>)}
                          renderItem={({item, index}) => (
                              <EventCard key={item.id} color={item.is_self_assignable ? 'transparent' : BLACK}
                                         name={item.name} description={item.description}
                                         type={item.type}
                                         time={((e =
                                                 (moment(parseInt(item.start)).locale('ru').format("D MMM YYYY, hh:mm") || '') +
                                                 (item.end ? ' ' + moment(parseInt(item.end)).locale('ru').format("D MMM YYYY, hh:mm") : '')) => !!e ? e : undefined)()}
                                         onPress={() => {
                                             this.props.setData({currentEvent: item});
                                             this.props.navigation.navigate('details')
                                         }}/>
                          )}/>
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
        color: PRIMARY_COLOR,
        textAlignVertical: 'center',
        opacity: 0.9
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(EventsScreen)
