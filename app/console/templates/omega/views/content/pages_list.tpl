{% let groupedPages = new Map(); %}
{% foreach page in pages %}
    {% let name = page.group ? page.group : 'Ungrouped'; %}
    {% if groupedPages.has(name) %}
        {% groupedPages.get(name).push(page); %}
    {% else %}
        {% groupedPages.set(name, [ page ]); %}
    {% /if %}
{% /foreach %}

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
                    </div>
                </div>
            </div>
        </div>

        <div class="container">
            {% foreach entry in groupedPages %}
                <details open>
                    <summary>{{ entry[0] }}</summary>

                    {% foreach pageRow in entry[1] %}
                        <div class="data-row cr-pr {{ page.id == pageRow.id ? 'data-row-selected' : '' }}" onclick="window.location='/content/pages/create?pid={{ pageRow.id }}'" >
                            <div class="wh-100-pc pt-15 pb-15 pl-20 pr-20 dy-fx fx-jc-sb fx-ai-cr">
                                <div class="ow-hn">
                                    <div class="ow-hn to-es">
                                        <span class="fs-16 fw-700 ws-np">{{ pageRow.name }}</span>
                                    </div>
                                    <div class="fs-13 fc-6 mt-5 ow-hn to-es">
                                        <span class="ws-np">{{ pageRow.url }}</span>
                                    </div>
                                </div>
                                <div class="dy-fx fx-jc-fe fx-ai-cr wh-40-px">
                                    {% if pageRow.is_default_page %}
                                        <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="18px" viewBox="0 0 24 24" width="18px" fill="orange"><g><path d="M0 0h24v24H0V0z" fill="none"/><path d="M0 0h24v24H0V0z" fill="none"/></g><g><path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27z"/></g></svg>
                                    {% /if %}
                                    <span class="active{{ pageRow.active }} ml-10"></span>
                                </div>
                            </div>
                        </div>
                    {% /foreach %}

                </details>
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