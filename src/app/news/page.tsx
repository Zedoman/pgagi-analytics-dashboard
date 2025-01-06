import React from 'react';
import { NewsSearch } from '@/components/news/news-search';
import { NewsSection } from '@/components/news/news-section';

const NewsPage: React.FC = () => {
    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <div className='dark:text-white text-grey-300' style={{ textAlign: 'center', fontSize: '48px', fontWeight: 'bold', marginBottom: '20px', textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}>News Page</div>
            <div style={{ marginBottom: '20px' }}>
            <NewsSearch />
            </div>
            <NewsSection/>
        </div>
    );
};

export default NewsPage;