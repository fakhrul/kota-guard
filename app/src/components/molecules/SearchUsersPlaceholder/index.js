import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { responsiveWidth } from 'react-native-responsive-dimensions';
import { Placeholder, PlaceholderLine, PlaceholderMedia, ShineOverlay } from 'rn-placeholder';
import {colors} from "../../../utils";

const SearchUsersPlaceholder: React.FC = () => {

    return (
    <View style={styles.container}>
      <Placeholder Animation={ShineOverlay}>
        {new Array(20)
          .fill({})
          .map((_, index) =>
            <View key={index} style={styles.cardContainer}>
              <PlaceholderMedia color={colors.placeholder} size={50} isRound />
              <View style={styles.infoContainer}>
                <PlaceholderLine
                  noMargin
                  color={colors.placeholder}
                  style={styles.userInfoPlaceholder}
                  width={responsiveWidth(20)}
                />
                <PlaceholderLine
                  noMargin
                  color={colors.placeholder}
                  style={styles.userInfoPlaceholder}
                  width={responsiveWidth(10)}
                />
              </View>
            </View>
          )}
      </Placeholder>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingBottom: 0
  },
  cardContainer: {
    flexDirection: 'row',
    marginBottom: 20
  },
  infoContainer: {
    flex: 1,
    paddingLeft: 10
  },
  userInfoPlaceholder: {
    borderRadius: 10,
    marginTop: 10
  }
});

export default SearchUsersPlaceholder;