import React from "react";
import {connect} from "react-redux";
//import {} from "../../redux/actions";
//import {} from "../../constants/colors";
import {createStackNavigator} from "@react-navigation/stack";
import EventsScreen from "./events_screen";
import DetailsScreen from "./details_screen";
import ChatScreen from "./chat_screen";
import CreateEventScreen from "./create_event_screen";
import CreateGroupScreen from "./create_group_screen";
import AddUserScreen from "./add_user_screen";

const Stack = createStackNavigator();

class MainStack extends React.Component {
    render() {
        return (
            <Stack.Navigator initialRouteName="events" mode='modal'>
                <Stack.Screen name="events"
                              component={EventsScreen}
                              options={{headerShown: false}}/>
                <Stack.Screen name="details"
                              component={DetailsScreen}
                              options={{headerShown: false}}/>
                <Stack.Screen name="chat"
                              component={ChatScreen}
                              options={{headerShown: false}}/>
                <Stack.Screen name="create_event"
                              component={CreateEventScreen}
                              options={{headerShown: false}}/>
                <Stack.Screen name="create_group"
                              component={CreateGroupScreen}
                              options={{headerShown: false}}/>
                <Stack.Screen name="add_user"
                              component={AddUserScreen}
                              options={{headerShown: false}}/>
            </Stack.Navigator>
        )
    }
}

export default MainStack;
