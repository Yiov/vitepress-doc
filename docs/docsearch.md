# DocSearch

## 简述

其实也有很多热门的爬虫搜索引擎，而Algolia的 [Algolia DocSearch](https://docsearch.algolia.com/) 是直接集成在VitePress中的，我们来看看有多么强大吧


## 配置

我们先看一下 VitePress 官方给的配置

```ts{4-12}
export default defineConfig({

  themeConfig: {
    //Algolia搜索
    search: {
      provider: 'algolia',
      options: {
        appId: '<Application ID>',
        apiKey: '<Search-Only API Key>',
        indexName: '<INDEX_NAME>',
      },
    },
  },

})
```

单语言修改成中文，需要配置更多语言，请参考[多语言](./multi-language.md)

```ts{11-53}
export default defineConfig({

  themeConfig: {
    //Algolia搜索纯中文版
    search: {
      provider: 'algolia',
      options: {
        appId: '<Application ID>',
        apiKey: '<Search-Only API Key>',
        indexName: '<INDEX_NAME>',
        locales: {
          root: {
            placeholder: '搜索文档',
            translations: {
              button: {
                buttonText: '搜索文档',
                buttonAriaLabel: '搜索文档'
              },
              modal: {
                searchBox: {
                  resetButtonTitle: '清除查询条件',
                  resetButtonAriaLabel: '清除查询条件',
                  cancelButtonText: '取消',
                  cancelButtonAriaLabel: '取消'
                },
                startScreen: {
                  recentSearchesTitle: '搜索历史',
                  noRecentSearchesText: '没有搜索历史',
                  saveRecentSearchButtonTitle: '保存至搜索历史',
                  removeRecentSearchButtonTitle: '从搜索历史中移除',
                  favoriteSearchesTitle: '收藏',
                  removeFavoriteSearchButtonTitle: '从收藏中移除'
                },
                errorScreen: {
                  titleText: '无法获取结果',
                  helpText: '你可能需要检查你的网络连接'
                },
                footer: {
                  selectText: '选择',
                  navigateText: '切换',
                  closeText: '关闭',
                  searchByText: '搜索提供者'
                },
                noResultsScreen: {
                  noResultsText: '无法找到相关结果',
                  suggestedQueryText: '你可以尝试查询',
                  reportMissingResultsText: '你认为该查询应该有结果？',
                  reportMissingResultsLinkText: '点击反馈'
                },
              },
            },
          },
        },
      },
    },
  },

})
```

![](/docsearch/docsearch-01.png)


## 注册

由于配置还缺关键Key，所以还需要注册账号，也方便我们后期对数据进行管理

进入 [Algolia官网](https://www.algolia.com/) ，点击 `Login` 注册账号

![](/docsearch/docsearch-02.png)

可以选择 `NO ACCOUNT YET?` ，也可以直接用GitHub和谷歌账号关联注册

![](/docsearch/docsearch-03.png)

注册比较简单，就不讲了

::: tip 说明
网站打不开，挂一个梯子即可
:::

![](/docsearch/docsearch-04.png)



## 使用

请按自己的需求，参照下面教程，选其一使用

| 使用方式 | 区别说明 |
|:-:|:-:|
| [官方申请](#官方申请) | 申请时需要提交链接、邮箱及仓库(可选) ，等待周期较长，通过后会自动爬取，直接配置使用即可 |
| Docker <br><Badge type="info" text="不推荐" />| 需自备服务器且安装好docker，有一定动手能力，需要每次手动爬取。步骤繁琐本次不做演示 |
| [Github Actions](#github-actions) <br><Badge type="warning" text="推荐" /> | 准备一个公开或者私密的仓库，配置好爬虫数据的格式，Actions自动爬取 |


---


### 官方申请



直接在 [DocSearch官网](https://docsearch.algolia.com/)，点 Apply 申请


![](/docsearch/docsearch-05.png)


填入你的网址/邮箱/仓库链接即可

::: tip 说明
以前使用DocSearch必须开源，现在是可选了？这么良心？
:::

![](/docsearch/docsearch-06.png)

等待跳转成功就好，没有跳转，就挂个梯子

![](/docsearch/docsearch-07.png)


最快等待6-7小时，慢则半个多月，在邮件中会给我们一个邀请链接，复制并打开

::: tip 说明
已经注册过的，也必须从邮件这个邀请链接进去
:::

![](/docsearch/docsearch-08.png)

进去后会有个弹窗按钮，点 `Accept` 接受即可

::: tip 说明
没有弹窗的，去邮箱复制邀请链接打开就有了
:::

![](/docsearch/docsearch-09.png)

这样就自动完成了Application创建，但还没有数据

![](/docsearch/docsearch-10.png)


在 `Search - index` 这里点刷新看看，有数据即可

![](/docsearch/docsearch-11.png)


如果索引 records 值仍为0，说明爬取数据有问题

需要登录 [Algolia官方爬虫后台](https://crawler.algolia.com/) 进行调试，点击官方帮我们申请的Application

![](/docsearch/docsearch-12.png)


点 `Overview` 进来后发现爬虫数据有的，但是Records没有值，说明数据逻辑有问题

![](/docsearch/docsearch-13.png)


点 `Editor` 进来，可以参考官方的配置对照查看问题

::: warning 注意

除了指定位置，其他不要乱改，特别是apikey不要改！和你申请的apikey不是同一个用途

如果你网址有别名解析或者重定向了，也只能用你申请时的网址
:::

```ts [官方爬虫设置] {5,10,14-15}
new Crawler({
  appId: '...',
  apiKey: '...',
  rateLimit: 8,
  startUrls: ['https://vitepress.dev/'],
  renderJavaScript: false,
  sitemaps: [],
  exclusionPatterns: [],
  ignoreCanonicalTo: false,
  discoveryPatterns: ['https://vitepress.dev/**'],
  schedule: 'at 05:10 on Saturday',
  actions: [
    {
      indexName: 'vitepress',
      pathsToMatch: ['https://vitepress.dev/**'],
      recordExtractor: ({ $, helpers }) => {
        return helpers.docsearch({
          recordProps: {
            lvl1: '.content h1',
            content: '.content p, .content li',
            lvl0: {
              selectors: '',
              defaultValue: 'Documentation'
            },
            lvl2: '.content h2',
            lvl3: '.content h3',
            lvl4: '.content h4',
            lvl5: '.content h5'
          },
          indexHeadings: true
        })
      }
    }
  ],
  initialIndexSettings: {
    vitepress: {
      attributesForFaceting: ['type', 'lang'],
      attributesToRetrieve: ['hierarchy', 'content', 'anchor', 'url'],
      attributesToHighlight: ['hierarchy', 'hierarchy_camel', 'content'],
      attributesToSnippet: ['content:10'],
      camelCaseAttributes: ['hierarchy', 'hierarchy_radio', 'content'],
      searchableAttributes: [
        'unordered(hierarchy_radio_camel.lvl0)',
        'unordered(hierarchy_radio.lvl0)',
        'unordered(hierarchy_radio_camel.lvl1)',
        'unordered(hierarchy_radio.lvl1)',
        'unordered(hierarchy_radio_camel.lvl2)',
        'unordered(hierarchy_radio.lvl2)',
        'unordered(hierarchy_radio_camel.lvl3)',
        'unordered(hierarchy_radio.lvl3)',
        'unordered(hierarchy_radio_camel.lvl4)',
        'unordered(hierarchy_radio.lvl4)',
        'unordered(hierarchy_radio_camel.lvl5)',
        'unordered(hierarchy_radio.lvl5)',
        'unordered(hierarchy_radio_camel.lvl6)',
        'unordered(hierarchy_radio.lvl6)',
        'unordered(hierarchy_camel.lvl0)',
        'unordered(hierarchy.lvl0)',
        'unordered(hierarchy_camel.lvl1)',
        'unordered(hierarchy.lvl1)',
        'unordered(hierarchy_camel.lvl2)',
        'unordered(hierarchy.lvl2)',
        'unordered(hierarchy_camel.lvl3)',
        'unordered(hierarchy.lvl3)',
        'unordered(hierarchy_camel.lvl4)',
        'unordered(hierarchy.lvl4)',
        'unordered(hierarchy_camel.lvl5)',
        'unordered(hierarchy.lvl5)',
        'unordered(hierarchy_camel.lvl6)',
        'unordered(hierarchy.lvl6)',
        'content'
      ],
      distinct: true,
      attributeForDistinct: 'url',
      customRanking: [
        'desc(weight.pageRank)',
        'desc(weight.level)',
        'asc(weight.position)'
      ],
      ranking: [
        'words',
        'filters',
        'typo',
        'attribute',
        'proximity',
        'exact',
        'custom'
      ],
      highlightPreTag: '<span class="algolia-docsearch-suggestion--highlight">',
      highlightPostTag: '</span>',
      minWordSizefor1Typo: 3,
      minWordSizefor2Typos: 7,
      allowTyposOnNumericTokens: false,
      minProximity: 1,
      ignorePlurals: true,
      advancedSyntax: true,
      attributeCriteriaComputedByMinProximity: true,
      removeWordsIfNoResults: 'allOptional'
    }
  }
})
```


而我这里的问题是，这里多了一个 `/doc`

![](/docsearch/docsearch-14.png)


改过之后点 `Runtest` 测试一下，有数据即可

![](/docsearch/docsearch-15.png)


可以在 Search Preview 里可以搜素看看，能用就可以了

![](/docsearch/docsearch-16.png)


没问题了点 `Save` 保存，再重新在Overview重新爬取，Records有值就代表OK了


![](/docsearch/docsearch-17.png)


点击index回到algolia，看数据是否同步过来

![](/docsearch/docsearch-18.png)


最后只剩关键key了，回到 [Algolia面板](https://dashboard.algolia.com/) ，选择对应的Application，查看API Keys

![](/docsearch/docsearch-19.png)


这里 `Application ID` 和 `Search API Key` 是必须的两个参数


![](/docsearch/docsearch-20.png)


将三个参数以此填入 [config.ts 配置中](#配置) ，本地搜索就可以使用了

![](/docsearch/docsearch-48.png)


---


### Github Actions

[注册](#注册) 好账号后，我们在 [面板界面](https://dashboard.algolia.com/) 新建一个 `Create Application`

::: tip 说明
官方给我们默认建了一个，也是可以直接用，演示是便于以后独立使用
:::


![](/docsearch/docsearch-21.png)

地区随便吧，差不太多，蓝色的就是可用的

::: tip 说明
灰色是官方申请的时候给配的，一般是HongKong，速度差不了多少
:::

![](/docsearch/docsearch-22.png)

这里快速上手直接跳过

![](/docsearch/docsearch-23.png)

创建完成后，我们再设置 Setting 里查看

![](/docsearch/docsearch-24.png)

点击 `Applications`

![](/docsearch/docsearch-25.png)

点击 `Rename` 重命名一下，方便之后使用

![](/docsearch/docsearch-26.png)

我就改成 vitepress ，保存

![](/docsearch/docsearch-27.png)

点击改好的，回到面板界面

![](/docsearch/docsearch-28.png)


![](/docsearch/docsearch-29.png)


点击右下角 `Date Sources - Indices - Create Index` 创建索引

![](/docsearch/docsearch-30.png)

名字随意，一会要用！

![](/docsearch/docsearch-31.png)

点击右上角设置 `Settings - API Keys` ，查看关键Keys

![](/docsearch/docsearch-32.png)

![](/docsearch/docsearch-33.png)

其中 `Application ID` `Search-Only API Key` `Admin API Key` 尤为重要

::: tip 4个关键数据说明

Application ID：应用ID

Search-Only API Key：搜索API

Admin API Key：管理API

indexName：索引名
:::

![](/docsearch/docsearch-34.png)


我们在任意仓库（公开或私密） - 设置 - Secrets and variables - actions

![](/docsearch/docsearch-35.png)

密钥中，新增仓库密钥 `New repository secret`

![](/docsearch/docsearch-36.png)

分别添加 `APPLICATION_ID` 和 `API_KEY`

::: warning 千万不要填错了

APPLICATION_ID：是应用ID（APPLICATION ID）

API_KEY：是管理API（Admin API Key）
:::

![](/docsearch/docsearch-37.png)


![](/docsearch/docsearch-38.png)


这样2个密钥都添加好了

![](/docsearch/docsearch-39.png)


然后在仓库根目录新建一个文件

![](/docsearch/docsearch-40.png)

命名为 `docsearch.json` ，格式如下，按需修改其他不要动


```json [docsearch.json] {2,5}
{
    "index_name": "你的索引名",
    "start_urls": [
        {
            "url": "https://你的网站",
            "selectors_key": ""
        }
    ],
    "stop_urls": [],
    "selectors": {
        "default": {
            "lvl0": {
                "selector": "",
                "default_value": "我的文档"
            },
            "lvl1": ".content h1",
            "lvl2": ".content h2",
            "lvl3": ".content h3",
            "lvl4": ".content h4",
            "lvl5": ".content h5",
            "lvl6": ".content h6",
            "text": ".content p, .content li",
            "lang": {
                "selector": "/html/@lang",
                "type": "xpath",
                "global": true
            }
        }
    },
    "custom_settings": {
        "attributesForFaceting": [
            "lang"
        ]
    }
}
```

修改好index_name和网址后，提交即可

![](/docsearch/docsearch-41.png)

这样就可以了

![](/docsearch/docsearch-42.png)


然后在仓库，点击 `Actions` - `set up a workflow yourself `新建一个工作流

![](/docsearch/docsearch-43.png)

命名为 `docsearch.yml` ，复制粘贴下面的工作流代码，提交

![](/docsearch/docsearch-44.png)

```yml {3-6}
name: docsearch

on:
  push:
    branches:
      - main

jobs:
  algolia:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2

      - name: Get the content of docsearch.json as config
        id: algolia_config
        run: echo "::set-output name=config::$(cat docsearch.json | jq -r tostring)"

      - name: Run algolia/docsearch-scraper image
        env:
          APPLICATION_ID: ${{ secrets.APPLICATION_ID }}
          API_KEY: ${{ secrets.API_KEY }}
          CONFIG: ${{ steps.algolia_config.outputs.config }}
        run: |
          docker run \
            --env APPLICATION_ID=${APPLICATION_ID} \
            --env API_KEY=${API_KEY} \
            --env "CONFIG=${CONFIG}" \
            algolia/docsearch-scraper

```

:::: details 触发方式不喜欢可以自己改

::: code-group

```yml [提交后触发]
on:
  push:
    branches:
      - main
```

```yml [发布后触发]
on: deployment
```

```yml [定时触发参考cron规则]
on:
  schedule:
    - cron: '0 0 * * *'
```

```yml [手动触发]
on:
  workflow_dispatch:
```

:::

::::



仓库会多一个 `.github/workflows` 的目录

![](/docsearch/docsearch-45.png)

我们静等工作流跑完，如果失败，就是你密钥没有正确配置

![](/docsearch/docsearch-46.png)

看一下Algolia已经有数据了

![](/docsearch/docsearch-47.png)

我们配置在 config.mts 中，就可以使用搜索了

```ts {8-11}
export default defineConfig({

  themeConfig: {
    //Algolia搜索
    search: {
      provider: 'algolia',
      options: {
        //本人的配置，供你们参考使用
        appId: 'QVKQI62L15',
        apiKey: 'bef8783dde57293ce082c531aa7c7e0c',
        indexName: 'doc',
      },
    },
  },

})
```


![](/docsearch/docsearch-48.png)


## 搜索美化


需要对json文件进行修改，以下是仅单独增加一个 [Markdown](./markdown.md) 页面分类的简单案例

::: details 案例说明代码说明

- start_urls：爬取链接，必须要一个默认主页和其他页，多页面就得多填

- tags：标签，也是我们分类的最最重要的代码

- stop_urls：不爬取的页面

- selectors：默认一个 `default` 必须要有，然后再依次新增标签页

- default_value：标签显示的文字，可以是中文

- attributesForFaceting：必须具备 `lang` `tags` 否则有数据也用不了

注：请根据自己的页面进行新增修改！！！
:::


```json
{
    "index_name": "doc",
    "start_urls": [
        {
            "url": "https://vitepress.yiov.top/preface.html", // [!code ++:3]
            "selectors_key": "preface",
            "tags": ["preface"]
        },
        "https://vitepress.yiov.top/" // [!code ++]
    ],
    "stop_urls": [],
    "selectors": {
      "preface": { // [!code ++:18]
            "lvl0": {
                "selector": "",
                "default_value": "前言"
            },
            "lvl1": ".content h1",
            "lvl2": ".content h2",
            "lvl3": ".content h3",
            "lvl4": ".content h4",
            "lvl5": ".content h5",
            "lvl6": ".content h6",
            "text": ".content p, .content li",
            "lang": {
                "selector": "/html/@lang",
                "type": "xpath",
                "global": true
            }
        },
        "default": {
            "lvl0": {
                "selector": "",
                "default_value": "我的文档"
            },
            "lvl1": ".content h1",
            "lvl2": ".content h2",
            "lvl3": ".content h3",
            "lvl4": ".content h4",
            "lvl5": ".content h5",
            "lvl6": ".content h6",
            "text": ".content p, .content li",
            "lang": {
                "selector": "/html/@lang",
                "type": "xpath",
                "global": true
            }
        }
    },
    "custom_settings": {
        "attributesForFaceting": [
            "lang","tags" // [!code ++]
        ]
    }
}
```


最后将所有页面添加完后，[对比文件](https://github.com/Yiov/vitepress-doc/blob/main/docsearch.json)，看效果

::: tip 说明
如果你的页面很多，额，那是真的有点麻烦，可以不美化
:::



![](/docsearch/docsearch-49.png)
