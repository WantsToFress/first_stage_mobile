import React from 'react'
import {Text, StyleSheet, ScrollView, TouchableOpacity, View, TextInput, BackHandler} from 'react-native'
import {BLACK, GRAY, LIGHT_BACK, PRIMARY_COLOR, TEXT_COLOR, TEXT_COLOR_GRAY, WHITE} from "../constants/colors";
import Icon from "react-native-vector-icons/Ionicons";

class EventCard extends React.Component {
    render() {
        return (
            <TouchableOpacity onPress={this.props.onPress}
                              style={[styles.container, {backgroundColor: this.props.color}]}>
                <Text style={[styles.text, {fontSize: 19, marginBottom: 5}]}>{this.props.name}</Text>
                <Text style={
                    [styles.text,
                        {
                            color: TEXT_COLOR_GRAY,
                            fontSize: 14,
                            textAlignVertical: 'top'
                        }
                    ]}>{this.props.description}</Text>
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
                        <Text style={styles.text}>{this.props.time}</Text>
                    </View>
                    <Text style={[styles.text, {textAlign: 'right'}]}>{this.props.group}</Text>
                </View>
            </TouchableOpacity>
        )
    }
}

EventCard.defaultProps = {
    onPress: () => {},
    color: 'transparent',
    name: 'No name event',
    description: 'No description event',
    time: 'Some time event',
    group: 'Общее событие'
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        paddingVertical: 5,
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

export default EventCard;
