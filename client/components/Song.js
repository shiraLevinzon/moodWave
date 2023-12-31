import React from 'react'
import { StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';

export const Song = ({ route }) => {
    const song = route.params?.song || 'Default Value';

    return (
        <View style={styles.container}>
            <WebView
                source={{ uri: song.songUrl }}
                allowsFullscreenVideo={true}
                style={styles.webview}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    webview: {
        flex: 1,
    },
});

