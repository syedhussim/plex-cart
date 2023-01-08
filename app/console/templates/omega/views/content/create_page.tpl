{{ await include('content/pages_list') }}

<div class="{{ pages.empty() ? 'app-container-full' : 'app-container' }}">
    <div class="app-content-container">
        <form method="post">
            <div class="app-content-left-panel">
                <div class="app-content-header">
                    <div class="inner-header">
                        <h4>Page <span class="fc-9">{{ page.name }}</span></h4>
                        {% if page.id %}
                            <div class="dy-fx pn-re">
                                <span class="btn-action" id="pageMenu"><i class="ico-eclipse"></i></span>
                                <div class="dropdown-menu wh-200-px dy-ne" id="pageContextMenu">
                                    <a class="menu-item" href="{{ settings.url }}{{ page.url }}" target="_blank">
                                        <i class="ico-open-window mr-10 minw-30-px"></i>
                                        <div class="dy-fx fx-fd-cn">
                                            <span>View</span>
                                        </div>
                                    </a>
                                    <a class="menu-item" href="/content/templates/create?pid={{ page.id }}">
                                        <i class="ico-open-window mr-10 minw-30-px"></i>
                                        <div class="dy-fx fx-fd-cn">
                                            <span>Add Template</span>
                                        </div>
                                    </a>
                                    <div class="menu-item" id="btnConfirmDeletePage">
                                        <i class="ico-trash mr-10 minw-30-px"></i>
                                        <div class="dy-fx fx-fd-cn">
                                            <span>Delete</span>
                                        </div>
                                    </div>
                                    <div class="dy-ne fx-fd-cn pg-15 bg-7" id="deleteMsg">
                                        <p class="mn-0">Are you sure you want to delete this page?<p>
                                        <div class="dy-fx fx-jc-fe">
                                            <button type="button" class="btn-delete" id="btnDeletePage" data-page_id="{{ page.id }}">Delete</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        {% /if %}
                    </div>
                </div>

                <div class="dy-fx fx-jc-fe mb-20">
                    <input type="checkbox" id="chk_{{ page.id }}" value="1" name="active" {{ page.active == 1 ? 'checked' : '' }}>
                    <label for="chk_{{ page.id }}"></label>
                </div>

                <div class="mb-20">
                    <label class="mb-5 dy-bk fw-700 {{ errors.hasError('name', 'fc-9') }}">{{ errors.get('name', 'Name') }}</label>
                    {{ html.textbox('name', page) }}
                </div>

                <div class="mb-20">
                    <label class="mb-5 dy-bk fw-700">Group</label>
                    <div class="input-container combobox">
                        {{ html.textbox('group', page).css('br-0-px') }}

                        <ul>
                        {% foreach group in pageGroups %}
                            <li>{{ group.name }}</li>
                        {% /foreach %}
                        </ul>
                    </div>
                </div>

                {% if !templates.empty() %}
                    <label class="mb-5 dy-bk fw-700">Templates</label>
                {% /if %}

                {% foreach template in templates %}
                    <div class="option-row {{ page.template_id == template.id ? 'option-row-selected' : '' }}">
                        <div class="wh-100-pc pl-15 pt-15 pb-15 pr-15">
                            <div>
                                <a href="/content/templates/create?pid={{ page.id }}&id={{ template.id }}" class="fw-700">{{ template.name }}</a>
                            </div>
                            <div class="fs-13 fc-6 mt-5">{{ template.template_file }}</div>
                        </div>
                        <div class="pr-15">
                            <input type="radio" name="template_id" value="{{ template.id }}" id="rdo_{{ template.id }}" {{ page.template_id == template.id ? 'checked' : '' }} />
                            <label for="rdo_{{ template.id }}"></label>
                        </div>
                    </div>
                {% /foreach %}

                <div class="mb-20 dy-fx">
                    <input type="hidden" value="{{ page.id }}" name="id" />
                    <button type="submit" class="btn-commit">Save</button>
                </div>

            </div>
        </form>
    </div>
</div>

<script type="text/javascript">

    class App extends AppBase{

        mount(){

            this.click('#pageMenu', () => {

                event.stopPropagation();

                let e = document.querySelector('#pageContextMenu');

                let list = e.classList;

                if(list.contains('dy-ne')){
                    list.remove('dy-ne');
                    list.add('dy-fx');
                }else{
                    list.remove('dy-fx');
                    list.add('dy-ne');
                }
            });

            this.click('#btnConfirmDeletePage', () => {

                event.stopPropagation();

                let e = document.querySelector('#deleteMsg')
                e.classList.remove('dy-ne');
                e.classList.add('dy-fx');

                let ctxMenu = document.querySelector('#pageContextMenu')
                ctxMenu.classList.remove('wh-200-px');
                ctxMenu.classList.add('wh-300-px');
            });

            this.click('#btnDeletePage', async (sender) => {

                let response = await fetch('/content/pages/create', {
                    method : 'DELETE',
                    headers: {
                        'Content-type': 'application/json;charset=UTF-8'
                    },
                    body : JSON.stringify({ id : sender.dataset.page_id })
                });

                let result = await response.json();

                if(result.success){
                    window.location = '/content/pages';
                }
            });
        }
    }

    new App();

</script>