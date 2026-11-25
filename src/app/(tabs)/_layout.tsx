import { TabList, TabSlot, TabTrigger, Tabs } from "expo-router/ui";

import { TabBar, TabBarActionButton, TabBarButton } from "@/components/tab-bar";

const userIconSize = { width: 25, height: 25 };
const moreIconSize = { width: 24.5419, height: 25 };

export default function TabLayout() {
  return (
    <Tabs>
      <TabSlot />
      <TabList asChild>
        <TabBar>
          <TabTrigger name="index" href="/" asChild>
            <TabBarButton
              label="Home"
              icon={require("@/assets/icons/home.svg")}
            />
          </TabTrigger>
          <TabTrigger name="folder" href="/folder" asChild>
            <TabBarButton
              label="Folder"
              icon={require("@/assets/icons/folder 03.svg")}
            />
          </TabTrigger>
          <TabTrigger name="send" href="/send" asChild>
            <TabBarActionButton accessibilityLabel="Send" />
          </TabTrigger>
          <TabTrigger name="profile" href="/profile" asChild>
            <TabBarButton
              label="Profile"
              icon={require("@/assets/icons/user.svg")}
              iconSize={userIconSize}
            />
          </TabTrigger>
          <TabTrigger name="more" href="/more" asChild>
            <TabBarButton
              label="More"
              icon={require("@/assets/icons/more.svg")}
              iconSize={moreIconSize}
            />
          </TabTrigger>
        </TabBar>
      </TabList>
    </Tabs>
  );
}
