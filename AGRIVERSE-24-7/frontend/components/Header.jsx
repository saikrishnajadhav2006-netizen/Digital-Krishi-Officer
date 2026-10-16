import React, { useState, useEffect } from 'react';
import { Leaf, AlertTriangle, Languages, MessageSquare, Home, Store } from 'lucide-react';
import { translations } from '../utils/translations';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

const Header = ({ onLanguageChange }) => {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const isChat = searchParams.get('mode') === 'chat';
    const isHome = pathname === '/' && !isChat;
    const [userLang, setUserLang] = useState('English');
    const [t, setT] = useState(translations.english);
    const [langInput, setLangInput] = useState('');
    const LANGUAGES = ['English', 'Hindi', 'Telugu', 'Tamil', 'Marathi', 'Spanish'];

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('appLanguage') || 'English';
            setUserLang(saved); setLangInput(saved);
            const langKey = saved.toLowerCase();
            if (translations[langKey]) setT(translations[langKey]);
        }
    }, []);

    const handleLanguageChange = (val) => {
        setLangInput(val);
        const match = LANGUAGES.find(l => l.toLowerCase() === val.toLowerCase());
        if (!match) return;
        localStorage.setItem('appLanguage', match); setUserLang(match);
        const langKey = match.toLowerCase();
        if (translations[langKey]) setT(translations[langKey]);
        if (onLanguageChange) onLanguageChange(match);
        else window.location.reload();
    };

    const handleCautionClick = () => {
        if (t) alert(`${t.language_assistant}:\n\n${t.caution_msg}`);
    };

    const navClass = (active) => `flex items-center gap-2 rounded-xl px-3 py-2 text-[10px] font-bold uppercase tracking-wider transition-all ${active ? 'bg-white text-agri-darkGreen shadow-md' : 'text-stone-500 hover:text-agri-darkGreen'}`;

    return (
        <header className="sticky top-0 z-40 flex items-center justify-between gap-3 border-b border-agri-green/20 bg-white/90 p-3 backdrop-blur-md sm:p-4">
            <Link href="/" className="group flex shrink-0 items-center gap-2 sm:gap-3">
                <div className="rounded-xl bg-gradient-to-br from-agri-darkGreen to-agri-green p-2 shadow-lg transition-transform group-hover:scale-105"><Leaf className="h-5 w-5 text-white sm:h-6 sm:w-6" /></div>
                <div><h1 className="bg-gradient-to-r from-agri-darkGreen to-agri-green bg-clip-text text-lg font-bold text-transparent sm:text-xl">AGRIVERSE</h1><p className="text-[9px] font-bold uppercase tracking-[.16em] text-stone-500">Digital Krishi Officer</p></div>
            </Link>
            <nav aria-label="Main navigation" className="flex items-center gap-1 rounded-2xl border border-agri-green/10 bg-agri-green/5 p-1">
                <Link href="/" className={navClass(isHome)}><Home size={14}/><span className="hidden sm:inline">Home</span></Link>
                <Link href="/?mode=chat" className={navClass(isChat)}><MessageSquare size={14}/><span className="hidden sm:inline">Chat</span></Link>
                <Link href="/market" className={navClass(pathname === '/market')}><Store size={14}/><span>Mandi</span></Link>
            </nav>
            <div className="flex items-center gap-2">
                <div className="hidden items-center rounded-xl border border-stone-200 bg-white px-2 py-1.5 sm:flex"><Languages size={14} className="mr-2 text-agri-green"/><input aria-label="Language" className="w-20 bg-transparent text-[10px] font-bold uppercase outline-none md:w-24" placeholder="Language" value={langInput} onChange={e => handleLanguageChange(e.target.value)}/></div>
                <button aria-label="Language assistant information" onClick={handleCautionClick} className="rounded-xl border border-stone-200 bg-white p-2 text-amber-500 transition hover:border-amber-500 hover:bg-amber-50"><AlertTriangle size={19}/></button>
            </div>
        </header>
    );
};
export default Header;
