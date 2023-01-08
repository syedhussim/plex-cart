
{% if !pages.empty() %}
    <div class="app-panel">
        <div class="toolbar">
            <div class="actions">
                <div class="dy-fx pn-re">
                    <span class="btn-action" id="pageListMenu"><i class="ico-eclipse"></i></span>
                    <div class="dropdown-menu wh-300-px dy-ne" id="pageListContextMenu">
                        <a class="menu-item" href="/content/pages/create">
                            <i class="ico-add mr-10 minw-30-px"></i>
                            <div class="dy-fx fx-fd-cn">
                                <span>Add Page</span>
                            </div>
                        </a>
                        <a class="menu-item" href="/content/attributes">
                            <i class="ico-attr mr-10 minw-30-px"></i>
                            <div class="dy-fx fx-fd-cn">
                                <span>Attributes</span>
                            </div>
                        </a>
                        <a class="menu-item" href="/content/collections">
                            <i class="ico-collection mr-10 minw-30-px"></i>
                            <div class="dy-fx fx-fd-cn">
                                <span>Collections</span>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </div>

        <div class="container">
            {% foreach pageRow in pages %}
                <div class="data-row cr-pr {{ page.id == pageRow.id ? 'data-row-selected' : '' }}" onclick="window.location='/content/pages/create?pid={{ pageRow.id }}'" >
                    <div class="wh-100-pc pt-15 pb-15 pl-20 pr-20 dy-fx fx-jc-sb fx-ai-cr">
                        <div>
                            <div>
                                <span class="fs-16 fw-700">{{ pageRow.name }}</span>
                            </div>
                            <div class="fs-13 fc-6 mt-5">{{ pageRow.url }}</div>
                        </div>
                        <div><span class="active{{ pageRow.active }}"></span></div>
                    </div>
                </div>
            {% /foreach %}
        </div>
    </div>
{% /if %}

    <script type="text/javascript">

        class PageListMenu extends AppBase{

            mount(){

                this.click('#pageListMenu', () => {

                    event.stopPropagation();

                    let e = document.querySelector('#pageListContextMenu');
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

        new PageListMenu();

    </script>