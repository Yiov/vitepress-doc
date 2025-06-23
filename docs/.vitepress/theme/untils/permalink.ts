// 导入必要的库
import matter from 'gray-matter'; // 用于解析和操作Markdown文件的frontmatter
import fg from 'fast-glob';      // 快速文件系统匹配库
import fs from 'fs/promises';    // Node.js文件系统Promise API
import path from 'path';         // 路径处理库

/**
 * 生成指定长度的随机字符串
 * @param {number} length - 需要生成的字符串长度
 * @returns {string} 由0-9和a-f组成的随机字符串
 */
export const generateString = (length: number) => {
  const charset = '0123456789abcdef'; // 可用的字符集
  let randomCode = ''; // 初始化结果字符串

  // 循环生成指定长度的随机字符串
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length); // 随机选取字符索引
    randomCode += charset[randomIndex]; // 将随机字符添加到结果中
  }

  return randomCode;
};

/**
 * 从Markdown内容中提取一级标题
 * @param {string} content - Markdown内容
 * @returns {string} 提取的标题，如果没有找到则返回空字符串
 */
const extractTitleFromContent = (content: string): string => {
  // 匹配一级标题的正则表达式 (支持#前后可能有空格的情况)
  const h1Regex = /^\s*#\s+(.+?)\s*$/m;
  const match = content.match(h1Regex);
  return match ? match[1].trim() : '';
};

/**
 * 处理文章Markdown文件，生成永久链接和重写规则
 * @param {Object} options - 配置选项
 * @param {string} options.srcDir - 源目录，默认为'permalink'
 * @param {string} options.baseDir - 基础目录，默认为'docs'
 * @returns {Promise<Object>} 包含重写规则的对象
 */
export const usePosts = async ({
  srcDir = 'permalink',  // 默认源目录为'permalink'
  baseDir = 'docs'   // 默认基础目录为'docs'
} = {}) => {
  const rewrites = {}; // 初始化重写规则对象

  try {
    // 使用fast-glob查找所有匹配的Markdown文件，但忽略index.md文件
    const paths = (await fg(`${baseDir}/${srcDir}/**/*.md`, {
      ignore: ['**/index.md']  // 忽略所有index.md文件
    })).sort(); // 按字母顺序排序

    // 创建一个映射，存储所有文件的permalink和title
    const postsMap: Record<string, { permalink: string; title: string }> = {};

    // 第一遍：收集所有文件的基本信息
    await Promise.all(
      paths.map(async (postPath) => {
        const { data, content } = matter.read(postPath);
        
        // 提取或设置title
        if (!data.title) {
          const extractedTitle = extractTitleFromContent(content);
          if (extractedTitle) {
            data.title = extractedTitle;
          }
        }

        // 生成或使用现有的permalink
        if (!data.permalink) {
          data.permalink = `/${srcDir}/${generateString(6)}`;
        }

        // 存储到映射中
        postsMap[postPath] = {
          permalink: data.permalink,
          title: data.title || path.basename(postPath, '.md')
        };
      })
    );

    // 第二遍：设置prev/next导航
    await Promise.all(
      paths.map(async (postPath, index) => {
        const { data, content } = matter.read(postPath);
        const prevPost = index > 0 ? postsMap[paths[index - 1]] : null;
        const nextPost = index < paths.length - 1 ? postsMap[paths[index + 1]] : null;

        // 设置prev导航
        if (prevPost && !data.prev) {
          data.prev = {
            text: prevPost.title,
            link: prevPost.permalink
          };
        }

        // 设置next导航
        if (nextPost && !data.next) {
          data.next = {
            text: nextPost.title,
            link: nextPost.permalink
          };
        }

        // 将更新后的frontmatter写回文件
        await fs.writeFile(
          postPath,
          matter.stringify(content, data),
          'utf8'
        );

        // 计算相对路径并添加到重写规则
        const relativePath = postPath.replace(`${baseDir}/`, '');
        rewrites[relativePath.replace(/[+()]/g, '\\$&')] =
          `${data.permalink}.md`.slice(1).replace(/[+()]/g, '\\$&');
      })
    );

    return { rewrites }; // 返回生成的重写规则
  } catch (e) {
    console.error(e); // 捕获并打印错误
    return { rewrites }; // 即使出错也返回可能部分完成的重写规则
  }
};