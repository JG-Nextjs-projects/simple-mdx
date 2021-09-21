import fs from 'fs'
import path from 'path'
import Link from 'next/link'
import matter from 'gray-matter'

const root = process.cwd()

export async function getStaticProps() {
  const files = fs.readdirSync(path.join(root, 'articles'))

  const posts = files.map(file => {
    const slug = file.replace('.md', '')
    const markDownMeta = fs.readFileSync(path.join('articles', file), 'utf-8')

    const { data: frontMatter } = matter(markDownMeta)

    return {
      slug,
      frontMatter
    }
  })

  return {
    props: {
      posts
    }
  }
}

const Blog = ({ posts }) => {
  return (
    <div>
      <h1>Hello from the blog</h1>
      <ul>
        {posts.map((post, i) => (
          <li key={i}>
            <Link href={'/post/' + post.slug}>
              <a>{post.frontMatter.title}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Blog