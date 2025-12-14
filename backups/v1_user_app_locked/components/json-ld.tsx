export default function JsonLd() {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'Traders Diary',
        applicationCategory: 'FinanceApplication',
        operatingSystem: 'Any',
        offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'INR',
        },
        author: {
            '@type': 'Organization',
            name: 'Pratham Wealth Academy',
            url: 'https://prathamwealth.com',
        },
        publisher: {
            '@type': 'Organization',
            name: 'ARP Infotech',
        },
        description: 'Professional Trading Journal for Indian Stock Market Traders. Track trades, analyze patterns, and master psychology.',
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
    );
}
