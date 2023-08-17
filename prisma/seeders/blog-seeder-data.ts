import { BlogSeed } from './models/blog-seed';

const blogSeedList: BlogSeed[] = [];

for (let i = 0; i < 200; i++) {
  blogSeedList.push({
    title: 'test post ' + i,
    content: 'test post contenttttt ' + i,
  });
}
export default blogSeedList;
