
{% if !pages.empty() %}
    <div class="app-panel">
        <div class="toolbar">
            <div class="actions">
                <a href="/content/pages/create" class="btn-action"><i class="ico-add"></i></a>
                <div class="dy-fx pn-re">
                    <span class="btn-action" id="productListMenu"><i class="ico-eclipse"></i></span>
                    <div class="dropdown-menu wh-300-px dy-ne" id="productListContextMenu">
                        <a class="menu-item" href="/catalog/attributes">
                            <i class="ico-attr mr-10 minw-30-px"></i>
                            <div class="dy-fx fx-fd-cn">
                                <span>Attributes</span>
                            </div>
                        </a>
                        <a class="menu-item" href="/catalog/collections">
                            <i class="ico-collection mr-10 minw-30-px"></i>
                            <div class="dy-fx fx-fd-cn">
                                <span>Collections</span>
                            </div>
                        </a>
                        <a class="menu-item" href="/catalog/import/feed">
                            <i class="ico-paste mr-10 minw-30-px"></i>
                            <div class="dy-fx fx-fd-cn">
                                <span>Import Feed</span>
                                <div class="fs-13 fc-6 mt-5">Import pages from a Google product feed.</div>
                            </div>
                        </a>
                        <div class="menu-item">
                            <i class="ico-paste mr-10 minw-30-px"></i>
                            <span onclick="alert('paste')">Export</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="dy-fx">
                <form action="/catalog/pages" class="dy-fx fx-fx-maxc">
                    <input type="text" name="search" />
                </form>
            </div>
        </div>

        <div class="container">
            {% foreach pageRow in pages %}
                <div class="data-row cr-pr {{ page.id == pageRow.id ? 'data-row-selected' : '' }}" onclick="window.location='/content/pages/create?pid={{ pageRow.id }}'" >
                    <div class="wh-100-pc pt-15 pb-15 pl-20 pr-15">
                        <div>
                            <span class="fs-18 fw-500">{{ pageRow.name }}</span>
                        </div>
                    </div>
                </div>
            {% /foreach %}
        </div>
    </div>

    <script type="text/javascript">

        class ProductListMenu extends AppBase{

            mount(){

                this.click('#productListMenu', () => {

                    event.stopPropagation();

                    let e = document.querySelector('#productListContextMenu');
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

        new ProductListMenu();

    </script>

{% /if %}