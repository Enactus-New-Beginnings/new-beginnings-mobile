/* -----------
GENERAL USABLE COMPONENT - PLEASE DO NOT EDIT UNLESS YOU WISH TO MAKE APPWIDE CHANGES!
You can view documentation for this component here: 
Thanks! 
-Franklin
--------------*/
import * as React from 'react';
import { Dialog, Portal, Provider } from 'react-native-paper';

export default function Popup(props){
    return(
            <Portal>
            <Dialog visible={props.visible} onDismiss={()=>{props.dismiss()}}>
              <Dialog.Title>Alert</Dialog.Title>
              <Dialog.Content>
                {props.content()}
              </Dialog.Content>
              <Dialog.Actions>
                {props.actions()}
              </Dialog.Actions>
            </Dialog>
          </Portal>)
}