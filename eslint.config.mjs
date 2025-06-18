import { dirname } from 'path';
import { fileURLToPath } from 'url';

import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
    baseDirectory: __dirname,
});

const eslintConfig = [
    ...compat.extends('next/core-web-vitals', 'next/typescript'),
    {
        rules: {
            semi: 1,
            'object-curly-spacing': ['error', 'always'],
            quotes: [2, 'single', { avoidEscape: true }],
            'import/order': [
                'error',
                {
                    pathGroups: [
                        {
                            pattern: '@/**',
                            group: 'internal',
                        },
                        {
                            pattern: './**.module.*',
                            group: 'internal',
                            position: 'after',
                        },
                    ],
                    'newlines-between': 'always',
                    alphabetize: {
                        order: 'asc',
                        caseInsensitive: false,
                    },
                },
            ],
        },
    }
];

export default eslintConfig;
