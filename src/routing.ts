import Views from './components';

const {
    WelcomeBack,
    ImportWallet,
    ShowSeed,
    ConfirmSeed,
    CreateWallet,
    Dashboard,
    MultipleAccounts,
    Support,
    CreateDerivedAccount,
    Send,
    MultiSig,
} = Views;

const UnAuthRoutes = [
    {
        path: '/welcomeBack',
        Component: WelcomeBack,
    },
    {
        path: '/ImportWallet',
        Component: ImportWallet,
    },
    {
        path: '/ShowSeed',
        Component: ShowSeed,
    },
    {
        path: '/ConfirmSeed',
        Component: ConfirmSeed,
    },
    {
        path: '/CreateWallet',
        Component: CreateWallet,
    },
];

const AuthRoutes = [
    {
        path: '/',
        Component: Dashboard,
    },
    {
        path: '/send',
        Component: Send,
    },
    {
        path: '/welcomeBack',
        Component: WelcomeBack,
    },
    {
        path: '/accounts',
        Component: MultipleAccounts,
    },
    {
        path: '/ImportWallet',
        Component: ImportWallet,
    },
    {
        path: '/CreateWallet',
        Component: CreateWallet,
    },
    {
        path: '/Support',
        Component: Support,
    },
    {
        path: '/creatDerivedAccount',
        Component: CreateDerivedAccount,
    },
    {
        path: '/ShowSeed',
        Component: ShowSeed,
    },
    {
        path: '/ConfirmSeed',
        Component: ConfirmSeed,
    },
    {
        path: '/multiSig',
        Component: MultiSig,
    },
];

export default { AuthRoutes, UnAuthRoutes };
