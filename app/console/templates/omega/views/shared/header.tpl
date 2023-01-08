<!DOCTYPE html>
<html>
    <head>
        <link rel="stylesheet" href="/omega/public/css/base.css"/> 
        <link rel="stylesheet" href="/omega/public/css/purple.css"/> 
        <link rel="stylesheet" href="/omega/public/css/style.css"/> 
        <script type="text/javascript" src="/omega/public/js/app.js"></script>
    </head>
    <body id="app">
        <div id="toast" class="dy-fx fx-jc-cr wh-100-pc"></div>
        <div class="dy-fx fx-fx-maxc wh-100-pc">
            <div class="pt-20 app-bar">
                <a href="/content/pages" class="app-bar-item {{ request.url().segments(0) == 'content' ? 'app-bar-item-selected' : '' }}">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M8 16h8v2H8zm0-4h8v2H8zm6-10H6c-1.1 0-2 .9-2 2v16c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm4 18H6V4h7v5h5v11z"/></svg>
                </a>

                <a href="/media/library" class="app-bar-item {{ request.url().segments(0) == 'media' ? 'app-bar-item-selected' : '' }}">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M20 4v12H8V4h12m0-2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-8.5 9.67l1.69 2.26 2.48-3.1L19 15H9zM2 6v14c0 1.1.9 2 2 2h14v-2H4V6H2z"/></svg>
                </a>

                <a a href="/settings" class="app-bar-item {{ request.url().segments(0) == 'store' ? 'app-bar-item-selected' : '' }}">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M18.36 9l.6 3H5.04l.6-3h12.72M20 4H4v2h16V4zm0 3H4l-1 5v2h1v6h10v-6h4v6h2v-6h1v-2l-1-5zM6 18v-4h6v4H6z"/></svg>
                </a>
            </div>
            <div class="dy-fx fx-fx-maxc ml-80">