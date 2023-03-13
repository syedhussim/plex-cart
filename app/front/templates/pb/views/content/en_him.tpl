{{ await include('shared/en_header') }}
<main>

    <div class="dy-fx fx-jc-cr">
        <div class="maxw-1170-px wh-100-pc">
            {% foreach relatedPage in page.relatedPages() %}
                <div class="dy-fx wh-100-pc">
                    <div class="wh-100-pc">cc</div>
                    <div class="maxw-450-px">
                        <h2 class="h2">{{ relatedPage.get('title') }}</h2>
                        <p>{{ relatedPage.get('body') }}</p>
                        <div>
                            <a href="" class="btn fc-4">Discover</a>
                        </div>
                    </div>
                </div>
            {% /foreach %}
        </div>
    </div>
    
</main>