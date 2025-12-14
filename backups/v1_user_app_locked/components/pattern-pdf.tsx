import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        backgroundColor: '#FFFFFF',
        padding: 40,
        fontFamily: 'Helvetica',
        fontSize: 12,
        color: '#1F2937',
    },
    header: {
        marginBottom: 30,
        borderBottomWidth: 2,
        borderBottomColor: '#111827',
        paddingBottom: 15,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        color: '#111827',
        marginBottom: 4,
    },
    subtitle: {
        fontSize: 10,
        color: '#6B7280',
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    badge: {
        position: 'absolute',
        top: 0,
        right: 0,
        backgroundColor: '#DCFCE7', // Green-100
        color: '#166534', // Green-800
        paddingVertical: 4,
        paddingHorizontal: 8,
        borderRadius: 4,
        fontSize: 10,
        fontWeight: 'bold',
    },

    // Content
    section: {
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#4B5563',
        marginBottom: 8,
        borderLeftWidth: 3,
        borderLeftColor: '#F59E0B', // Amber-500
        paddingLeft: 8,
        textTransform: 'uppercase',
    },
    text: {
        fontSize: 11,
        lineHeight: 1.6,
        color: '#374151',
        marginBottom: 10,
        textAlign: 'justify',
    },

    // Trading Rules Layout
    rulesContainer: {
        backgroundColor: '#F9FAFB',
        padding: 15,
        borderRadius: 4,
        marginTop: 5,
    },
    ruleText: {
        fontSize: 11,
        color: '#1F2937',
        marginBottom: 6,
    },

    // Footer
    footer: {
        position: 'absolute',
        bottom: 30,
        left: 40,
        right: 40,
        borderTopWidth: 1,
        borderTopColor: '#E5E7EB',
        paddingTop: 15,
        textAlign: 'center',
    },
    footerText: {
        fontSize: 8,
        color: '#9CA3AF',
    },
});

interface PatternPDFProps {
    name: string;
    group: string;
    description: string;
    understanding: string;
    rules: string;
    successRatio: number;
    // imageUrl?: string; // React-PDF image support requires working valid URLs
}

export const PatternPDF = ({ name, group, description, understanding, rules, successRatio }: PatternPDFProps) => (
    <Document>
        <Page size="A4" style={styles.page}>
            {/* Header */}
            <View style={styles.header}>
                <View>
                    <Text style={styles.subtitle}>{group}</Text>
                    <Text style={styles.title}>{name}</Text>
                </View>
                <View style={styles.badge}>
                    <Text>Success Rate: {successRatio}%</Text>
                </View>
            </View>

            {/* Understanding Section */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Understanding the Pattern</Text>
                <Text style={styles.text}>{description}</Text>
                <Text style={styles.text}>{understanding}</Text>
            </View>

            {/* Trading Rules */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Trading Rules & Execution</Text>
                <View style={styles.rulesContainer}>
                    <Text style={styles.text}>{rules}</Text>
                </View>
            </View>

            {/* Footer */}
            <View style={styles.footer}>
                <Text style={styles.footerText}>© TradeNote Learning Library • Institutional Trading Patterns</Text>
            </View>
        </Page>
    </Document>
);
