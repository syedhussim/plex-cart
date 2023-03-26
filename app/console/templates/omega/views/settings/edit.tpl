<div class="app-container-full">
    <div class="app-content-container">
        <form method="post">
            <div class="app-content-left-panel">
                <div class="app-content-header">
                    <div class="inner-header">
                        <h4 class="fw-700">Settings</h4>
                        {% if settings.id %}
                            <div class="dy-fx pn-re">
                                <span class="btn-action" id="settingMenu"><i class="ico-eclipse"></i></span>
                                <div class="dropdown-menu wh-200-px dy-ne" id="settingContextMenu">
                                    <div class="menu-item" id="btnNewApiKey" data-page_id="{{ settings.id }}">
                                        <i class="ico-home mr-10 minw-30-px"></i>
                                        <div class="dy-fx fx-fd-cn">
                                            <span>New API Key</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        {% /if %}
                    </div>
                </div>

                <div class="mb-20">
                    <label class="mb-5 dy-bk fw-700 {{ errors.hasError('name', 'fc-9') }}">{{ errors.get('name', 'Name') }}</label>
                    {{ html.textbox('name', settings) }}
                </div>

                <div class="mb-20">
                    <label class="mb-5 dy-bk fw-700 {{ errors.hasError('url', 'fc-9') }}">{{ errors.get('url', 'URL') }}</label>
                    {{ html.textbox('url', settings) }}
                </div>

                <div class="mb-20">
                    <label class="mb-5 dy-bk fw-700 {{ errors.hasError('locale', 'fc-9') }}">{{ errors.get('locale', 'Regional Format') }}</label>
                    {{ 
                        html.select('locale', settings)
                        .fromArrayObject(locales, 'code', 'name')
                    }}
                </div>

                <div class="mb-20">
                    <label class="mb-5 dy-bk fw-700 {{ errors.hasError('timezone', 'fc-9') }}">{{ errors.get('timezone', 'Timezone') }}</label>
                    {{ 
                        html.select('timezone', settings)
                        .fromArrayObject(timeZones, 'id', 'name')
                    }}
                </div>

                <div class="mb-20">
                    <label class="mb-5 dy-bk fw-700 {{ errors.hasError('theme', 'fc-9') }}">{{ errors.get('theme', 'Theme') }}</label>
                    {{ 
                        html.select('theme', settings)
                        .fromArray(themes)
                    }}
                </div>

                {% if settings.api_key %}
                    <div class="mb-20">
                        <label class="mb-5 dy-bk fw-700">API Key</label>
                        <div class="input-container">
                            {{ settings.api_key }}
                        </div>
                    </div>
                {% /if %}

                <div class="mb-20 dy-fx">
                    <input type="hidden" value="{{ settings.id }}" name="id" />
                    <button type="submit" class="btn-commit">Save</button>
                </div>

            </div>
        </form>
    </div>
</div>

<script type="text/javascript">

    class App extends AppBase{

        mount(){

            this.click('#settingMenu', () => {

                event.stopPropagation();

                let e = document.querySelector('#settingContextMenu');

                let list = e.classList;

                if(list.contains('dy-ne')){
                    list.remove('dy-ne');
                    list.add('dy-fx');
                }else{
                    list.remove('dy-fx');
                    list.add('dy-ne');
                }
            });

            this.click('#btnNewApiKey', async (sender) => {

                let response = await fetch(window.location, {
                    method : 'PUT',
                    headers: {
                        'Content-type': 'application/json;charset=UTF-8'
                    },
                    body : JSON.stringify({ id : sender.dataset.page_id })
                });

                let result = await response.json();

                if(result.success){
                    window.location = window.location;
                }
            });
        }
    }

    new App();

</script>