
{% if !products.empty() %}
    <div class="app-panel">
        <div class="toolbar">
            <div class="actions">
                <a href="/catalog/products/create" class="btn-action"><i class="ico-add"></i></a>
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
                    </div>
                </div>
            </div>
            <div class="dy-fx">
                <form action="/catalog/products" class="dy-fx fx-fx-maxc">
                    <input type="text" name="search" />
                </form>
            </div>
        </div>

        <div class="container">
            {% foreach productRow in products %}
                <div class="data-row cr-pr {{ product.id == productRow.id ? 'data-row-selected' : '' }}" onclick="window.location='/catalog/products/create?pid={{ productRow.id }}'" >
                    <div class="dy-fx pl-20 pr-15">
                        <div class="dy-fx minw-80-px fx-jc-cr" style="border:2px solid #dbe1f9; background-color:#fff; height:80px; border-radius:4px; ">
                            <img src="/omega/public/images/camera.svg" class="wh-40-px" />
                        </div>
                    </div>
                    <div class="wh-100-pc pt-15 pb-15 pr-15">
                        <div>
                            <span class="fs-18 fw-500">{{ productRow.sku }}</span>
                        </div>
                        <div class="fs-13 fc-6 mt-5" target="_blank">{{ productRow.name }}</div>
                        <div class="fx mt-10">
                            <span class="attr-orange">Visible</span>
                            <span class="attr-green">{{ productRow.quantity }}</span>
                        </div>
                    </div>
                    <div class="minw-100-px dy-fx pr-20 fx-jc-fe fs-16">{{ productRow.price | money }}</div>
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