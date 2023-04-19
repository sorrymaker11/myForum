export default{
    home:()=>[
        {icon:'el-icon-edit',route:"/editor"},
    ],
    index:()=>[
        {icon:'el-icon-edit',route:"/editor"},
    ],
    column:()=>[
        {
            icon:'el-icon-plus',
            handler:'addColumn'
        },
    ],
    article:()=>[
        {icon:'el-icon-star-on',
        // activeIcon:"cl-icon-star-on",
        exce:true,
        handler:'handlerLikeArticle'},
        {
            icon:'el-icon-chat-dot-round',
            // 让当前文章的评论框聚焦
            handler:'handlerFocusTextarea'
        }
    ]
}