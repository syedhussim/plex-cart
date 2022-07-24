{{ await include('store/menu') }}

<div class="app-container">
    <div class="app-content-container">
        <form method="post">
            <div class="app-content-left-panel">
                <div class="app-content-header">
                    <div class="inner-header">
                        <h4 class="fw-700">Shipping Countries</h4>
                    </div>
                </div>

                {% foreach country in countries %}
                    <div class="data-row country" data-country_id="{{ country.id }}" data-state="{{ shippingCountryIds.includes(country.id) ? '1' : '0' }}">
                        <div class="wh-100-pc pl-15 pt-15 pb-15 pr-15">
                            <div class="fs-18 fw-500">{{ country.name }}</div>
                        </div>
                        <div class="minw-40-px dy-fx pr-20 fx-jc-fe">
                            <i class="{{ shippingCountryIds.includes(country.id) ? 'symbol-green' : 'dy-ne' }} tick">
                                <svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 0 24 24" width="18px" fill="#fff"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/></svg>
                            </i>
                        </div>
                    </div>
                {% /foreach %}
            </div>
        </form>
    </div>
</div>

<script type="text/javascript">

    class App extends AppBase{

        mount(){
            this.click('.country', async(sender) => {

                await fetch('/store/shipping/countries', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ 
                        country_id : sender.dataset.country_id,
                        state : sender.dataset.state
                    })
                });

                //const content = await rawResponse.json();

                let e = sender.querySelector('.tick');
                e.classList.add('dy-ne');
                e.classList.add('symbol-green');
            })
        }
    }

    new App();

</script>