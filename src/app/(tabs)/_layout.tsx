import { NativeTabs } from "expo-router/native-tabs";

export default function TabLayout() {
  return (
    <NativeTabs tintColor="#FFA738">
      <NativeTabs.Trigger name="index">
        <NativeTabs.Trigger.Label>Home</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          src={require("../../../assets/icons/home.svg")}
          renderingMode="template"
        />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="send">
        <NativeTabs.Trigger.Label hidden>Send</NativeTabs.Trigger.Label>

        <NativeTabs.Trigger.Icon sf="plus" md="add" />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="profile">
        <NativeTabs.Trigger.Label>Profile</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          src={require("../../../assets/icons/user.svg")}
          renderingMode="template"
        />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
