<div class="app-panel">
    <div class="toolbar">
        <ul class="actions">
            <li class="mn-5">
                <a href="/catalog/attributes/create" class="btn-1">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>
                </a>
            </li>
        </ul>
    </div>

    <div class="container">
        @{foreach attributeRow in attributes} 
            <div class="data-row ${equals(attribute.id, attributeRow.id, 'data-row-selected')}" >
                <div class="wh-100-pc pt-15 pb-15 pl-20 pr-15">
                    <a href="/catalog/attributes/create?pid=${attributeRow.id}" class="fs-18 fw-500">${attributeRow.name}</a>
                    <div class="fs-13 fc-6 mt-5">${attributeRow.property}</div>
                    <div class="fx mt-10">
                        <span class="attr-green">${attributeRow.type}</span>

                        @{if attributeRow.required}
                            <span class="attr-pink">Required</span>
                        @{/if}
                    </div>
                </div>
                <div class="minw-100-px dy-fx pr-20 fx-jc-fe fs-16"></div>
            </div>
        @{/foreach}
    </div>
</div>