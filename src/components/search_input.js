import React from 'react'
import {Text, StyleSheet, ScrollView, TouchableOpacity, View, TextInput, BackHandler} from 'react-native'
import {BLACK, BLUE, GRAY, TEXT_COLOR, WHITE} from "../constants/colors";
import Icon from "react-native-vector-icons/Ionicons";

class SearchInput extends React.Component {
    render() {
        return (
            <View style={[styles.container, {height: this.props.height}]}>
                <TextInput style={styles.text} selectionColor={BLUE} tintColor={BLUE} onChangeText={this.props.onChange}/>
                <Icon name={'ios-search'} size={25} color={BLUE} style={styles.image}/>
            </View>
        )
    }
}

SearchInput.defaultProps = {
    height: 40,
    onChange: (text) => {}
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

export default SearchInput;
