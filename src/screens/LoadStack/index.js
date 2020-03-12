import React from "react";
import {connect} from "react-redux";
//import {} from "../../redux/actions";
//import {} from "../../constants/colors";
import {createStackNavigator} from "@react-navigation/stack";
import EventsScreen from "../MainStack/events_screen";
import LoginScreen from "./login_screen";
import RegisterScreen from "./register_screen";

const Stack = createStackNavigator();

class LoadStack extends React.Component {
    render() {
        return (
            <Stack.Navigator initialRouteName='login' mode='modal'>
                <Stack.Screen name="login"
                              component={LoginScreen}
                              options={{headerShown: false}}/>
                <Stack.Screen name="register"
                              component={RegisterScreen}
                              options={{headerShown: false}}/>
            </Stack.Navigator>
        )
    }
}

export default LoadStack;
