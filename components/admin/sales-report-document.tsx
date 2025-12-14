import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        backgroundColor: '#FFFFFF',
        padding: 30,
        fontFamily: 'Helvetica',
    },
    header: {
        marginBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#111',
        paddingBottom: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    subtitle: {
        fontSize: 12,
        color: '#555',
    },
    section: {
        marginTop: 20,
        marginBottom: 10,
    },
    sectionTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 10,
        backgroundColor: '#f0f0f0',
        padding: 5,
    },
    statsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 15,
        paddingHorizontal: 5,
    },
    statBox: {
        alignItems: 'center',
    },
    statLabel: {
        fontSize: 10,
        color: '#666',
        textTransform: 'uppercase',
    },
    statValue: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#000',
    },
    table: {
        display: 'flex',
        width: 'auto',
        borderStyle: 'solid',
        borderWidth: 1,
        borderRightWidth: 0,
        borderBottomWidth: 0,
    },
    tableRow: {
        margin: 'auto',
        flexDirection: 'row',
    },
    tableCol: {
        width: '20%',
        borderStyle: 'solid',
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0,
    },
    tableColSmall: {
        width: '10%',
        borderStyle: 'solid',
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0,
    },
    tableColLarge: {
        width: '30%',
        borderStyle: 'solid',
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0,
    },
    tableCell: {
        margin: 5,
        fontSize: 10,
    },
    tableHeader: {
        margin: 5,
        fontSize: 10,
        fontWeight: 'bold',
    },
});

type SalesPDFProps = {
    period: string; // 'Today', 'This Week', 'This Month'
    data: any; // The full sales data object
    transactions: any[]; // The specific list for this report
};

export const SalesPDF = ({ period, data, transactions }: SalesPDFProps) => {
    const totalRev = transactions.reduce((acc, curr) => acc + Number(curr.amount || 0), 0);

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.header}>
                    <Text style={styles.title}>Sales Report</Text>
                    <Text style={styles.subtitle}>Period: {period}</Text>
                    <Text style={styles.subtitle}>Generated on: {new Date().toLocaleDateString()}</Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Summary</Text>
                    <View style={styles.statsRow}>
                        <View style={styles.statBox}>
                            <Text style={styles.statLabel}>Total Transactions</Text>
                            <Text style={styles.statValue}>{transactions.length}</Text>
                        </View>
                        <View style={styles.statBox}>
                            <Text style={styles.statLabel}>Total Revenue</Text>
                            <Text style={styles.statValue}>INR {totalRev.toLocaleString()}</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Transaction Details</Text>
                    <View style={styles.table}>
                        <View style={styles.tableRow}>
                            <View style={styles.tableCol}><Text style={styles.tableHeader}>Date</Text></View>
                            <View style={styles.tableColLarge}><Text style={styles.tableHeader}>User</Text></View>
                            <View style={styles.tableCol}><Text style={styles.tableHeader}>Gateway</Text></View>
                            <View style={styles.tableColSmall}><Text style={styles.tableHeader}>Plan</Text></View>
                            <View style={styles.tableCol}><Text style={styles.tableHeader}>Amount</Text></View>
                        </View>
                        {transactions.map((tx, i) => (
                            <View style={styles.tableRow} key={i}>
                                <View style={styles.tableCol}>
                                    <Text style={styles.tableCell}>{new Date(tx.date).toLocaleDateString()}</Text>
                                </View>
                                <View style={styles.tableColLarge}>
                                    <Text style={styles.tableCell}>{tx.user_name}</Text>
                                    <Text style={{ fontSize: 8, color: '#666', marginLeft: 5 }}>{tx.user_email}</Text>
                                </View>
                                <View style={styles.tableCol}>
                                    <Text style={styles.tableCell}>{tx.gateway}</Text>
                                </View>
                                <View style={styles.tableColSmall}>
                                    <Text style={styles.tableCell}>{tx.plan}</Text>
                                </View>
                                <View style={styles.tableCol}>
                                    <Text style={styles.tableCell}>{tx.currency} {parseFloat(tx.amount).toLocaleString()}</Text>
                                </View>
                            </View>
                        ))}
                    </View>
                </View>
            </Page>
        </Document>
    );
};
