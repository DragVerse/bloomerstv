export const CATEGORIES = [
  {
    name: 'Gaming',
    tags: ['gaming', 'orbcommunitiesgaming']
  },
  {
    name: 'Music',
    tags: ['music', 'orbcommunitiesVinylsAndMusic']
  },
  {
    name: 'Coding & Tech',
    tags: [
      'developer',
      'tech',
      'programming',
      'coding',
      'orbcommunitiesDevelopers'
    ]
  },
  {
    name: 'Just chilling',
    tags: ['justchalling']
  },
  {
    name: 'Podcast',
    tags: ['podcast']
  },
  {
    name: 'Arts',
    tags: ['arts', 'orbcommunitiesrefraction']
  },
  {
    name: 'Travel & Events',
    tags: ['travel', 'orbcommunitiestravel']
  },
  {
    name: 'Crypto & Blockchain',
    tags: [
      'crypto',
      'orbcommunitiesairdrop',
      'orbcommunitiesDeFi',
      'blockchain'
    ]
  },
  {
    name: 'Pets & Animals',
    tags: ['pets', 'orbcommunitiespets']
  },
  {
    name: 'Film & Animation',
    tags: ['film', 'orbcommunitiestvnfilms']
  },
  {
    name: 'Health & Fitness',
    tags: ['health', 'wellness', 'fitness', 'orbcommunitiesfitness']
  },
  {
    name: 'Lens Ecosystem',
    tags: ['lens', 'orbcommunitieslens']
  },
  {
    name: 'Comedy & Memes',
    tags: ['comedy', 'memes', 'orbcommunitiesmemes']
  },
  {
    name: 'Food & Cooking',
    tags: ['food', 'orbcommunitiesWhatsCooking']
  },
  {
    name: 'Sports',
    tags: ['sports']
  },
  {
    name: 'News & Politics',
    tags: ['news']
  },
  {
    name: 'Books & Literature',
    tags: ['literature', 'orbcommunities-t2/post']
  },
  {
    name: 'Education',
    tags: ['education']
  },
  {
    name: 'Howto & Style',
    tags: ['howto']
  }
]

export const CATEGORIES_LIST = CATEGORIES.map((category) => category.name)

export const getTagsForCategory = (category?: string) => {
  if (!category) return []
  const categoryObj = CATEGORIES.find((c) => c.name === category)
  return categoryObj?.tags ?? []
}