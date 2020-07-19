import React, { useState, useContext } from "react";
import { View, Text, StyleSheet, Button, TextInput } from "react-native";
import { Header } from "../../components";
import { colors } from "../../utils";
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from "moment";
import { useMutation } from "@apollo/react-hooks";
import { MUTATION_ADD_VISITOR } from "../../graphql/mutation";
import {
  postUploadedNotification,
  uploadErrorNotification,
} from "../../utils";
import { Context as AuthContext } from "../../context/AuthContext";

const VisitorAddScreen = ({ navigation }) => {
  const { state } = useContext(AuthContext);
  const [addVisitor] = useMutation(MUTATION_ADD_VISITOR);

  const [form, setForm] = new useState({
    visitorName: "",
    visitDate: new Date(1598051730000),
    plateNumber: "",
    remarks: "",
    unitId: "",
    unitName: "",
    isLoading: false
  });

  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || visitDate;
    setShow(Platform.OS === 'ios');
    setForm({
      ...form,
      visitDate: currentDate,
    });
  };

  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  const onMorePress = () => { };

  const onInputChanged = (value, input) => {
    setForm({
      ...form,
      [input]: value,
    });
  };

  const sendData = async () => {
    setForm({ isLoading: true });
    try {
      const {
        data: {
          addVisitor: { id: visitorId },
        },
      } = await addVisitor({
        variables: {
          userId: state.userId,
          communityId: state.communityId,
          visitorName: form.visitorName,
          visitDate: form.visitDate,
          plateNumber: form.plateNumber,
          remarks: form.remarks,
          unitId: form.unitId,
          unitName: form.unitName
        },
      });
      postUploadedNotification();
    } catch ({ message }) {
      uploadErrorNotification("Visitor");
      console.log(message);

    }
    setForm({ isLoading: false });
  };


  return (
    <View style={styles.container}>
      <Header
        title="Register Visitor"
        isBackButton= {true}
        navigation={navigation}
        onPress={onMorePress}
      ></Header>
      <View style={{ height: 20 }}></View>
      <Text>
        Visitor Name
      </Text>
      <TextInput style={{ borderWidth: 1 }} value={form.visitorName} onChangeText={(value) => onInputChanged(value, "visitorName")}></TextInput>
      <View style={{ height: 20 }}></View>
      <Text>
        Date
      </Text>
      <TextInput style={{ borderWidth: 1 }} value={moment(form.visitDate).format("DD/MM/YYYY")}></TextInput>
      <View>
        <Button onPress={showDatepicker} title="Change date" />
      </View>
      <View style={{ height: 20 }}></View>
      <Text>
        Time
      </Text>
      <TextInput style={{ borderWidth: 1 }} value={moment(form.visitDate).format("HH:mm:ss")}></TextInput>
      <Button onPress={showTimepicker} title="Change time" />
      <View style={{ height: 20 }}></View>
      <Text>
        Plate Number
      </Text>
      <TextInput style={{ borderWidth: 1 }} value={form.plateNumber} onChangeText={(value) => onInputChanged(value, "plateNumber")}></TextInput>
      <View style={{ height: 20 }}></View>
      <Text>
        Remarks
      </Text>
      <TextInput style={{ borderWidth: 1 }} value={form.remarks} onChangeText={(value) => onInputChanged(value, "remarks")}></TextInput>
      <View style={{ height: 20 }}></View>
      <Text>
        Unit Name
      </Text>
      <TextInput style={{ borderWidth: 1 }} value={form.unitName} onChangeText={(value) => onInputChanged(value, "unitName")}></TextInput>
      <View style={{ height: 20 }}></View>
      <Button onPress={sendData} title="Submit" />
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={form.visitDate}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onDateChange}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EFECF4",
  },
});
export default VisitorAddScreen;
