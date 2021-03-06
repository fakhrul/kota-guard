import React from "react";
import { View , StyleSheet} from "react-native";
import WebView from "react-native-webview" 
import { Header } from "../../components";
import { responsiveWidth } from 'react-native-responsive-dimensions';

const MyBillingScreen = ({ navigation }) => {
     const vimeo = `<iframe src="https://www.kota.my/list_bill?utf8=%E2%9C%93&ph=0133996061&cls=zllxxv&sub=1&button=" height="360" width="640" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>`;
    //const vimeo = `<iframe src="https://www.kota.my/" height="360" width="640" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>`;
    
    return (
        <View style={styles.container}>
            <Header
                title="My Billing"
                navigation={navigation}
            >
            </Header>
            <WebView
                originWhitelist={['*']}
                source={{ html: vimeo }}
                style={{ width: 550, height: 100 }}
                automaticallyAdjustContentInsets={true}
                // style={styles.webview}
                />
            {/* <WebView
                originWhitelist={['*']}
                source={{ html: `<div><iframe width="560" height="315" src="https://www.youtube.com/embed/YQXuYAHIln4"></iframe></div>` }}
                // style={{ width: 600, height: 200 }}
            /> */}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      borderWidth:1

    //   justifyContent: 'center',
    //   width: responsiveWidth(98),
    //   height: responsiveWidth(98),
    //   backgroundColor: '#ecf0f1',
    //   padding: 8,
    },
    webview:{
        width: responsiveWidth(98),
        height: responsiveWidth(98),
    }
  });

export default MyBillingScreen;
