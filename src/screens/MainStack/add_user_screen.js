import React from 'react'
import {View, Text, StyleSheet, TouchableOpacity, BackHandler, FlatList} from 'react-native'
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
import {getEvents, getUsers, setData} from "../../redux/actions";
import moment from "moment";
import {mergeRight} from "ramda";
import append from "ramda/src/append";

const mapStateToProps = state => ({
    currentUsers: state.currentUsers,
    user: state.user,
    is_admin: state.is_admin
});

const mapDispatchToProps = dispatch => ({
    getUsers: (data) => dispatch(getUsers(data)),
    setData: (data) => dispatch(setData(data))
});

class AddUserScreen extends React.Component {
    constructor() {
        super();

        this.state = {
            filter: '',
        };
    }

    componentDidMount() {
        this.props.getUsers({});
        BackHandler.addEventListener("hardwareBackPress", this.backAction);
    }

    componentWillUnmount(): void {
        BackHandler.removeEventListener("hardwareBackPress", this.backAction);
    }

    shouldComponentUpdate(nextProps, nextState) {
        return true
    }

    backAction = () => {
        this.props.setData({currentMembers: this.state.members});
        this.props.navigation.goBack();

        return true;
    };

    render() {
        //alert(JSON.stringify(this.props.currentUsers))
        return (
            <LinearGradient colors={[DARK_PRIMARY_COLOR, PRIMARY_COLOR]} style={{flex: 1}}>
                <SearchInput onChange={(text) => this.props.getUsers({filter: text})}/>
                <FlatList data={this.props.currentUsers}
                          ItemSeparatorComponent={(item) => (
                              <View style={{width: '100%', height: 1, backgroundColor: TEXT_COLOR_GRAY}}/>)}
                          renderItem={({item, index}) => (
                              <TouchableOpacity onPress={() =>
                                  this.setState({
                                      members: append(item, this.state.members)
                                  })}
                                                key={item.uid} style={{
                                  flexDirection: 'row',
                                  justifyContent: 'space-between',
                                  alignItems: 'center',
                                  marginHorizontal: 10,
                                  paddingVertical: 5
                              }}>
                                  <Text style={styles.text}>{item.full_name}</Text>
                                  <Text style={[styles.text, {textAlign: 'right'}]}>{'@' + item.login}</Text>
                              </TouchableOpacity>
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

export default connect(mapStateToProps, mapDispatchToProps)(AddUserScreen)
