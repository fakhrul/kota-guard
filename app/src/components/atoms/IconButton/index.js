import React from "react";
import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import {colors} from "../../../utils";

const IconButton = ({ Icon, onPress, style, hasBadge, badgeCount }) => (
  <TouchableOpacity
    onPress={onPress}
    activeOpacity={0.95}
    style={styles.container}
  >
    <Icon />
    {hasBadge && (
      <View style={styles.badge}>
        <Text style={styles.badgeText}>{badgeCount}</Text>
      </View>
    )}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    alignItems: "flex-end",
    width: 40,
  },
  badge: {
    position: "absolute",
    height: 20,
    width: 20,
    alignItems: "center",
    justifyContent: "center",
    top: -10,
    right: -10,
    borderRadius: 20,
    backgroundColor: colors.badge,
  },
  badgeText: {
    fontSize: 14,
    color: colors.white,
  },
});

export default IconButton;
