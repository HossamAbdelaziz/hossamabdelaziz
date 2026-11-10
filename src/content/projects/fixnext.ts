import type { Project } from '../types';

// Team project, unlike the other three. The prose says "we" throughout and
// never implies this was built alone. Every figure traces to the team's own
// write-up and back-test.
const fixnext: Project = {
    slug: 'fixnext',
    name: 'FixNext',
    tagline:
        'Ranking which published vulnerabilities attackers are actually likely to exploit.',
    status: 'live',
    dates: 'November 2026',
    order: 4,

    cover: {
        src: '/images/datathon-team.jpg',
        alt: 'The team at work during the Sheridan Datathon',
        caption: 'The team at the Sheridan Datathon, November 2026.',
    },

    links: [
        { label: 'fixnext.select', href: 'https://fixnext.select' },
        { label: 'GitHub', href: 'https://github.com/DavidRosales21/FixNext' },
        { label: 'Demo video', href: 'https://youtu.be/ml9asW7tW0Q' },
    ],

    facts: [
        'Built by a team of four in 24 hours, at the Sheridan Datathon on IBM’s track',
        'Found 19 of 39 exploited vulnerabilities in its top 500; the best existing baseline found 17',
        'Ranking by severity score alone found 6',
        'We didn’t place',
    ],

    stack: [
        'Python',
        'pandas',
        'LightGBM',
        'scikit-learn',
        'IBM Granite',
        'Next.js',
        'TypeScript',
    ],

    problem: [
        'A security team cannot patch everything, so it has to guess what to patch first. The usual guess is the severity score — and the severity score is close to useless for this. Of the vulnerabilities rated CRITICAL, 98.7% are never attacked by anyone. Meanwhile 100 of the 813 that were attacked had not even been rated HIGH.',
        'IBM’s challenge was to do better: from a benchmark set of 72,670 vulnerabilities published in 2026, predict which ones attackers will actually use. Roughly one in three hundred is ever exploited, so this is a needle-in-a-haystack problem where the obvious signal points the wrong way.',
    ],

    architecture: [
        {
            title: 'Every row only knows what was known at the time',
            body: 'For each vulnerability we built a row from what existed at the end of the month it was published — the description, who issued it, the weakness type, the severity vector and the public exploit signals as they stood that month. A check in the code refuses to run if a forbidden column is touched.',
        },
        {
            title: 'Who issued it matters more than how bad it is',
            body: 'Fifteen security teams issue 39% of all vulnerabilities but 72% of the ones attackers use. We turned that into a feature: the five-year exposure rate for each issuer and each weakness type, computed strictly from data before the training period.',
        },
        {
            title: 'The description is evidence',
            body: 'IBM’s Granite embedding model read every description, and how close a description sat to those of already-exploited vulnerabilities became a feature in its own right. The text turned out to carry real signal — but not the signal you would expect.',
        },
    ],

    tradeoffs: [
        'We validated in time rather than at random: trained on 2024, tested on the first half of 2025, and never let the model see anything from after the moment it was predicting. A random split would have produced a far better-looking score and meant nothing.',
        'We threw away the most predictive columns in the data. Reference counts, affected-product lists and modification dates all predict exploitation beautifully — because NIST fills them in after the attack happens. Using them would have been cheating with extra steps.',
        'The benchmark excludes anything exploited in its first month, so we aimed the model at slow burners — appliances, open source, MITRE-assigned — and gave up the fast, famous ones. Apple’s are exploited in a median of two days. Apache’s take 113.',
    ],

    hardest: [
        'The hardest part of this problem is not building a model. It is noticing when the model is cheating.',
        'Everything in this dataset is contaminated by hindsight. A vulnerability that got attacked accumulates references, product listings and edits afterwards. Train on those and you get a model that appears excellent and predicts nothing, because it is reading the aftermath rather than the cause.',
        'So we fixed the rule first and built to it: every feature had to be knowable at the end of the publication month, enforced by a check in the code rather than by remembering. Then we went after the subtler version of the same problem. Descriptions sometimes get edited after an attack to add phrases like “exploited in the wild” — so we retrained with those phrases stripped out.',
        'The score barely moved: 15 found versus 14. Those words were not holding the model up, which meant the rest of the signal was real. That test is the reason I trust the number rather than just reporting it.',
    ],

    testing: [
        'We tested against the three baselines IBM supplied, on the same window and the same rule. Trained on 2024, tested on January to June 2025, counting how many of the 39 known-exploited vulnerabilities each method surfaced in its top 500.',
        'Severity score first found 6. The published exploit-probability score found 11. Known exploit code, then that score, found 17. FixNext found 19. In the top 100 it found 15 against the best baseline’s 10. It also missed 18 of the 39, including Ivanti, SonicWall and Chromium — which is the half of the result worth saying out loud.',
    ],

    diagrams: [
        {
            kind: 'flow',
            title: 'From a published vulnerability to a ranked list',
            caption:
                'Everything on the left is frozen at the month of publication. Nothing later is allowed in.',
            columns: [
                {
                    title: 'Known at publish time',
                    nodes: [
                        {
                            id: 'text',
                            label: 'Description',
                            role: 'What the vulnerability is',
                        },
                        {
                            id: 'meta',
                            label: 'Issuer & weakness',
                            role: 'Who filed it, what kind of bug',
                        },
                        {
                            id: 'signals',
                            label: 'Exploit signals',
                            role: 'Public code and scores that month',
                        },
                    ],
                },
                {
                    title: 'Features',
                    nodes: [
                        {
                            id: 'embed',
                            label: 'Granite embedding',
                            role: 'Description as a vector',
                        },
                        {
                            id: 'rates',
                            label: 'Historical rates',
                            role: 'Five-year exposure per issuer',
                        },
                    ],
                },
                {
                    title: 'Output',
                    nodes: [
                        { id: 'model', label: 'Model', role: 'LightGBM, trained on 2024' },
                        {
                            id: 'rank',
                            label: 'Ranked list',
                            role: 'What to patch first',
                        },
                    ],
                },
            ],
            edges: [
                { from: 'text', to: 'embed', label: 'Read by the embedding model' },
                {
                    from: 'meta',
                    to: 'rates',
                    label: 'Matched to how often this issuer’s past work was attacked',
                },
                { from: 'signals', to: 'model', label: 'Used as they stood that month' },
                { from: 'embed', to: 'model', label: 'Vector, plus distance to known-exploited' },
                { from: 'rates', to: 'model', label: 'Exposure rates, computed before 2024' },
                { from: 'model', to: 'rank', label: 'Scored and sorted' },
            ],
        },

        {
            kind: 'sequence',
            title: 'How we knew it wasn’t cheating',
            caption:
                'The test that mattered was not how well it scored, but whether the score survived having its crutches removed.',
            steps: [
                {
                    actor: 'Rule',
                    text: 'Every feature must be knowable at the end of the month the vulnerability was published.',
                },
                {
                    actor: 'Code',
                    text: 'A check refuses to run if a forbidden column is touched, so the rule holds even when we forget it.',
                },
                {
                    actor: 'Split',
                    text: 'Train on 2024, test on the first half of 2025. Never random.',
                },
                {
                    actor: 'Suspicion',
                    text: 'Descriptions are sometimes edited after an attack to say “exploited in the wild”. That phrase could be doing all the work.',
                },
                {
                    actor: 'Ablation',
                    text: 'Retrain with those phrases stripped out and compare: 15 found against 14. The words were not load-bearing.',
                },
            ],
        },
    ],
};

export default fixnext;
