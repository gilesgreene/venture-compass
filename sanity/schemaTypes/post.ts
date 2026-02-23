export const postType = {
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    {
      name: 'title',
      type: 'string',
    },
    {
      name: 'slug',
      type: 'slug',
      options: { source: 'title' },
    },
    {
      name: 'body',
      type: 'array',
      of: [
        { type: 'block' }, // This handles the text/headings
        {
          type: 'image',
          options: { hotspot: true }, // Allows you to crop inside the Studio
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative Text',
            }
          ]
        }
      ]
    },

    {
      name: 'authorName',
      title: 'Author Name',
      type: 'string',
    },
    {
      name: 'authorRole',
      title: 'Author Identifier (e.g., Lead Researcher)',
      type: 'string',
    }
  ],
}