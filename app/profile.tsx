import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function Profile() {
	return (
		<View style={styles.container}>
			<Text style={styles.title}>Profile</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
	title: { fontSize: 18, fontWeight: '600' },
});
