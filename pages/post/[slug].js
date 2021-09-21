import fs from 'fs'
import path from 'path'
import marked from 'marked'
import Link from 'next/link'
import matter from 'gray-matter'

const root = process.cwd()

export async function getStaticPaths() {
  const files = fs.readdirSync(path.join(root, 'articles'))

  const paths = files.map((filename) => ({
    params: {
      slug: filename.replace('.md', ''),
    },
  }))

  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params: { slug } }) {
  const markDown = fs.readFileSync(
    path.join('articles', slug + '.md'), 
    'utf-8'
  )

  const { data: frontMatter, content } = matter(markDown)

  return {
    props: {
      frontMatter,
      slug,
      content,
    },
  }
}

const PostTemplate = ({ frontMatter, slug, content }) => {
  return (
    <div>
      <h1>{frontMatter.title}</h1>
      <p>The slug is: {slug}</p>
      <div dangerouslySetInnerHTML={{ __html: marked(content) }} />
    </div>
  )
}

export default PostTemplate