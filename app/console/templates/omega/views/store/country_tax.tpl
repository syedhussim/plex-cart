${ await include('store/menu'); }

<div class="app-container">
    <div class="app-content-container">
        <form method="post">
            <div class="app-content-left-panel">
                <div class="app-content-header">
                    <div class="inner-header">
                        <h4 class="fw-700">Tax Details / <span class="fc-6">${country.name}</span></h4>
                    </div>
                </div>

                <div class="mb-20">
                    <label class="mb-5 dy-bk fw-700 ${errors.hasError('name', 'fc-9')}">${errors.get('name', 'Name')}</label>
                    ${html.textbox('name', countryTax)}
                </div>

                <div class="mb-20">
                    <label class="mb-5 dy-bk fw-700 ${errors.hasError('tax_percentage', 'fc-9')}">${errors.get('tax_percentage', 'Tax Percentage')}</label>
                    ${html.textbox('tax_percentage', countryTax)}
                </div>

                @{if country.states.length > 0}
                    <div class="mb-20">
                        <label class="mb-5 dy-bk fw-700">State Tax Overrides</label>
                        ${
                            html.select('')
                            .id('state_override')
                            .option('', '')
                            .fromArrayObject(country.states, 'code', 'name')
                        }
                    </div>

                    @{foreach state in country.states}
                        <div class="${countryTax.states[state.code] ? 'dy-fx' : 'dy-ne'} fx-jc-sb fx-ai-cr br-cr-4 br-4-px bg-7 mb-10" id="row_${state.code}">
                            <div class="pl-15 pr-15">
                                ${state.name}
                            </div>
                            <div class="dy-fx fx-ai-cr fx-jc-fe">
                                <span class="dy-fx fc-9 pr-10">${errors.get('state_' + state.code)}</span>
                                <div class="wh-200-px">
                                    <input type="text" name="state_${state.code}" value="${countryTax.states[state.code]}" maxlength="6" />
                                </div>
                            </div>
                        </div>
                    @{/foreach}
                @{/if}

                <div class="mb-20 dy-fx">
                    <button type="submit" class="btn-commit">Save</button>
                </div>
            </div>
        </form>
    </div>
</div>

<script type="text/javascript">

    class App extends AppBase{

        mount(){

            this.change('#state_override', (sender) => {
                let stateCode = sender.value;

                document.querySelectorAll('[data-selected]').forEach(e => {
                    let input = e.querySelector('input');
                    if(input.value.length == 0){
                        e.classList.remove('dy-fx');
                        e.classList.add('dy-ne');
                        e.removeAttribute('data-selected');
                    }
                });

                let e = document.querySelector('#row_' + stateCode);

                e.classList.remove('dy-ne');
                e.classList.add('dy-fx');
                e.dataset.selected = 1;
            });
        }
    }

    new App();

</script>