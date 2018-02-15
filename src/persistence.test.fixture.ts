import { Issue as IssueSchema } from 'curated-octograph'

export const issueSchema: IssueSchema = {
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
    githubId: 'TODO',
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
      githubId: 'MDEyOk9yZ2FuaXphdGlvbjY5NjMx',
      url: 'https://github.com/curated',
      login: 'curated',
      avatarUrl: 'https://avatars2.githubusercontent.com/u/36278390?v=4',
    },
  },
}
