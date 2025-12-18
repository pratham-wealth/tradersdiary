import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        backgroundColor: '#FFFFFF',
        paddingTop: 40,
        paddingBottom: 60, // Space for footer
        paddingHorizontal: 40,
        fontFamily: 'Helvetica',
        fontSize: 12,
        color: '#1F2937',
    },
    // Header (First Page Only - In Flow)
    header: {
        marginBottom: 20,
        borderBottomWidth: 2,
        borderBottomColor: '#111827',
        paddingBottom: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start'
    },
    headerLeft: {
        flexDirection: 'column',
        flex: 1
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
        marginBottom: 15,
    },
    sectionTitle: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#4B5563',
        marginBottom: 6,
        borderLeftWidth: 3,
        borderLeftColor: '#F59E0B', // Amber-500
        paddingLeft: 6,
        textTransform: 'uppercase',
    },
    text: {
        fontSize: 10,
        lineHeight: 1.5,
        color: '#374151',
        marginBottom: 6,
        textAlign: 'justify',
    },
    paragraph: {
        marginBottom: 8,
    },

    // Image
    imageContainer: {
        height: 200,
        marginBottom: 20,
        backgroundColor: '#F3F4F6',
        borderRadius: 8,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#E5E7EB',
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        width: '100%',
        height: '100%',
        objectFit: 'contain'
    },

    // Rules
    rulesContainer: {
        backgroundColor: '#F9FAFB',
        padding: 12,
        borderRadius: 4,
    },
    ruleRow: {
        flexDirection: 'row',
        marginBottom: 6,
    },
    ruleBullet: {
        width: 15,
        fontSize: 10,
        color: '#10B981', // Emerald-500
        fontWeight: 'bold',
    },
    ruleText: {
        fontSize: 10,
        color: '#1F2937',
        flex: 1,
    },

    // Footer (Fixed)
    footer: {
        position: 'absolute',
        bottom: 30,
        left: 40,
        right: 40,
        borderTopWidth: 1,
        borderTopColor: '#E5E7EB',
        paddingTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    footerTextLeft: {
        fontSize: 8,
        color: '#9CA3AF',
    },
    footerTextRight: {
        fontSize: 8,
        color: '#9CA3AF',
        textAlign: 'right'
    },
});

interface PatternPDFProps {
    name: string;
    group: string;
    description: string;
    understanding: string; // May contain newlines
    rules: string; // May contain newlines
    successRatio: string | number;
    imageUrl?: string | null;
    // New Fields
    marketContext?: string;
    invalidationConditions?: string;
    timeframeSuitability?: string;
    volumeConfirmation?: string;
    difficultyLevel?: string;
}

export const PatternPDF = ({
    name,
    group,
    description,
    understanding,
    rules,
    successRatio,
    imageUrl,
    marketContext,
    invalidationConditions,
    timeframeSuitability,
    volumeConfirmation,
    difficultyLevel
}: PatternPDFProps) => {

    // Helper to render text with newlines as paragraphs
    const renderParagraphs = (text?: string) => {
        if (!text) return null;
        return text.split('\n').filter(p => p.trim()).map((p, idx) => (
            <Text key={idx} style={[styles.text, styles.paragraph]}>{p.trim()}</Text>
        ));
    };

    // Helper to render rules list
    const renderRules = (text?: string) => {
        if (!text) return null;
        return text.split('\n').filter(r => r.trim()).map((rule, idx) => (
            <View key={idx} style={styles.ruleRow}>
                <Text style={styles.ruleBullet}>•</Text>
                <Text style={styles.ruleText}>{rule.trim().replace(/^\d+\.\s*/, '')}</Text> {/* Strip numbering if user added it manually, though dynamic list avoids this, legacy data might have it */}
            </View>
        ));
    };

    return (
        <Document>
            <Page size="A4" style={styles.page}>

                {/* Header - Flowing (only on first page because it's the first element) */}
                <View style={styles.header}>
                    <View style={styles.headerLeft}>
                        <Text style={styles.subtitle}>{group}</Text>
                        <Text style={styles.title}>{name}</Text>
                    </View>
                    <View style={styles.badge}>
                        <Text>Success Rate: {successRatio}%</Text>
                    </View>
                </View>

                {/* Sub Header Details - Grid */}
                <View style={{ flexDirection: 'row', marginBottom: 20, gap: 20 }}>
                    <View style={{ flex: 1 }}>
                        {difficultyLevel && (
                            <Text style={{ fontSize: 9, color: '#6B7280' }}>Difficulty: <Text style={{ color: '#111827', fontWeight: 'bold' }}>{difficultyLevel}</Text></Text>
                        )}
                        {timeframeSuitability && (
                            <Text style={{ fontSize: 9, color: '#6B7280' }}>Timeframes: <Text style={{ color: '#111827', fontWeight: 'bold' }}>{timeframeSuitability}</Text></Text>
                        )}
                    </View>
                    <View style={{ flex: 1 }}>
                        {volumeConfirmation && (
                            <Text style={{ fontSize: 9, color: '#6B7280' }}>Volume: <Text style={{ color: '#111827', fontWeight: 'bold' }}>{volumeConfirmation}</Text></Text>
                        )}
                    </View>
                </View>

                {/* Main Image */}
                {imageUrl && (
                    <View style={styles.imageContainer}>
                        {/* eslint-disable-next-line jsx-a11y/alt-text */}
                        <Image src={imageUrl} style={styles.image} />
                    </View>
                )}

                {/* Understanding Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Understanding the Pattern</Text>
                    <Text style={[styles.text, { fontStyle: 'italic', color: '#6B7280' }]}>{description}</Text>
                    <View>{renderParagraphs(understanding)}</View>
                </View>

                {/* Market Context & Invalidation */}
                {(marketContext || invalidationConditions) && (
                    <View style={{ flexDirection: 'row', gap: 20, marginBottom: 15 }}>
                        {marketContext && (
                            <View style={{ flex: 1 }}>
                                <Text style={styles.sectionTitle}>Market Context</Text>
                                <Text style={styles.text}>{marketContext}</Text>
                            </View>
                        )}
                        {invalidationConditions && (
                            <View style={{ flex: 1 }}>
                                <Text style={styles.sectionTitle}>Invalidation</Text>
                                <Text style={styles.text}>{invalidationConditions}</Text>
                            </View>
                        )}
                    </View>
                )}

                {/* Trading Rules */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Trading Rules & Execution</Text>
                    <View style={styles.rulesContainer}>
                        {renderRules(rules)}
                    </View>
                </View>

                {/* Footer (Fixed on all pages) */}
                <View style={styles.footer} fixed>
                    <Text style={styles.footerTextLeft}>© Traders Library</Text>
                    <Text style={styles.footerTextRight}>https://tradediary.equitymarvels.com</Text>
                </View>
            </Page>
        </Document>
    );
};
