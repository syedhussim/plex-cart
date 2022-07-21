{{  await include('store/menu') }}

<div class="app-container">
    <div class="app-content-container">
        <div class="app-content-left-panel">
            <div class="app-content-header">
                <div class="inner-header">
                    <h4 class="fw-700">Themes</h4>
                </div>
            </div>

            <div class="dy-fx">
                {% foreach theme in themes %}
                    <div class="data-card wh-400-px pn-re theme {{ store.theme == theme.code ? 'card-selected' : '' }}" data-theme="{{ theme.code }}">
                        <div class="inner-card">
                            <div class="fs-18 fw-700 mt-5 mb-5">{{ theme.name }}</div>

                            @{if theme.image}
                                <img src="{{ theme.image }}" class="wh-100-pc dy-bk br-4" />
                            @{else}
                                Image Not Available
                            @{/if}

                            <div class="dy-fx fx-jc-fe pn-ae bm-20 rt-20">
                                <i class="{{ store.theme == theme.code ? 'symbol-green' : 'dy-ne' }} tick">
                                    <svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 0 24 24" width="18px" fill="#fff"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/></svg>
                                </i>
                            </div>
                        </div>
                    </div>
                {% /foreach %}
            </div>
        </div>
    </div>
</div>

<script type="text/javascript" src="/omega/public/js/app.js"></script>
<script type="text/javascript">

    class App extends AppBase{

        mount(){

            this.selected = document.querySelector('.card-selected');

            this.click('.theme', async(sender) => {

                if(this.selected){ 
                    this.selected.classList.remove('card-selected');
                    let e = this.selected.querySelector('.tick');

                    e.classList.add('dy-ne');
                    e.classList.remove('symbol-green');
                }

                await fetch('/store/themes', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ 
                        theme : sender.dataset.theme
                    })
                });

                sender.classList.add('card-selected');
                let e = sender.querySelector('.tick');
                e.classList.remove('dy-ne');
                e.classList.add('symbol-green');

                this.selected = sender;
            })
        }
    }

    new App();

</script>