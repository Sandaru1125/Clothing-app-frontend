import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function Women() {
	return (
		<View style={styles.container}>
			<Text style={styles.title}>Women</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
	title: { fontSize: 18, fontWeight: '600' },
});
