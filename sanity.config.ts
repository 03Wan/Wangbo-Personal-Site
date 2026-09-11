'use client';

import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schemaTypes } from './src/sanity/schemaTypes';

export default defineConfig({
  name: 'wangbo-personal-site',
  title: 'Wang Bo Personal Site',
  basePath: '/studio',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .id('root')
          .title('内容管理')
          .items([
            S.listItem()
              .title('网站展示设置')
              .id('displaySettings')
              .child(S.document().schemaType('displaySettings').documentId('displaySettings')),
            ...S.documentTypeListItems().filter((item) => item.getId() !== 'displaySettings'),
          ]),
    }),
  ],
  schema: { types: schemaTypes },
});
