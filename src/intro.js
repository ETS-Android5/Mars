import React, { Fragment, Component } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
  Picker,
} from "react-native";
import { Button } from "react-native-elements";
import Swiper from "react-native-swiper";
import { storeNickNameYearBirth } from "./utils/save-utils";
import RadioForm from "react-native-simple-radio-button";

import { colors } from "./styles";

export default class Intro extends React.Component {
  state = {
    nickName: "",
    yearOfBirth: "",
    snoring: 0,
    tired: 0,
    observed: 0,
    pressure: 0,
    bodyMass: 0,
    ageOlder50: 0,
    largeNeckSize: 0,
    gender: null,
    hasSleepApnea: true,
    submitted: false,
  };

  onNavigate = () => {
    const { navigation } = this.props;
    const { nickName, yearOfBirth } = this.state;
    navigation.navigate("Home");
    storeNickNameYearBirth({ nickName, yearOfBirth });
  };

  onSubmitForSleepApnea = () => {
    const {
      snoring,
      tired,
      observed,
      pressure,
      bodyMass,
      ageOlder50,
      largeNeckSize,
      gender,
    } = this.state;
    const stopCount = snoring + tired + observed + pressure;
    if (
      (stopCount >= 2 && gender === "male") ||
      (stopCount >= 2 && largeNeckSize === 1 && gender === "female") ||
      (stopCount >= 2 && largeNeckSize === 1 && gender === "male") ||
      (stopCount >= 2 && bodyMass === 1)
    ) {
      this.setState({ hasSleepApnea: true });
    }

    this.setState({ submitted: true });
  };

  determineAge = (text) => {
    this.setState({ yearOfBirth: text });
    const year = new Date().getFullYear();
    if (year - text >= 50) {
      this.setState({ ageOlder50: 1 });
    } else {
      this.setState({ ageOlder50: 0 });
    }
  };
  render() {
    const { navigation } = this.props;
    const {
      snoring,
      tired,
      observed,
      pressure,
      bodyMass,
      ageOlder50,
      largeNeckSize,
      gender,
      hasSleepApnea,
      submitted,
    } = this.state;

    let collarQuestion =
      "For male, is your shirt collar 17 inches / 43cm or larger ?\n\n" +
      "For female, is your shirt collar 16 inches / 41cm or larger ?";
    if (gender === "male") {
      collarQuestion = "Is your shirt collar 17 inches / 43cm or larger ?";
    } else if (gender === "female") {
      collarQuestion = "Is your shirt collar 16 inches / 41cm or larger ?";
    }
    return (
      <Swiper
        showsButtons={true}
        activeDotColor={colors.accent}
        nextButton={<Text style={styles.buttonText}>›</Text>}
        prevButton={<Text style={styles.buttonText}>‹</Text>}
        loop={false}
      >
        <View style={styles.slide1}>
          <Image
            source={require("../assets/onboarding.png")}
            style={{ width: 300, height: 300 }}
          />
          <Text style={styles.intro_text}>
            This is a collaboration project between de Souza Institute and MGMT
            Capstone Team 8
          </Text>
        </View>
        <View style={styles.slide1}>
          <Image
            source={require("../assets/onboarding3.png")}
            style={{ width: 300, height: 300 }}
          />
          <Text
            style={{ fontWeight: "bold", textAlign: "center", fontSize: 20 }}
          >
            SleepWell is based on the Sleeping Well Manual developed by Dr.
            Sheila Garland (Memorial University) based on her original research
            and clinical practice treating insomnia in individuals diagnosed
            with cancer
          </Text>
        </View>
        <View style={styles.slide1}>
          <Image
            source={require("../assets/onboarding2.png")}
            style={{ width: 400, height: 250, marginBottom: 20 }}
          />
          <Text style={styles.intro_text}>
            SleepWell is a self-management sleep therapy app
            {"\n"}
            We suggest you stay with us for 6-8 weeks for the best results
          </Text>
        </View>
        <View style={styles.slide1}>
          <Image
            source={require("../assets/questionnaire.png")}
            style={{ width: 400, height: 250, marginBottom: 20 }}
          />
          <Text
            style={{ fontWeight: "bold", textAlign: "center", fontSize: 25 }}
          >
            To get started, we'll ask you a few questions about yourself. Don't
            worry, we do not save this data at all, this will simply be used to
            assess your risk for sleep apnea.
          </Text>
        </View>
        <View style={styles.slide2}>
          <Text style={styles.input_text}>Please enter your nickname</Text>
          <TextInput
            style={styles.textBox}
            autoCapitalize="words"
            onChangeText={(text) => this.setState({ nickName: text })}
          />
        </View>
        <View style={styles.slide3}>
          <Text style={styles.input_text}>Please enter your year of birth</Text>
          <TextInput
            style={styles.textBox}
            autoCapitalize="words"
            keyboardType="numeric"
            onChangeText={(text) => this.determineAge(text)}
          />
        </View>

        {/* ============================================== */}
        <View style={styles.slide2}>
          <View style={styles.question_view}>
            <Text style={styles.question_text}>
              Do you snore loudly? (loud enough to be heard through closed doors
              or your bed-partner elbows you for snoring at night)?
            </Text>
          </View>
          <View style={styles.radioButton_view}>
            <RadioForm
              radio_props={[
                { label: "Yes", value: 1 },
                { label: "No", value: 0 },
              ]}
              labelHorizontal={true}
              initial={-1}
              onPress={(value) => {
                this.setState({ snoring: value });
              }}
              animation={true}
              buttonSize={30}
              labelStyle={{ fontSize: 20, paddingLeft: 20 }}
              buttonColor={colors.accent}
              selectedButtonColor={colors.accent}
              radioStyle={{ padding: 5 }}
            />
          </View>
        </View>
        <View style={styles.slide2}>
          <View style={styles.question_view}>
            <Text style={styles.question_text}>
              Do you often feel Tired, Fatigued, or Sleepy during the daytime
              (such as falling asleep during driving or talking to someone)?
            </Text>
          </View>
          <View style={styles.radioButton_view}>
            <RadioForm
              radio_props={[
                { label: "Yes", value: 1 },
                { label: "No", value: 0 },
              ]}
              labelHorizontal={true}
              initial={-1}
              onPress={(value) => {
                this.setState({ tired: value });
              }}
              animation={true}
              buttonSize={30}
              labelStyle={{ fontSize: 20, paddingLeft: 20 }}
              buttonColor={colors.accent}
              selectedButtonColor={colors.accent}
              radioStyle={{ padding: 5 }}
            />
          </View>
        </View>
        <View style={styles.slide2}>
          <View style={styles.question_view}>
            <Text style={styles.question_text}>
              Has anyone Observed you Stop Breathing or Choking/Gasping during
              your sleep ?
            </Text>
          </View>
          <View style={styles.radioButton_view}>
            <RadioForm
              radio_props={[
                { label: "Yes", value: 1 },
                { label: "No", value: 0 },
              ]}
              initial={-1}
              labelHorizontal={true}
              onPress={(value) => {
                this.setState({ observed: value });
              }}
              animation={true}
              buttonSize={30}
              labelStyle={{ fontSize: 20, paddingLeft: 20 }}
              buttonColor={colors.accent}
              selectedButtonColor={colors.accent}
              radioStyle={{ padding: 5 }}
            />
          </View>
        </View>
        <View style={styles.slide2}>
          <View style={styles.question_view}>
            <Text style={styles.question_text}>
              Do you have or are being treated for High Blood Pressure ?
            </Text>
          </View>
          <View style={styles.radioButton_view}>
            <RadioForm
              radio_props={[
                { label: "Yes", value: 1 },
                { label: "No", value: 0 },
              ]}
              labelHorizontal={true}
              initial={-1}
              onPress={(value) => {
                this.setState({ pressure: value });
              }}
              animation={true}
              buttonSize={30}
              labelStyle={{ fontSize: 20, paddingLeft: 20 }}
              buttonColor={colors.accent}
              selectedButtonColor={colors.accent}
              radioStyle={{ padding: 5 }}
            />
          </View>
        </View>
        <View style={styles.slide2}>
          <View style={styles.question_view}>
            <Text style={styles.question_text}>Is your BMI over 35kg/m</Text>
            <Text style={styles.question_superscript_text}>2</Text>
          </View>
          <View style={styles.radioButton_view}>
            <RadioForm
              radio_props={[
                { label: "Yes", value: 1 },
                { label: "No", value: 0 },
                { label: "Not sure", value: 1 },
              ]}
              labelHorizontal={true}
              initial={-1}
              onPress={(value) => {
                this.setState({ bodyMass: value });
              }}
              animation={true}
              buttonSize={30}
              labelStyle={{ fontSize: 20, paddingLeft: 20 }}
              buttonColor={colors.accent}
              selectedButtonColor={colors.accent}
              radioStyle={{ padding: 5 }}
            />
          </View>
        </View>
        <View style={styles.slide2}>
          <View style={styles.question_view}>
            <Text style={styles.question_text}>
              What gender do you identify as ?
            </Text>
          </View>
          <View style={styles.radioButton_view}>
            <RadioForm
              radio_props={[
                { label: "Male", value: "male" },
                { label: "Female", value: "female" },
                { label: "Prefer not to say", value: "" },
                { label: "Not listed", value: "" },
              ]}
              labelHorizontal={true}
              initial={-1}
              onPress={(value) => {
                this.setState({ gender: value });
              }}
              animation={true}
              buttonSize={30}
              labelStyle={{ fontSize: 20, paddingLeft: 20 }}
              buttonColor={colors.accent}
              selectedButtonColor={colors.accent}
              radioStyle={{ padding: 5 }}
            />
          </View>
        </View>
        <View style={styles.slide2}>
          <View style={styles.question_view}>
            <Text style={styles.question_text}>{collarQuestion}</Text>
          </View>
          <View style={styles.radioButton_view}>
            <RadioForm
              radio_props={[
                { label: "Yes", value: 1 },
                { label: "No", value: 0 },
                { label: "Not sure", value: 1 },
              ]}
              labelHorizontal={true}
              initial={-1}
              onPress={(value) => {
                this.setState({ largeNeckSize: value });
              }}
              animation={true}
              buttonSize={30}
              labelStyle={{ fontSize: 20, paddingLeft: 20 }}
              buttonColor={colors.accent}
              selectedButtonColor={colors.accent}
              radioStyle={{ padding: 5 }}
            />
          </View>
        </View>
        {!submitted && (
          <View style={styles.slide2}>
            <Text style={styles.input_text}>Confirm my answers</Text>
            <Button
              buttonStyle={{
                borderRadius: 15,
                width: 150,
                backgroundColor: colors.accent,
              }}
              titleStyle={{
                color: "white",
              }}
              type="solid"
              title="Submit"
              onPress={this.onSubmitForSleepApnea}
            />
          </View>
        )}
        {submitted && hasSleepApnea && (
          <View style={styles.slide2}>
            <Text style={styles.question_text}>
              You may have sleep apnea. This application will not help you with
              symptoms relating to or caused by sleep apnea. Please seek
              professional help. {"\n\n"}
            </Text>
            <Button
              buttonStyle={{
                borderRadius: 15,
                width: 150,
                backgroundColor: colors.accent,
              }}
              titleStyle={{
                color: "white",
              }}
              type="solid"
              title="Go to chatbot"
              onPress={this.onNavigate}
            />
          </View>
        )}
        {submitted && !hasSleepApnea && (
          <View style={styles.slide2}>
            <Text style={styles.input_text}>You're all set</Text>
            <Button
              buttonStyle={{
                borderRadius: 15,
                width: 150,
                backgroundColor: colors.accent,
              }}
              titleStyle={{
                color: "white",
              }}
              type="solid"
              title="Go to chatbot!"
              onPress={this.onNavigate}
            />
          </View>
        )}
      </Swiper>
    );
  }
}

const styles = StyleSheet.create({
  slide1: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.background,
    padding: 50,
  },
  buttonText: {
    color: colors.accent,
    fontSize: 50,
  },
  slide2: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.background,
    padding: 15,
  },
  slide3: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.background,
    padding: 50,
  },
  intro_text: {
    color: "black",
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    fontFamily: "OpenSans-Regular",
  },
  input_text: {
    color: "black",
    fontSize: 30,
    fontWeight: "bold",
    paddingBottom: 50,
    textAlign: "center",
    fontFamily: "OpenSans-Regular",
  },
  question_view: {
    flex: 2,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "center",
    paddingBottom: 50,
    // borderWidth: 2
  },
  question_text: {
    color: "black",
    fontSize: 25,
    textAlign: "center",
    lineHeight: 30,
    paddingTop: 10,
    fontFamily: "OpenSans-Regular",
  },
  question_superscript_text: {
    color: "black",
    fontSize: 15,
    lineHeight: 40,
    // paddingTop: 10,
    textAlign: "center",
    fontFamily: "OpenSans-Regular",
  },
  radioButton_view: {
    flex: 2,
    alignItems: "flex-start",
    paddingTop: 30,
    // borderWidth: 2
  },
  textBox: {
    height: 50,
    width: 250,
    borderColor: "black",
    borderBottomWidth: 1,
    fontSize: 30,
    color: "black",
    fontWeight: "bold",
    textAlign: "center",
  },
});
