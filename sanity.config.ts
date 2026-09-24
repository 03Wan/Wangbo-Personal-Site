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
              .child(S.document().title('网站展示设置').schemaType('displaySettings').documentId('displaySettings')),
            S.listItem()
              .title('网站样式设置')
              .id('siteAppearance')
              .child(S.document().title('网站样式设置').schemaType('siteAppearance').documentId('siteAppearance')),
            S.listItem()
              .title('临时页面访问控制')
              .id('specialPages')
              .child(S.document().title('临时页面访问控制').schemaType('specialPages').documentId('specialPages')),
            ...S.documentTypeListItems().filter((item) => !['displaySettings', 'siteAppearance', 'specialPages'].includes(item.getId() || '')),
          ]),
    }),
  ],
  schema: { types: schemaTypes },
});
