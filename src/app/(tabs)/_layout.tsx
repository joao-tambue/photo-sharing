import { TabList, TabSlot, TabTrigger, Tabs } from "expo-router/ui";

import { icons, iconSizes } from "@/shared/assets";
import { TabBar, TabBarActionButton, TabBarButton } from "@/shared/components/tab-bar";

export default function TabLayout() {
  return (
    <Tabs>
      <TabSlot />
      <TabList asChild>
        <TabBar>
          <TabTrigger name="index" href="/" asChild>
            <TabBarButton label="Gallery" icon={icons.home} iconSize={iconSizes.tab} />
          </TabTrigger>
          <TabTrigger name="transfers" href="/transfers" asChild>
            <TabBarButton label="Transfers" icon={icons.folder} iconSize={iconSizes.tab} />
          </TabTrigger>
          <TabTrigger name="nearby" href="/nearby" asChild>
            <TabBarActionButton label="Share nearby" />
          </TabTrigger>
          <TabTrigger name="profile" href="/profile" asChild>
            <TabBarButton label="Profile" icon={icons.user} iconSize={iconSizes.user} />
          </TabTrigger>
          <TabTrigger name="more" href="/more" asChild>
            <TabBarButton label="More" icon={icons.more} iconSize={iconSizes.more} />
          </TabTrigger>
        </TabBar>
      </TabList>
    </Tabs>
  );
}
