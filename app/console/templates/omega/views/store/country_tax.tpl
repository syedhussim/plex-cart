${ await include('store/menu'); }

<div class="app-container">
    <div class="app-content-container">
        <form method="post">
            <div class="app-content-left-panel">
                <div class="app-content-header">
                    <div class="inner-header">
                        <h4 class="fw-700">Tax Class</h4>

                        <div class="dy-fx pn-re">
                            <span class="btn-action" id="taxMenu"><i class="ico-eclipse"></i></span>
                            <div class="dropdown-menu wh-200-px dy-ne" id="taxContextMenu">
                                <a class="menu-item" href="/store/taxes/create">
                                    <i class="ico-copy mr-10 minw-30-px"></i>
                                    <span>Create Tax Class</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="mb-20">
                    <label class="mb-5 dy-bk fw-700 ${errors.hasError('name', 'fc-9')}">${errors.get('name', 'Name')}</label>
                    ${html.textbox('name', tax)}
                </div>

                <div class="mb-20">
                    <label class="mb-5 dy-bk fw-700 ${errors.hasError('name', 'fc-9')}">${errors.get('name', 'Tax Percentage')}</label>
                    ${html.textbox('name', tax)}
                </div>

                <div class="app-content-section">
                    <div class="inner-section">
                        <h4 class="fw-700">State Tax Overrides</h4>
                    </div>
                </div>

                <div class="mb-20">
                    ${
                        html.select('')
                        .id('state_override')
                        .option('', '')
                        .fromArrayObject(country.states, 'code', 'name')
                    }
                </div>

                @{foreach state in country.states}
                    <div class="dy-ne fx-jc-sb fx-ai-cr br-cr-4 br-4-px bg-7 mb-10 state" id="row_${state.code}">
                        <div class="pl-15 pt-15 pb-15 pr-15">
                            ${state.name}
                        </div>
                        <div class="dy-fx fx-ai-cr pt-15 pb-15 pr-15 wh-200-px">
                            ${html.textbox('state_' + state.code, tax).id('state_' + state.code)}
                        </div>
                    </div>
                @{/foreach}

                <input type="submit" value="save" />

            </div>
        </form>
    </div>
</div>

<script type="text/javascript">

    class App extends AppBase{

        mount(){

            this.click('#taxMenu', () => {

                event.stopPropagation();

                let e = document.querySelector('#taxContextMenu');
                let list = e.classList;

                if(list.contains('dy-ne')){
                    list.remove('dy-ne');
                    list.add('dy-fx');
                }else{
                    list.remove('dy-fx');
                    list.add('dy-ne');
                }
            });

            this.change('#state_override', (sender) => {
                let stateCode = sender.value;

                document.querySelectorAll('[data-selected]').forEach(e => {
                    let input = e.querySelector('input');
                    if(input.value.length == 0){
                        e.classList.remove('dy-fx');
                        e.classList.add('dy-ne');
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