import { Issue as IssueSchema } from 'curated-octograph'

export const newIssueSchema: IssueSchema = {
  githubId: 'new-issue',
  url: 'https://github.com/organization/repository/issues/1',
  number: 1,
  title: 'new issue',
  bodyText: 'description',
  state: 'CLOSED',
  createdAt: new Date('2017-07-26T20:05:32.000Z'),
  updatedAt: new Date('2017-11-03T10:31:08.000Z'),
  heart: 6,
  hooray: 5,
  thumbsUp: 4,
  laugh: 3,
  confused: 2,
  thumbsDown: 1,
  author: {
    githubId: 'User:42',
    url: 'https://github.com/user',
    login: 'user',
    avatarUrl: 'https://avatars0.githubusercontent.com/u/42?v=4',
  },
  repository: {
    githubId: 'repository',
    url: 'https://github.com/organization/repository',
    name: 'repository',
    primaryLanguage: 'TypeScript',
    forks: 1,
    stargazers: 2,
    owner: {
      githubId: 'Organization:43',
      url: 'https://github.com/organization',
      login: 'organization',
      avatarUrl: 'https://avatars2.githubusercontent.com/u/43?v=4',
    },
  },
}

export const updatedIssueSchemaV1: IssueSchema = {
  githubId: 'MDU6SXNzdWUyNDU4Mzg1MDY=',
  url: 'https://github.com/curated/octograph/issues/1',
  number: 1,
  title: 'foo',
  bodyText: 'bar',
  state: 'CLOSED',
  createdAt: new Date('2017-07-26T20:05:32.000Z'),
  updatedAt: new Date('2017-11-03T10:31:08.000Z'),
  heart: 62,
  hooray: 53,
  thumbsUp: 44,
  laugh: 35,
  confused: 26,
  thumbsDown: 17,
  author: {
    githubId: 'User:36428176',
    url: 'https://github.com/inspectocat',
    login: 'inspectocat',
    avatarUrl: 'https://avatars0.githubusercontent.com/u/36428176?v=4',
  },
  repository: {
    githubId: 'MDEwOlJlcG9zaXRvcnkxMDI3MDI1MA==',
    url: 'https://github.com/curated/octograph',
    name: 'octograph',
    primaryLanguage: 'TypeScript',
    forks: 123,
    stargazers: 456,
    owner: {
      githubId: 'Organization:36278390',
      url: 'https://github.com/curated',
      login: 'curated',
      avatarUrl: 'https://avatars2.githubusercontent.com/u/36278390?v=4',
    },
  },
}

export const updatedIssueSchemaV2: IssueSchema = {
  githubId: 'MDU6SXNzdWUyNDU4Mzg1MDY=',
  url: 'https://github.com/curated/octograph/issues/1',
  number: 1,
  title: 'new title',
  bodyText: 'bar',
  state: 'CLOSED',
  createdAt: new Date('2017-07-26T20:05:32.000Z'),
  updatedAt: new Date('2017-12-03T10:31:08.000Z'),
  heart: 62,
  hooray: 53,
  thumbsUp: 44,
  laugh: 35,
  confused: 26,
  thumbsDown: 17,
  author: {
    githubId: 'User:36428176',
    url: 'https://github.com/renamed-inspectocat',
    login: 'renamed-inspectocat',
    avatarUrl: 'https://avatars0.githubusercontent.com/u/36428176?v=4',
  },
  repository: {
    githubId: 'MDEwOlJlcG9zaXRvcnkxMDI3MDI1MA==',
    url: 'https://github.com/curated/renamed-octograph',
    name: 'renamed-octograph',
    primaryLanguage: 'TypeScript',
    forks: 123,
    stargazers: 456,
    owner: {
      githubId: 'Organization:36278390',
      url: 'https://github.com/renamed-curated',
      login: 'renamed-curated',
      avatarUrl: 'https://avatars2.githubusercontent.com/u/36278390?v=4',
    },
  },
}
