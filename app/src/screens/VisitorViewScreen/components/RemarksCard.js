import React, { useContext, useRef } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { NativeImage, DeleteCardRightActions } from "../../../components";
import { useMutation } from "@apollo/react-hooks";
import { MUTATION_DELETE_REMARKS } from "../../../graphql/mutation";
import { colors, longPressDeleteNotification } from "../../../utils";
import moment from "moment";
import { Context as AuthContext } from "../../../context/AuthContext";
import Swipeable from "react-native-gesture-handler/Swipeable";

const RemarksCard = ({
    navigation,
    visitorId,
    remarksId,
    authorId,
    authorName,
    caption,
    body,
    time,
}) => {

    const { state } = useContext(AuthContext);
    const parsedTime = moment(time).fromNow();

    const [
        deleteRemarks,
        { loading: deleteRemarksLoading, called: deleteRemarksCalled },
    ] = useMutation(MUTATION_DELETE_REMARKS);

    const swipeableRef = useRef();

    const navigateToProfile = () => {
        if (authorId === state.userId) return;
        navigation.navigate("profileViewFlow", { userId: authorId });
    };

    const onDelete = () => {
        if (!deleteRemarksLoading && !deleteRemarksCalled) {
            longPressDeleteNotification(() => {
                swipeableRef.current.close();
                deleteRemarks({ variables: { visitorId, remarksId } });
            });
        }
    };

    const renderRightActions = (progress, dragX) => {
        if (authorId !== state.userId) return null;
        return (
            <DeleteCardRightActions
                progress={progress}
                dragX={dragX}
                onDelete={onDelete}
            />
        );
    };

    return (
        <View style={styles.container}>
            <Swipeable
                ref={swipeableRef}
                useNativeAnimations
                containerStyle={styles.swipeable}
                rightThreshold={-80}
                renderRightActions={renderRightActions}
            >
                <TouchableOpacity
                    activeOpacity={0.95}
                    onPress={navigateToProfile}
                    style={styles.container}
                >
                    {/* <Text style={styles.commentText}>{authorName}</Text>
                    <Text style={styles.commentText}>{caption}</Text> */}
                    <View style={styles.info}>
                        <Text style={styles.timeText}>
                            <Text style={styles.handleText}>Author: {authorName} </Text>
                            {parsedTime}
                        </Text>
                        <Text style={styles.commentText}>Remarks: {body}</Text>
                    </View>
                </TouchableOpacity>
            </Swipeable>
        </View>
    );
};

const styles = StyleSheet.create({
    swipeable: {
        marginVertical: 5,
    },
    container: {
        // flexDirection: "row",
        // borderRadius: 5,
        marginVertical: 5,
    },
    avatarImage: {
        height: 40,
        width: 40,
        borderRadius: 50,
        backgroundColor: colors.placeholder,
    },
    info: {
        flex: 1,
        justifyContent: "center",
        paddingLeft: 10,
    },
    handleText: {
        fontSize: 16,
        color: colors.text01,
    },
    commentText: {
        fontSize: 16,
        color: colors.text01,
    },
    timeText: {
        fontSize: 14,
        color: colors.text02,
        paddingTop: 2,
    },
});

export default RemarksCard;
