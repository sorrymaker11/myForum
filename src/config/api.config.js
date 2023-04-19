export default {
    'register': {
        url: 'admin/register',
        method: 'POST',
        rsaKey: 'password',
        setToken: true
    },
    'login': {
        url: 'admin/login',
        method: 'POST',
        rsaKey: 'password',
        setToken: true
    },
    'getUserInfo': {
        url: '/user',
        method: 'GET',
    },
    'putUserInfo': {
        url: '/user',
        method: 'PUT',
    },
    'index': {
        url: '/index',
        method: 'GET',
        noMessage: true
    },
    'pubKey': {
        url: '/keys',
        method: 'GET'
    },
    'postArticle': {
        url: '/api/rest/articles',
        method: 'POST'
    },
    'getArticleById': {
        rest: true,
        url: '/api/rest/articles/:id',
        method: 'GET'
    },
    "articles": {
        url: '/api/rest/articles/',
        method: 'GET'
    },
    "articlesSearch": {
        url: '/articles/seach',
        method: 'GET'
    },
    "columns": {
        url: '/api/rest/columns',
        method: 'GET'
    },
    "postColumn": {
        url: '/api/rest/columns',
        method: 'POST'
    },
    "postComment": {
        url: '/api/rest/comments',
        method: 'POST'
    },
    'uploadArticle': {
        url: '/upload/article',
        method: 'POST'
    },
    'uploadAvatar': {
        url: '/upload/user',
        method: 'POST'
    },
    'articleLikes': {
        url: '/likes/:id',
        method: 'POST',
        rest:true
    }
}