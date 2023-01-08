<!DOCTYPE html>
<html lang="en-GB">
    <head>
        <meta charset=UTF-8>
        <title>{{ page.get('title') }}</title>
        <meta name=viewport content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <link rel="stylesheet" href="/pb/public/css/base.css"/> 
        <link rel="stylesheet" href="/pb/public/css/style.css"/> 
    </head>
    <body> 

        <header>
            <div class="backdrop"></div>
            <div class="{{ ['/', '/home'].includes(request.url().pathname()) ? 'inverted' : '' }}" style="display:flex; max-width:1440px; width:100%; position:relative; z-index:999;">
                <div style="display: flex; justify-content:space-between; align-items:center; padding:0px 2rem; width:100%;">
                    <div>
                        <a class="navbar-brand" rel="home" href="/" title="Playboy Fragrance" itemprop="url">
                            <img src="https://playboyfragrances.com/wp-content/themes/playboyfragrance/img/logo.svg" width="90px">
                        </a>
                    </div>
                    <nav>
                        <a href="{{ '/collection/for-him' | url }}">For Him</a>
                        <a href="{{ '/collection/for-her' | url }}">For Her</a>
                        <a href="{{ '/for-him' | url }}">Body Mists</a>
                    </nav>
                </div>
            </div>
        </header>