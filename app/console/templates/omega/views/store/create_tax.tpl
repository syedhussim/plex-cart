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

                <div id="states"></div>

            </div>
        </form>
    </div>
</div>

<script type="text/javascript">

    class App extends AppBase{

        mount(){

            this.countries = ${JSON.stringify(countries.toArray())};

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

        }
    }

    new App();

</script>