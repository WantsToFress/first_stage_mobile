import React from "react";
import {connect} from "react-redux";
import {undefinedObject} from "../lib/utils";
//import {} from "../redux/actions";
import LinearGradient from "react-native-linear-gradient";
import {DARK_PRIMARY_COLOR, PRIMARY_COLOR} from "../constants/colors";
import {getUser} from "../redux/actions";

const mapStateToProps = state => ({
    user: state.user
});

const mapDispatchToProps = dispatch => ({
    getUser: () => dispatch(getUser())
});

class LoadingContainer extends React.Component {
    componentDidMount(): void {
        if (!this.props.user || !this.props.user.uid) {
            this.props.navigation.replace('LoadStack')
        } else {
            this.props.getUser();
            this.props.navigation.replace('MainStack')
        }
    }

    render() {
        return (
            <LinearGradient colors={[DARK_PRIMARY_COLOR, PRIMARY_COLOR]} style={{flex: 1}}/>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoadingContainer)
