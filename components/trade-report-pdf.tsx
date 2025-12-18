import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

// Institutional Grade Styles
const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        backgroundColor: '#FFFFFF',
        padding: 30, // Standard margins
        fontFamily: 'Helvetica',
        fontSize: 10,
        color: '#1F2937', // Gray-800
    },
    // Header Section
    headerRoot: {
        marginBottom: 20,
        borderBottomWidth: 1.5,
        borderBottomColor: '#111827', // Gray-900
        paddingBottom: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        letterSpacing: 1,
        color: '#111827',
    },
    headerDate: {
        fontSize: 9,
        color: '#6B7280',
    },

    // Summary Strip (Compact)
    summaryStrip: {
        flexDirection: 'row',
        backgroundColor: '#F3F4F6', // Gray-100
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: '#E5E7EB',
        paddingVertical: 8,
        paddingHorizontal: 15,
        marginBottom: 25,
        justifyContent: 'space-between',
    },
    summaryItem: {
        flexDirection: 'column',
        alignItems: 'center',
    },
    summaryLabel: {
        fontSize: 7,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
        color: '#6B7280',
        marginBottom: 2,
    },
    summaryValue: {
        fontSize: 12, // Prominent
        fontWeight: 'bold',
        color: '#111827',
    },

    // Trade Block
    tradeBlock: {
        marginBottom: 25,
        breakInside: 'avoid',
    },
    // Trade Header Line
    tradeHeaderLine: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#E5E7EB',
        paddingBottom: 4,
        marginBottom: 8,
    },
    tradeInstrument: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#111827',
    },
    tradeMeta: {
        fontSize: 9,
        color: '#6B7280',
        textTransform: 'uppercase',
    },
    // Outcome Badge (Text based for minimalist professional look)
    outcomeBadge: {
        fontSize: 9,
        fontWeight: 'bold',
        paddingHorizontal: 6,
        paddingVertical: 1,
        borderRadius: 2,
        textTransform: 'uppercase',
    },

    // Timeline Row
    timelineRow: {
        flexDirection: 'row',
        marginBottom: 8,
        paddingBottom: 8,
        borderBottomWidth: 0.5,
        borderBottomColor: '#F3F4F6',
    },
    timelineText: {
        fontSize: 7,
        color: '#6B7280',
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },

    // Data Grid (Dense)
    gridContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 10,
    },
    gridItem: {
        width: '25%', // 4 Columns
        marginBottom: 6,
    },
    gridLabel: {
        fontSize: 7,
        color: '#6B7280',
        textTransform: 'uppercase',
        marginBottom: 1,
    },
    gridValue: {
        fontSize: 10,
        color: '#111827',
        fontWeight: 'medium', // Slightly heavier than normal
    },
    gridValueBold: {
        fontSize: 10,
        fontWeight: 'bold',
        color: '#111827',
    },

    // Sections
    sectionHeader: {
        fontSize: 8,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        color: '#4B5563', // Gray-600
        marginBottom: 4,
        marginTop: 4,
        borderLeftWidth: 2,
        borderLeftColor: '#9CA3AF',
        paddingLeft: 4,
    },
    textContent: {
        fontSize: 9,
        color: '#374151',
        lineHeight: 1.4,
        textAlign: 'justify',
    },

    // Footer
    footer: {
        position: 'absolute',
        bottom: 20,
        left: 30,
        right: 30,
        borderTopWidth: 0.5,
        borderTopColor: '#E5E7EB',
        paddingTop: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    footerText: {
        fontSize: 7,
        color: '#9CA3AF',
    },
});

interface TradePDFProps {
    title: string;
    dateRange?: string;
    trades: any[];
    summary?: {
        total: number;
        wins: number;
        losses: number;
        winRate: string;
        netPnL?: string;
    };
}

export const TradeReportPDF = ({ title, dateRange, trades, summary }: TradePDFProps) => {

    // Helper for P&L styling
    const getPnlColor = (val: number | string | undefined) => {
        if (!val) return '#111827';
        const num = typeof val === 'string' ? parseFloat(val) : val;
        if (num > 0) return '#166534'; // Green-800
        if (num < 0) return '#991B1B'; // Red-800
        return '#111827';
    };

    return (
        <Document>
            <Page size="A4" style={styles.page}>

                {/* Header */}
                <View style={styles.headerRoot}>
                    <View>
                        <Text style={styles.headerTitle}>{title}</Text>
                        <Text style={[styles.headerDate, { marginTop: 2 }]}>{dateRange || new Date().toLocaleDateString()}</Text>
                    </View>
                    <View>
                        {/* Company / Brand Name could go here */}
                        <Text style={[styles.headerDate, { textAlign: 'right' }]}>GENERATED REPORT</Text>
                    </View>
                </View>

                {/* Aggregated Summary Strip */}
                {summary && (
                    <View style={styles.summaryStrip}>
                        <View style={styles.summaryItem}>
                            <Text style={styles.summaryLabel}>TOTAL TRADES</Text>
                            <Text style={styles.summaryValue}>{summary.total}</Text>
                        </View>
                        <View style={styles.summaryItem}>
                            <Text style={styles.summaryLabel}>WIN RATE</Text>
                            <Text style={[styles.summaryValue, { color: '#D97706' }]}>{summary.winRate}%</Text>
                        </View>
                        <View style={styles.summaryItem}>
                            <Text style={styles.summaryLabel}>WINS</Text>
                            <Text style={[styles.summaryValue, { color: '#166534' }]}>{summary.wins}</Text>
                        </View>
                        <View style={styles.summaryItem}>
                            <Text style={styles.summaryLabel}>LOSSES</Text>
                            <Text style={[styles.summaryValue, { color: '#991B1B' }]}>{summary.losses}</Text>
                        </View>
                        {/* 
                         // P&L Removed from UI globally as per request, but if passed in summary it can calculate points
                         // For now we stick to the provided summary object structure
                        */}
                    </View>
                )}

                {/* Trades Iteration */}
                {trades.map((trade, index) => {
                    const isWin = trade.outcome === 'WIN';
                    const isLoss = trade.outcome === 'LOSS';
                    const isOpen = trade.outcome === 'OPEN';

                    let outcomeColor = '#4B5563'; // Gray
                    let outcomeBg = '#F3F4F6';
                    if (isWin) { outcomeColor = '#166534'; outcomeBg = '#DCFCE7'; } // Green
                    if (isLoss) { outcomeColor = '#991B1B'; outcomeBg = '#FEE2E2'; } // Red
                    if (isOpen) { outcomeColor = '#1E40AF'; outcomeBg = '#DBEAFE'; } // Blue

                    return (
                        <View key={trade.id || index} style={styles.tradeBlock} wrap={false}>

                            {/* Trade Header Line */}
                            <View style={styles.tradeHeaderLine}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Text style={styles.tradeInstrument}>{trade.instrument}</Text>
                                    <Text style={[styles.tradeMeta, { marginLeft: 8 }]}>•   {trade.direction}</Text>
                                    <View style={[styles.outcomeBadge, { backgroundColor: outcomeBg, marginLeft: 8 }]}>
                                        <Text style={{ color: outcomeColor }}>{trade.outcome}</Text>
                                    </View>
                                </View>
                                <Text style={styles.tradeMeta}>{new Date(trade.entry_date).toLocaleDateString()}</Text>
                            </View>

                            {/* Timeline Row */}
                            <View style={styles.timelineRow}>
                                {trade.study?.created_at && (
                                    <Text style={styles.timelineText}>
                                        Study Created: {new Date(trade.study.created_at).toLocaleDateString()}
                                        {'   |   '}
                                    </Text>
                                )}
                                {trade.radar_date && (
                                    <Text style={styles.timelineText}>
                                        Added to Watchlist: {new Date(trade.radar_date).toLocaleDateString()}
                                        {'   |   '}
                                    </Text>
                                )}
                                <Text style={styles.timelineText}>
                                    Trade Triggered: {new Date(trade.entry_date).toLocaleDateString()}
                                </Text>
                                {trade.exit_date && (
                                    <Text style={styles.timelineText}>
                                        {'   |   '}
                                        Trade Exited: {new Date(trade.exit_date).toLocaleDateString()}
                                    </Text>
                                )}
                            </View>

                            {/* Data Grid (4 Columns) */}
                            <View style={styles.gridContainer}>
                                <View style={styles.gridItem}>
                                    <Text style={styles.gridLabel}>ENTRY PRICE</Text>
                                    <Text style={styles.gridValue}>{trade.entry_price?.toFixed(2) || '-'}</Text>
                                </View>
                                <View style={styles.gridItem}>
                                    <Text style={styles.gridLabel}>EXIT PRICE</Text>
                                    <Text style={styles.gridValue}>{trade.exit_price?.toFixed(2) || '-'}</Text>
                                </View>
                                <View style={styles.gridItem}>
                                    <Text style={styles.gridLabel}>P&L POINTS</Text>
                                    <Text style={[styles.gridValueBold, { color: getPnlColor(trade.pnl_points) }]}>
                                        {trade.pnl_points ? trade.pnl_points.toFixed(2) : '-'}
                                    </Text>
                                </View>
                                <View style={styles.gridItem}>
                                    <Text style={styles.gridLabel}>STRATEGY</Text>
                                    <Text style={styles.gridValue}>{trade.strategy?.name || 'Manual'}</Text>
                                </View>

                                {/* Row 2 */}
                                <View style={styles.gridItem}>
                                    <Text style={styles.gridLabel}>STOP LOSS</Text>
                                    <Text style={styles.gridValue}>{trade.stop_loss?.toFixed(2) || '-'}</Text>
                                </View>
                                <View style={styles.gridItem}>
                                    <Text style={styles.gridLabel}>TARGET</Text>
                                    <Text style={styles.gridValue}>{trade.target_price?.toFixed(2) || '-'}</Text>
                                </View>
                                {/* Spacers if needed */}
                            </View>

                            {/* Detailed Analysis (Full Width) */}
                            {
                                (trade.notes) && (
                                    <View style={{ marginTop: 2 }}>
                                        <Text style={styles.sectionHeader}>ANALYSIS & EXECUTION NOTES</Text>
                                        <Text style={styles.textContent}>
                                            {trade.notes}
                                        </Text>
                                    </View>
                                )
                            }

                            {/* Linked Study (Full Width) */}
                            {
                                trade.study && (
                                    <View style={{ marginTop: 6 }}>
                                        <Text style={[styles.sectionHeader, { borderLeftColor: '#7C3AED', color: '#7C3AED' }]}>
                                            LINKED STUDY: {trade.study.title?.toUpperCase()}
                                        </Text>
                                        <Text style={styles.textContent}>
                                            {trade.study.content}
                                        </Text>
                                    </View>
                                )
                            }
                        </View>
                    );
                })}

                {/* Footer */}
                <View style={styles.footer} fixed>
                    <Text style={styles.footerText}>Traders Diary by Pratham Wealth Academy • https://tradediary.equitymarvels.com</Text>
                    <Text style={styles.footerText} render={({ pageNumber, totalPages }) => (
                        `Page ${pageNumber} of ${totalPages}`
                    )} />
                </View>

            </Page>
        </Document >
    );
};
