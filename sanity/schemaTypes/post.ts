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
      name: 'date',
      title: 'Published Date',
      type: 'date',
      initialValue: () => new Date().toISOString().split('T')[0], // Defaults to today
    },
    {
      name: 'category',
      title: 'Category (e.g., Thesis, Macro, Defense)',
      type: 'string',
    },
    {
      name: 'excerpt',
      title: 'Short Excerpt',
      type: 'text',
      description: 'The brief summary that appears on the main journal page.',
      validation: (Rule: any) => Rule.max(200).warning('Keep it concise.'),
    },
    {
      name: 'mainImage',
      title: 'Main Preview Image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
        }
      ]
    },
    {
      name: 'body',
      type: 'array',
      of: [
        { type: 'block' },
        {
          type: 'image',
          options: { hotspot: true },
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