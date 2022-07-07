${ await include('store/menu'); }

<div class="app-container">
    <div class="app-content-container">
        <form method="post">
            <div class="app-content-left-panel">
                <div class="app-content-header">
                    <div class="inner-header">
                        <h4 class="fw-700">Payment Gateways</h4>
                    </div>
                </div>

                @{foreach paymentGateway in paymentGateways}
                    <div class="data-row country">
                        <div class="wh-100-pc pl-15 pt-15 pb-15 pr-15">
                            <div class="fs-18 fw-500">
                                <a href="/store/payment/gateways/manage?id=${paymentGateway.id}">${paymentGateway.name}</a>
                            </div>
                        </div>
                        @{if paymentGateway.active}
                            <div class="minw-40-px dy-fx pr-20 fx-jc-fe">
                                <i class="symbol-green">
                                    <svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 0 24 24" width="18px" fill="#fff"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/></svg>
                                </i>
                            </div>
                        @{/if}
                    </div>
                @{/foreach}
            </div>
        </form>
    </div>
</div>