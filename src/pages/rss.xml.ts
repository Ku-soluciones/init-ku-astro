import rss from '@astrojs/rss';

import { SITE, METADATA, APP_BLOG } from 'astrowind:config';
import { fetchPosts } from '~/utils/blog';
import { getPermalink } from '~/utils/permalinks';

export async function GET(context) {
  if (!APP_BLOG.isEnabled) {
    return new Response(null, {
      status: 404,
      statusText: 'Not found',
    });
  }

  const posts = await fetchPosts();

  return rss({
    title: 'KU Soluciones - Blog de Tecnología y Automatización para Pymes',
    description:
      'Contenido especializado en software a medida, automatización de procesos y soluciones digitales para pymes chilenas.',
    site: 'https://www.ku-soluciones.cl',
    items: posts.map((post) => ({
      title: post.title,
      description: post.excerpt || post.description,
      link: getPermalink(post.permalink, 'post'),
      pubDate: post.publishDate,
      category: post.category?.title,
      author: 'KU Soluciones',
      customData: `
        <language>es-CL</language>
        <keywords>${
          post.tags?.join(', ') ||
          'software pymes, automatización Chile, desarrollo web'
        }</keywords>
      `,
    })),
    customData: `
      <language>es-CL</language>
      <managingEditor>contacto@ku-soluciones.cl (KU Soluciones)</managingEditor>
      <webMaster>contacto@ku-soluciones.cl (KU Soluciones)</webMaster>
      <copyright>Copyright 2024 KU Soluciones</copyright>
      <category>Technology</category>
      <category>Software Development</category>
      <category>Process Automation</category>
      <image>
        <url>https://res.cloudinary.com/dddfx1xwt/image/upload/v1750340412/logoku_wg4bgn.webp</url>
        <title>KU Soluciones</title>
        <link>https://www.ku-soluciones.cl</link>
      </image>
    `,
    stylesheet: '/rss/styles.xsl',
  });
}
