import {createBrowserRouter} from 'react-router-dom';
import Layout from './layouts/Layout';
import AuthLayout from './layouts/AuthLayout';
import LoginRegister from './views/LoginRegister';
import Kanji from './views/Kanji';
import KanjiTopic from './views/KanjiTopic';
import Kana from './views/Kana';
import Vocabulary from './views/Vocabulary';
import VocabularyTopic from './views/VocabularyTopic';
import Grammar from './views/Grammar';
import GrammarTopic from './views/GrammarTopic';
import Notebook from './views/Notebook';
import AdminLayout from './layouts/AdminLayout';
import AdminKanji from './views/AdminKanji';
import AdminVocabulary from './views/AdminVocabulary';
import AdminGrammar from './views/AdminGrammar' 

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                path: '/',
                element: <Kana />
            },
            {
                path: '/kanji',
                element: <Kanji />
            },
            {
                path: '/kanjiTopic',
                element: <KanjiTopic />,
            },
            {
                path: '/vocabulary',
                element: <Vocabulary />
            },
            {
                path: '/vocabularyTopic',
                element: <VocabularyTopic />
            },
            {
                path: '/grammar',
                element: <Grammar />
            },
            {
                path: '/grammarTopic',
                element: <GrammarTopic />
            },
            {
                path: '/notebook',
                element: <Notebook />
            }
        ]
    },
    {
        path: '/auth',
        element: <AuthLayout />,
        children: [
            {
                path: '/auth/loginRegister',
                element: <LoginRegister />
            }
        ]
    },
    {
        path: '/admin',
        element: <AdminLayout />,
        children: [
            {
                path: '/admin/adminKanji',
                element: <AdminKanji />
            },
            {
                path: '/admin/adminVocabulary',
                element: <AdminVocabulary />
            },
            {
                path: '/admin/adminGrammar',
                element: <AdminGrammar />
            }
        ]
    }
])

export default router;