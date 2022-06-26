<div class="app-panel">
    <div class="toolbar">
        <div class="actions">
            <a href="/catalog/products/create" class="btn-action"><i class="ico-add"></i></a>
            <div class="dy-fx" style="position:relative">
                <span class="btn-action" onclick="toggleCatalogMenu(event)"><i class="ico-eclipse"></i></span>
                <div class="dropdown-menu wh-300-px dy-ne" id="catalogMenu">
                    <div class="menu-item">
                        <i class="ico-copy mr-10 minw-30-px"></i>
                        <a href="/catalog/attributes">Attributes</a>
                    </div>
                    <div class="menu-item">
                        <i class="ico-paste mr-10 minw-30-px"></i>
                        <span onclick="alert('paste')">Collections</span>
                    </div>
                    <a class="menu-item" href="/catalog/import/feed">
                        <i class="ico-paste mr-10 minw-30-px"></i>
                        <div class="dy-fx fx-fd-cn">
                            <span>Import Feed</span>
                            <div class="fs-13 fc-6 mt-5">Import products from a Google product feed.</div>
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
            <form action="/catalog/products" class="dy-fx fx-fx-maxc">
                <input type="text" name="search" />
            </form>
        </div>
    </div>

    <div class="container">
        @{foreach productRow in products} 
            <div class="data-row ${equals(product.id, productRow.id, 'data-row-selected')}" >
                <div class="dy-fx pl-20 pr-15">
                    <div class="dy-fx minw-80-px fx-jc-cr" style="border:2px solid #dbe1f9; background-color:#fff; height:80px; border-radius:4px; ">
                        <img src="/omega/public/images/camera.svg" class="wh-40-px" />
                    </div>
                </div>
                <div class="wh-100-pc pt-15 pb-15 pr-15">
                    <a href="/catalog/products/create?pid=${productRow.id}" class="fs-18 fw-500">${productRow.sku}</a>
                    <div class="fs-13 fc-6 mt-5">${productRow.name}</div>
                    <div class="fx mt-10">
                        <span class="attr-orange">Visible</span>
                        <span class="attr-green">${productRow.quantity}</span>
                    </div>
                </div>
                <div class="minw-100-px dy-fx pr-20 fx-jc-fe fs-16">${productRow.price}</div>
            </div>
        @{/foreach}
    </div>
</div>

<script type="text/javascript">
    function toggleCatalogMenu(){
        let e = document.querySelector('#catalogMenu');

        if(e.classList.contains('dy-ne')){
            e.classList.remove('dy-ne');
            e.classList.add('dy-fx');
        }else{
            e.classList.remove('dy-fx');
            e.classList.add('dy-ne');
        }
        event.stopPropagation();
    }
</script>