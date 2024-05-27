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
import Index from './views/Index';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                path: '/',
                element: <Index />
            },
            {
                path: '/kanji',
                element: <Kanji />
            },
            {
                path: '/kana',
                element: <Kana />
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
    }
])

export default router;