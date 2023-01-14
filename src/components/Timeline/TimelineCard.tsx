import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import ThemeText from "~components/widgets/ThemeText";
import { useNavigation } from "@react-navigation/native";
import { TabTimelineParamList } from "~utils/navigation/navigators";
import { StackNavigationProp } from "@react-navigation/stack";
import { useTheme } from "~utils/styles/ThemeManager";
import { StyleConstants } from "~utils/styles/constants";
import moment from "moment";
import NeatlyImage from "~components/widgets/NeatlyImage";

const TimelineCard = ({ item }: { item: any }) => {
  const { colors } = useTheme();
  const navigation = useNavigation<StackNavigationProp<TabTimelineParamList>>();

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() =>
        navigation.navigate("Tab-Timeline-Detail", {
          petId: item?._id,
          petName: item?.petName,
        })
      }
      style={[
        styles.timelineCard,
        {
          marginBottom: StyleConstants.Spacing.M,
        },
      ]}
    >
      <NeatlyImage
        uri={{
          remote:
            "https://images.pexels.com/photos/7726294/pexels-photo-7726294.jpeg?auto=compress&cs=tinysrgb&w=600",
        }}
        imageStyle={styles.timelineImage}
        blurHash="UNG[cp~p%0xC4:$eofX8n$IoIpayPCNboJni"
        containerStyle={styles.timelineCardImageBlurHashContainer}
      />
      <View style={styles.timelineCardContent}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <ThemeText fontStyle="L" fontWeight={"Medium"} color={colors.primary}>
            {item?.petName}
          </ThemeText>
          <ThemeText fontStyle={"XS"} color={"rgba(0, 0, 0, 0.6)"}>
            {moment(item?.createdAt).format("MMM, DDD, YYYY")}
          </ThemeText>
        </View>

        {(item?.information || item?.specialTraits) && (
          <ThemeText fontStyle={"S"} fontWeight={"Light"} numberOfLines={2}>
            {item?.information || item?.specialTraits}
          </ThemeText>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  timelineCard: {
    backgroundColor: "#fff",
    borderRadius: 24,
    padding: 16,
    marginHorizontal: 16,
  },
  timelineImage: {
    width: "100%",
    height: 250,
    borderRadius: 20,
    elevation: 4,
  },
  timelineCardContent: {
    paddingTop: 16,
    paddingHorizontal: 8,
  },
  timelineCardImageBlurHashContainer: {
    width: "100%",
    height: 250,
    borderRadius: 20,
    overflow: "hidden",
    position: "absolute",
    marginHorizontal: 16,
    marginTop: 16,
  },
});

export default TimelineCard;
