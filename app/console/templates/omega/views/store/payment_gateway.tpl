{{ await include('store/menu') }}

<div class="app-container">
    <div class="app-content-container">
        <form method="post">
            <div class="app-content-left-panel">
                <div class="app-content-header">
                    <div class="inner-header">
                        <h4 class="fw-700">Payment Gateways / <span class="fc-6">${paymentGateway.name}</span></h4>
                    </div>
                </div>

                <div class="dy-fx fx-jc-fe mb-20">
                    <input type="checkbox" id="chk_${paymentGateway.id}" value="1" name="active" ${equals(paymentGateway.active, 1, 'checked')}>
                    <label for="chk_${paymentGateway.id}"></label>
                </div>

                @{foreach property in paymentGateway.properties}
                    <div class="mb-20">
                        <label class="mb-5 dy-bk fw-700 ${errors.hasError(property.property, 'fc-9')}">${errors.get(property.property, property.name)}</label>
                        ${html.textbox(property.property, property.value)}
                    </div>
                @{/foreach}

                <div class="mb-20 dy-fx">
                    <button type="submit" class="btn-commit">Save</button>
                </div>
            </div>
        </form>
    </div>
</div>