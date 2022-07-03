${ await include('store/menu'); }

<div class="app-container">
    <div class="app-content-container">
        <form method="post">
            <div class="app-content-left-panel">
                <div class="app-content-header">
                    <div class="inner-header">
                        <h4 class="fw-700">Taxes</h4>
                    </div>
                </div>

                @{foreach country in countries}
                    <div class="data-row country">
                        <div class="wh-100-pc pl-15 pt-15 pb-15 pr-15">
                            <div class="fs-18 fw-500">
                                <a href="/store/taxes/country?id=${country.id}">${country.name}</a>
                            </div>
                        </div>
                    </div>
                @{/foreach}
            </div>
        </form>
    </div>
</div>